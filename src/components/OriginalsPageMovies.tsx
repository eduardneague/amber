import React from 'react'
import requests from '../requests.ts'
import MovieRow from '../components/MovieRow'

const OriginalsPageMovies: React.FC = (): JSX.Element => {
    return (
        <MovieRow
            title = "Amber Originals"
            fetchUrl = {requests.fetchNetflixOriginals}
            isLargeRow = {false}
        />
    )
}

export default OriginalsPageMovies