import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import searchData from "../../utils/search";
import { API_URL } from "../../utils/api";
import Loading from "../../shared/Loading/Loading";

export class Topics extends Component {
  state = {
    loading: false,
    topics: "",
    search: "",
  };
  loadTopics = async () => {
    this.setState({ loading: true });
    try {
      setAuthToken();
      const res = await axios.get(`${API_URL}/topics/today`);
      this.setState({ topics: res.data.data });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log("Topic err: ", { ...error });
    }
  };
  componentDidMount = () => {
    this.loadTopics();
  };
  render() {
    return (
      <div className="bg-white">
        <Navbar />
        {console.log("Topics: ", this.state.topics)}

        <div className="row" style={{ backgroundColor: "#fff" }}>
          <center>
            <h4
              style={{ fontSize: "23px", margin: "0px", paddingTop: "36px" }}
              class="my-title"
            >
              List of topics
            </h4>
          </center>
          <div className="col xl2 l2 m2 s12" />
          <div
            class="input-field col xl8 l8 m8 s12 search-topic-container"
            style={{ margin: "0px" }}
          >
            <i class="fas fa-search prefix" style={{ top: "26px" }}></i>
            <input
              value={this.state.search}
              onChange={(e) => {
                this.setState({ search: e.target.value });
              }}
              placeholder="Search topic"
              id="home-search"
              type="text"
              class="home-search-input autocomplete search-topics"
            />
          </div>
          <div className="col xl2 l2 m2 s12" />
        </div>

        <section>
          <div class="container main-container" style={{ minHeight: "600px" }}>
            {this.state.loading === true && (
              <div className="list-item">
                <center>
                  <Loading msg="Please wait" />
                </center>
              </div>
            )}

            {this.state.topics === "" || this.state.topics.length === 0
              ? ""
              : searchData(this.state.topics, this.state.search, {
                  topic_title: true,
                }).map((item, i) => (
                  <Link to={`/details/${item.topic_id}`} key={i + 1}>
                    <div class="list-item my-list-itm animate__animated animate__zoomIn main-topics">
                      <div class="row">
                        <div class="col xl12 l12 m12 s11">
                          <div
                            class="list-title"
                            style={{
                              fontSize: "16px",
                              color: "black",
                              marginLeft: "10px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: item.topic_title,
                            }}
                          ></div>
                          <div className="topic-img-container">
                            {item.image !== undefined ? (
                              <img
                                className="topic-img"
                                alt=""
                                src={`${API_URL}/${item.image}`}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div
                            class="list-details"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></div>
                          <div
                            class="row"
                            style={{ marginBottom: "0px", marginTop: "15px" }}
                          >
                            <div
                              class="col xl4 l4 m4 s6"
                              style={{ marginTop: "5px" }}
                            >
                              <span class="editor-title">
                                <i class="fas fa-edit"></i>
                              </span>
                              <span
                                class="editor-name"
                                style={{ fontSize: "11px" }}
                              >
                                {item.fname} {item.lname}
                              </span>
                            </div>
                            <div class="col xl4 l4 m4 s6">
                              <div
                                class="time-cont"
                                style={{ fontSize: "11px" }}
                              >
                                <i className="fas fa-calendar"></i> {item.hour}{" "}
                                {item.day} {item.date} {item.year}
                              </div>
                            </div>
                            <div class="col xl4 l4 m4 s6">
                              <div
                                class="item-icons"
                                style={{
                                  marginTop: "5px",
                                  float: "right",
                                  color: "rgb(73, 73, 73)",
                                }}
                              >
                                <i class="fas fa-comment"></i>
                                <div class="span-badge">
                                  {item.totalComments}
                                </div>
                                {/* <i class="fas fa-eye"></i><div class="span-badge">102</div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Topics;
