import React from 'react'

import MainBanner from '../components/MainBanner.tsx'
import MoviesPageMovies from '../components/MoviesPageMovies.tsx'

const Movies: React.FC = (): JSX.Element => {
    return (
      <>
      <MainBanner/>
      <MoviesPageMovies/>
    </>
    )
  }

export default Movies