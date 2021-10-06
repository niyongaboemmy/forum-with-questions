import React from 'react'

const Alert = (props) => {
    if (props.msg !== undefined) {
        if (props.msg.length !== 0) {
            return (
                <div className={`alert-${props.alert}`}>
                    {props.msg}
                </div>
            )
        } else {
            return ("")
        }
    }
    
}

export default Alert
