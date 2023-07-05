import React from 'react'

import LoginNavBar from '../components/LoginNavBar'
import LoginBanner from '../components/LoginBanner'

import '../css/login.css'

const Login: React.FC = (): JSX.Element => {
    return (
        <>
            <LoginNavBar/>
            <LoginBanner/>
        </>
    )
}

export default Login