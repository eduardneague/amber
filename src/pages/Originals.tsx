import React from 'react'

import MainBanner from '../components/MainBanner.tsx'
import OriginalsPageMovies from '../components/OriginalsPageMovies.tsx'

import '../css/originals.css'

const Originals: React.FC = (): JSX.Element => {

    return (
      <>
        <MainBanner/>
        <OriginalsPageMovies/>
      </>
    )
}

export default Originals