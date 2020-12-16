import React from 'react'
import { Link } from 'react-router-dom'
import './OneDoubt.css'

const OneDoubt = (props) => {

    const renderEditButton = () => {
        if(props.loggedInUser){
            return(
                props.selectedDoubt.userId.email !== props.loggedInUser.email 
                    ? null 
                    : <Link to='/editDoubt'>Editar duda</Link>
            )
        } else { return null }
    }

    return(
        <div className='one-doubt'>
            <h3>{props.selectedDoubt.title}</h3>
            <p>{props.selectedDoubt.doubt}</p>
            <p><span>Escrita por: </span>{props.selectedDoubt.userId.name} {props.selectedDoubt.userId.lastName}</p>

            { 
            renderEditButton()
            }
        </div>
    )

}

export default OneDoubt