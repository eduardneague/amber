import React from 'react'
import '../css/moviecard.css'

interface Props {
    background: string,
    posterBackground: string;
    title: string,
    description: string,
    releaseDate: string,
    isLarge: boolean
}

const MovieCard: React.FC<Props> = ({background, posterBackground, title, description, releaseDate, isLarge}): JSX.Element => {

    const posterStyles = {
        width:'40rem',
        maxHeight: '272px',
        height: '100%'
    }

    const backgroundStyles = {
        width:'20rem',
        maxHeight: '272px'
    }

    return (
        <>
            <img 
                src = {`https://image.tmdb.org/t/p/original${isLarge ? background : posterBackground}`}
                alt = {title} 
                className = "movie-card h-full object-cover select-none rounded-md"
                draggable = {false}
                style = {isLarge ? posterStyles : backgroundStyles}
            /> 
        </>
    )
}

export default MovieCard