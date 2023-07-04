import React from 'react'

import MainBanner from '../components/MainBanner'
import TopRatedPageMovies from '../components/TopRatedPageMovies'

import '../css/originals.css'

const TopRated: React.FC = (): JSX.Element => {

    return (
      <>
        <MainBanner/>
        <TopRatedPageMovies/>
      </>
    )
}

export default TopRated