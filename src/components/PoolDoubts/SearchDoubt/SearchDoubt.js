import React from 'react'
import './SearchDoubt.css'

const searchDoubt = (props) => {

    const onInputChange = (e) => {
        props.search(e.target.value)
    }
    return(
        <div className='search-doubt'>
            <input
            type='search'
            onChange={(e) => onInputChange(e)}
            autoComplete='off'
            placeholder='Buscar duda'
            />
        </div>
    )
}

export default searchDoubt