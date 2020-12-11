import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const Doubts = (props) => {

    const renderDoubts = () => {
        return props.doubts.map((doubt, index) => {
            return (
                <li key={index}>{doubt.title}</li>
            )
        })

    }

    return (
        <div>
            <Scrollbars style={{ width: 300, height: 200}}>
                <ul>
                    {renderDoubts()}
                </ul>

            </Scrollbars>
        </div>
    )
}

export default Doubts