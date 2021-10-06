import React from 'react'

const Loading = (props) => {
    return (
        <div>
            <div className="preloader-wrapper small active">
                <div className="spinner-layer" style={{borderColor: '#ec991c'}}>
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            <div style={{color: '#ec991c'}}>{props.msg}...</div>
        </div>
    )
}

export default Loading
