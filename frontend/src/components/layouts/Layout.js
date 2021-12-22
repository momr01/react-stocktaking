import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer'

import './Layout.scss'

export default function Layout( {children} ) {
    return (
        <>
            <Navigation />

            <div className="layout">
            {children}
            </div>
           

            <Footer />
        </>
    )
}
