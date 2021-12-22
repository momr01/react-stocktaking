import React from 'react'
import {Button} from 'react-bootstrap'
import routes from '../../helpers/routes'
import { Link } from 'react-router-dom'

import './Main.scss'

export default function Main() {
    const type = "tool"

    return (
        <>
        <div className="main">
            <h3 className="main__title">Inventario de componentes</h3>
            
            <div className="main__container">
            <Link to={routes.new(type)}><Button variant="outline-secondary" className="main__container-button">Agregar</Button></Link>
                <Link to={routes.list}><Button variant="outline-secondary" className="main__container-button">Ver todo</Button></Link>
            </div>
                
                
         
        </div>
        
        </>
    )
}
