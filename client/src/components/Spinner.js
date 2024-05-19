import React from 'react'
import {Spin} from 'antd'
// Spinner used for showing loading icon
function Spinner() {
    return (
        <div className="spinner">
            <Spin size='large'/>
        </div>
    )
}

export default Spinner
