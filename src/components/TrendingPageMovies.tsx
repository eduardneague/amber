import React from 'react'
import requests from '../requests.ts'
import MovieRow from '../components/MovieRow'

const TrendingPageMovies: React.FC = (): JSX.Element => {
    return (
        <MovieRow
            title = "Trending"
            fetchUrl = {requests.fetchTrending}
            isLargeRow = {false}
        />
    )
}

export default TrendingPageMovies