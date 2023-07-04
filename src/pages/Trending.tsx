import React from 'react'

import MainBanner from '../components/MainBanner'
import TrendingPageMovies from '../components/TrendingPageMovies'

import '../css/originals.css'

const Trending: React.FC = (): JSX.Element => {

    return (
      <>
        <MainBanner/>
        <TrendingPageMovies/>
      </>
    )
}

export default Trending