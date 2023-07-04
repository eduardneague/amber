import React from 'react'
import requests from '../requests.ts'
import MovieRow from './MovieRow.tsx'

const MoviesPageMovies: React.FC = (): JSX.Element => {
    return (
        <>
            <MovieRow
                title = "Action Movies"
                fetchUrl = {requests.fetchActionMovies}
                isLargeRow = {false}
            />
            <MovieRow
                title = "Comedy Movies"
                fetchUrl = {requests.fetchCodemyMovies}
                isLargeRow = {false}
            />
            <MovieRow
                title = "Horror Movies"
                fetchUrl = {requests.fetchHorrorMovies}
                isLargeRow = {false}
            />
            <MovieRow
                title = "Romance Movies"
                fetchUrl = {requests.fetchRomanceMovies}
                isLargeRow = {false}
            />
        </>  
    )
}

export default MoviesPageMovies