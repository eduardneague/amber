import React from 'react'

import requests from '../requests'
import MovieRow from '../components/MovieRow'

const AllMovies: React.FC = (): JSX.Element => {
    return (
        <>
            <MovieRow 
                title = 'Amber Originals'
                fetchUrl = {requests.fetchNetflixOriginals}
                isLargeRow = {false}
            />
            <MovieRow 
                title = 'Trending Now'
                fetchUrl = {requests.fetchTrending}
                isLargeRow = {true}
            />
            <MovieRow 
                title = 'Top Rated'
                fetchUrl = {requests.fetchTopRated}
                isLargeRow = {false}
            />
            <MovieRow 
                title = 'Action Movies'
                fetchUrl = {requests.fetchActionMovies}
                isLargeRow = {true}
            />
            <MovieRow 
                title = 'Comedy Movies'
                fetchUrl = {requests.fetchCodemyMovies}
                isLargeRow = {true}
            />
            <MovieRow 
                title = 'Horror Movies'
                fetchUrl = {requests.fetchHorrorMovies}
                isLargeRow = {false}
            />
            <MovieRow 
                title = 'Romance Movies'
                fetchUrl = {requests.fetchRomanceMovies}
                isLargeRow = {false}
            />
            <MovieRow 
                title = 'Documentaries'
                fetchUrl = {requests.fetchDocumentaries}
                isLargeRow = {true}
            />
        </>    
    )
}

export default AllMovies