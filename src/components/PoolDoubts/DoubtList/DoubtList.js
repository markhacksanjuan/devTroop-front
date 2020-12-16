import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './DoubtList.css'

const DoubtList = (props) => {

    const handleClick = (e, id) => {
        e.preventDefault()
        props.getDoubt(id)
    }

    const renderList = () => {
        return props.doubts.map((doubt, index) => {
            return (
                <li key={index}>
                    <button  onClick={(e) => handleClick(e, doubt._id)} >
                        {doubt.title}
                    </button>
                </li>
            )
        })
    }

    return(
        <div className='doubt-list'>
        
            <Scrollbars 
            style={{ width: 300, heigth: 500 }}>
                <ul>
                    {renderList()}
                </ul>

            </Scrollbars>
        </div>
    )

}

export default DoubtList