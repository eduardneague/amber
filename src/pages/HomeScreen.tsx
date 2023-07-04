import React from 'react'

import MainBanner from '../components/MainBanner'
import AllMovies from '../components/AllMovies'
import Footer from '../components/Footer'

const HomeScreen: React.FC = (): JSX.Element => {
    return (
        <>
            <MainBanner/>
            <AllMovies/>    
            <Footer/>
        </>
    )
}

export default HomeScreen
