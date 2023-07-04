import React from 'react'

import MainBanner from '../components/MainBanner'
import AllMovies from '../components/AllMovies'

const HomeScreen: React.FC = (): JSX.Element => {
    return (
        <>
            <MainBanner/>
            <AllMovies/>    
        </>
    )
}

export default HomeScreen
