import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const Doubts = (props) => {

    const handleClick = (e, id) => {
        e.preventDefault()
        props.getDoubt(id)
    }

    const renderDoubts = () => {
        return props.doubts.map((doubt, index) => {
            return (
                <li key={index}>
                    <button onClick={e => handleClick(e, doubt._id)}>
                        {doubt.title}
                    </button>
                </li>
            )
        })

    }

    return (
        <div className='doubt-list'>
            <Scrollbars style={{ width: 300, height: 200}}>
                <ul>
                    {renderDoubts()}
                </ul>

            </Scrollbars>
        </div>
    )
}

export default Doubts