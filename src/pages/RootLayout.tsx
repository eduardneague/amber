import React from 'react'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import {Outlet} from 'react-router-dom'

const RootLayout: React.FC = (): JSX.Element => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default RootLayout