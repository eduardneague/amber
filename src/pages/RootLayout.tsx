import React from 'react'

import NavBar from '../components/NavBar'
import {Outlet} from 'react-router-dom'

const RootLayout: React.FC = (): JSX.Element => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default RootLayout