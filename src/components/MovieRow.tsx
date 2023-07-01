import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import SwiperComponent from '../components/SwiperComponent.jsx'

import MovieCard from '../components/MovieCard'
import axios from '../axios.ts'

import '../css/movierow.css'

interface Props {
    title: string,
    fetchUrl: string,
    isLargeRow: boolean
}

const MovieRow: React.FC<Props> = ({title, fetchUrl, isLargeRow}): JSX.Element => {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])


    return (    
        <>
            <motion.div 
                initial = {{x: -500, opacity: 0}}
                animate = {{x: 0, opacity: 1}}
                transition = {{ease: "easeOut", duration: 1}}
                className = "relative movie-row bg-black w-full h-[22rem] flex flex-col font-[Poppins] mb-7 z-[0]"
            >
                <h1 className = "movie-row-title text-white text-2xl font-bold ml-8 mb-5 mt-8">{title}</h1>

                <div className = "movie-row-movies">
                    <SwiperComponent 
                        slides = {movies}
                        startIndex = {1}
                        isLargeSwiper = {isLargeRow}
                    />
                </div>
                   

            </motion.div>
        </>
    )
}

export default MovieRow