import React from 'react'

import NavBar from '../components/NavBar'
import MainBanner from '../components/MainBanner'
import AllMovies from '../components/AllMovies'
import Footer from '../components/Footer'

const HomeScreen: React.FC = (): JSX.Element => {
    return (
        <>
            <NavBar/>
            <MainBanner/>
            <AllMovies/>    
            <Footer/>
        </>
    )
}

export default HomeScreen
