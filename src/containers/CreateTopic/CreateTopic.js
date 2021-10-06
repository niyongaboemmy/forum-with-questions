import React, { Component, Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { LogoutTheUser, toogleNav } from "../../actions/auth";
import { API_URL } from '../../utils/api';
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import searchData from "../../utils/search";
import SubNav from '../../components/SubNav';
import Modal from '../../shared/Modal/Modal';

// import { create } from 'doka';

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 20
};

const thumb = {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
};

const img = {
    display: "block",
    width: "auto",
    height: "100%"
};

const thumbButton = {
    position: "absolute",
    right: 10,
    bottom: 10,
    background: "rgba(0,0,0,.8)",
    color: "#fff",
    border: 0,
    borderRadius: ".325em",
    cursor: "pointer"
};

const editImage = (image, done) => {
    const imageFile = image.doka ? image.doka.file : image;
    const imageState = image.doka ? image.doka.data : {};
    // create({
    //   // recreate previous state
    //   ...imageState,
  
    //   // load original image file
    //   src: imageFile,
    //   outputData: true,
  
    //   onconfirm: ({ file, data }) => {
    //     Object.assign(file, {
    //       doka: { file: imageFile, data }
    //     });
    //     done(file);
    //   }
    // });
};



const CreateTopic = (props) => {
    const [files, setFiles] = useState([]);
    const [topic, setTopic] = useState("");
    const [img_desc, setImgDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ element: "", msg: "" });
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState("");
    const [tab, setTab] = useState(1);
    const [topics, setTopics] = useState("");
    const [search, setSearch] = useState("");
    const [loadingTopics, setLoadingTopics] = useState("");
    const [modal, setModal] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
            )
        );
        }
    });

    const thumbs = files.map((file, index) => (
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
            <img src={file.preview} style={img} alt="" />
        </div>
        <button
            style={thumbButton}
            onClick={() => setFiles([])}
            // onClick={() =>
            // editImage(file, (output) => {
            //     const updatedFiles = [...files];

            //     // replace original image with new image
            //     updatedFiles[index] = output;

            //     // revoke preview URL for old image
            //     if (file.preview) URL.revokeObjectURL(file.preview);

            //     // set new preview URL
            //     Object.assign(output, {
            //     preview: URL.createObjectURL(output)
            //     });

            //     // update view
            //     setFiles(updatedFiles);
            // })
            // }
        >
            delete
        </button>
        </div>
    ));

    const createPost = async (e) => {
        e.preventDefault();

        setSuccess("");
        if (tab === 1) {
            if ((topic.length === 0 || topic === "")) {
                return setError({
                    element: "topic",
                    msg: "Please type topic"
                })
            }
            try {
                setLoading(true);
                const res = await axios({
                    url: `${API_URL}/topics/text`,
                    method: 'POST',
                    data: {
                        user_id: user.user_id,
                        topic_title: topic,
                    },
                });
                if (res.status === 200) {
                    setTopic("");
                    setSuccess("Topic has been created successfully");
                    loadTopics(props.auth.user_id);
                }
                console.log("Post res: ", res);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("To err: ", {...error});
            }
        } else {
            // Post text
            if ((files.length === 0)) {
                return setError({
                    element: "image",
                    msg: "Please select image file"
                })
            }
            if ((img_desc.length === 0 || img_desc === "")) {
                return setError({
                    element: "img_desc",
                    msg: "Please type image description"
                })
            }
            // Image upload
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("user_id", user.user_id);
                formData.append("image", files[0]);
                formData.append("description", img_desc);

                const result = await axios({
                    url: `${API_URL}/topics/img`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                });
                if (result.status === 200) {
                    setFiles([]);
                    setImgDesc("");
                    setSuccess("Topic has been created successfully");
                    loadTopics(props.auth.user_id);
                }
                setLoading(false);
                console.log("Post res: ", result);
            } catch (error) {
                setLoading(false);
                console.log("To err img: ", {...error});
            }
        }
        
    }
    const loadTopics = async (user_id) => {
        setLoadingTopics(true);
        try {
            setAuthToken();
            const res = await axios.get(`${API_URL}/topics/user/${user_id}`);
            setTopics(res.data.data);
            setLoadingTopics(false);
            console.log("My topics: ", res.data.data);
        } catch (error) {
            setLoadingTopics(false);
            console.log("Topic err: ", error);
        }
    }
    useEffect(() => {
        if (props.auth.userCategory === "user" && props.auth.user_id !== null) {
            if (props.auth.user !== null) {
                setUser(props.auth.user.data[0]);
            } else {
                setUser(props.auth.data);
            }
            loadTopics(props.auth.user_id);
        }
    }, [props.auth])

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
        },[files]
    );
    return (
        <Fragment>
            <div>
                <Navbar />
                <section>
                    <div className="container-fluid">
                        <div className="row" style={{marginBottom: '0px'}}>
                            <div className="col xl3 l3 m12 s12 left-col hidden-sm">
                                <br />
                                <h5 className="my-title" style={{color: '#fff'}}>My topics</h5>
                                <input onChange={(e) => setSearch(e.target.value)} value={search} type="search" className="browser-default my-input" placeholder="Search keyword..." />
                                <section className="section left-section">
                                {loadingTopics === true ? (
                                    <center>
                                        <div className="list-item-small">
                                            <Loading msg="Please wait" />
                                        </div>
                                    </center>
                                ) : topics === "" ? "" : 
                                searchData(topics, search, { topic_id: true }).map((item, i) => (
                                    <Link to={`/details/${item.topic_id}`}>
                                        <div className="list-item-small">
                                            <div className="row" style={{marginBottom: '0px'}}>
                                                <div className="col xl2 l2 m2 s3">
                                                    <div className="user-list-icon-small">
                                                        <i className="fas fa-user-circle"></i>
                                                    </div>
                                                </div>
                                                <div className="col xl10 l10 m10 s9">
                                                    <div className="list-title-small">{item.topic_title !== undefined ? item.topic_title : ""}</div>
                                                    <div>{item.image !== undefined ? (<img className="topic-img" src={`${API_URL}/${item.image}`} />) : ""}</div>
                                                    <div className="list-details-small">{item.description !== undefined ? item.description : ""}</div>
                                                    <div className="row" style={{marginBottom: "0px"}}>
                                                        <div className="col xl6 l6 m6 s6" style={{marginTop: "15px"}}>
                                                            {/* <span className="editor-title-small"><i className="fas fa-edit"></i>Editor</span>
                                                            <span className="editor-name-small">{item.fname} {item.lname}</span> */}
                                                        </div>
                                                        <div className="col xl6 l6 m6 s6">
                                                            <div className="time-cont"><i className="fas fa-calendar"></i> {item.hour} {item.month} {item.date} {item.year}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                </section>
                            </div>
                            <div className="col xl9 l9 m12 s12">
                            
                                <div className="list-item right-col animate__animated animate__zoomIn" style={{overflow: 'hidden'}}>
                                    <form onSubmit={createPost}>
                                        <div>
                                            <div className="row">
                                                <div className="col xl2 l2 m2 s12" />
                                                <div className="col xl8 l8 m8 s12">
                                                <div class="row">
                                                    <div class="col s12">
                                                        <center>
                                                            <h6 style={{marginBottom: '1px'}} className="my-title"><i className="fas fa-edit"></i> Create new post</h6>
                                                        </center>
                                                        <br />
                                                        <ul class="tabs" style={{backgroundColor: '#daf0fd'}}>
                                                            <li onClick={() => setTab(1)} style={{cursor: 'pointer'}} class={`tab col s3 ${tab === 1 ? "selected-tab" : ""}`}><span>Post text</span></li>
                                                            <li onClick={() => setTab(2)} style={{cursor: 'pointer'}} class={`tab col s3 ${tab === 2 ? "selected-tab" : ""}`}><span>Image</span></li>
                                                            <li className="tab hidden-lg" onClick={() => setModal(true)}>My topics</li>
                                                        </ul>
                                                        </div>
                                                        <div style={{padding: '10px', paddingTop: '20px'}} class="col s12">
                                                            {tab === 1 ? (
                                                                <div className="animate__animated animate__zoomIn">
                                                                    <center>
                                                                        <input 
                                                                        type="text" 
                                                                        onChange={(e) => {
                                                                            setTopic(e.target.value);
                                                                            setError({ element: "", msg: "" });
                                                                            setSuccess("");
                                                                        }}
                                                                        disabled={loading}
                                                                        className={`browser-default my-input ${error.element === "topic" ? 'danger-input': ''}`}
                                                                        placeholder="Topic title" 
                                                                        value={topic}
                                                                        style={{width: '95%'}}
                                                                        />
                                                                    </center>
                                                                    {error.element === "topic" ? (
                                                                        <span className="helper-text danger-color">{error.msg}</span>
                                                                    ) : ""}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <section className="container animate__animated animate__zoomIn">
                                                                        <div {...getRootProps({ className: `dropzone ${error.element === "image" && files.length === 0 ? 'danger-input': ''}` })}>
                                                                            <i className="fas fa-image drop-img"></i>
                                                                            <input {...getInputProps()} />
                                                                            <p>Drag and drop some files here, or click to select files</p>
                                                                        </div>
                                                                        {files.length === 0 ? "" : (
                                                                            <aside style={thumbsContainer}>{thumbs}</aside>
                                                                        )}
                                                                        
                                                                        <center>
                                                                            {error.element === "image" && files.length === 0 ? (
                                                                                <span className="helper-text danger-color">{error.msg}</span>
                                                                            ) : ""}
                                                                        </center>
                                                                    </section>
                                                                    
                                                                    
                                                                    {files.length !== 0 ? (
                                                                        <>
                                                                        <br />
                                                                        <textarea 
                                                                        onChange={(e) => {
                                                                            setImgDesc(e.target.value);
                                                                            setError({ element: "", msg: "" });
                                                                            setSuccess("");
                                                                        }}
                                                                        style={{padding: '10px', color: 'black', backgroundColor: '#fff'}} placeholder="Image description" name="" id="" cols="30" rows="40" 
                                                                        className={`my-textarea ${error.element === "img_desc" ? 'danger-input': ''}`}>{img_desc}</textarea>
                                                                        {error.element === "img_desc" ? (
                                                                            <span className="helper-text danger-color">{error.msg}</span>
                                                                        ) : ""}
                                                                        <br /><br />
                                                                        </>
                                                                    ) : ("")}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <center>
                                                        {success !== "" && (
                                                            <Alert alert="success" msg={success} />
                                                        )}
                                                        <Alert alert="danger" msg={error.element === "main" ? (error.msg) : ''} />
                                                        {loading === true ? (<Loading msg="Please wait" />) : 
                                                        (<button className="btn-large waves-effect outline-btn nav-outline-btn post-btn" type="submit"><i className="fas fa-edit"></i> Create</button>)}
                                                    </center>
                                                </div>
                                                <div className="col xl2 l2 m2 s12" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

            {/* Modal */}
            {modal === true && (
                <Modal
                    close={() => setModal(false)}
                    backDrop={true}
                    closeBackdrop={false}
                    theme="primary"
                    title="My topics"
                    className="open animate-in sm-modal menus-container-mobile animate__animated animate__bounceIn"
                    >
                    <div className="left-col" style={{backgroundColor: '#093950',     marginLeft: '-16px', marginRight: '-24px'}}>
                        <div className="" style={{marginBottom: '50px'}}>
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type="search" className="browser-default my-input" placeholder="Search keyword..." />
                            <section className="section left-section">
                            {loadingTopics === true ? (
                                <center>
                                    <div className="list-item-small">
                                        <Loading msg="Please wait" />
                                    </div>
                                </center>
                            ) : topics === "" ? "" : 
                            searchData(topics, search, { topic_id: true }).map((item, i) => (
                                <Link to={`/details/${item.topic_id}`}>
                                    <div className="list-item-small animate__animated animate__zoomIn">
                                        <div className="row" style={{marginBottom: '0px'}}>
                                            <div className="col xl2 l2 m2 s3">
                                                <div className="user-list-icon-small">
                                                    <i className="fas fa-user-circle"></i>
                                                </div>
                                            </div>
                                            <div className="col xl10 l10 m10 s9">
                                                <div className="list-title-small">{item.topic_title !== undefined ? item.topic_title : ""}</div>
                                                <div>{item.image !== undefined ? (<img className="topic-img" src={`${API_URL}/${item.image}`} />) : ""}</div>
                                                <div className="list-details-small">{item.description !== undefined ? item.description : ""}</div>
                                                <div className="row" style={{marginBottom: "0px"}}>
                                                    <div className="col xl6 l6 m6 s6" style={{marginTop: "15px"}}>
                                                        {/* <span className="editor-title-small"><i className="fas fa-edit"></i>Editor</span>
                                                        <span className="editor-name-small">{item.fname} {item.lname}</span> */}
                                                    </div>
                                                    <div className="col xl6 l6 m6 s6">
                                                        <div className="time-cont"><i className="fas fa-calendar"></i> {item.hour} {item.month} {item.date} {item.year}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            </section>
                        </div>
                    </div>
                </Modal>
            )}
        </Fragment>
    )
}

CreateTopic.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    toogleNav: state.toogleNav,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser, toogleNav })(
    CreateTopic
);