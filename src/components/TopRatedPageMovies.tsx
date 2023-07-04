import React from 'react'
import requests from '../requests.ts'
import MovieRow from '../components/MovieRow'

const TopRatedPageMovies: React.FC = (): JSX.Element => {
    return (
        <MovieRow
            title = "Top Rated"
            fetchUrl = {requests.fetchTopRated}
            isLargeRow = {false}
        />
    )
}

export default TopRatedPageMovies