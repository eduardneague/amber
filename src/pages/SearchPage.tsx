import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

import {motion} from 'framer-motion'
import SwiperComponent from '../components/SwiperComponent'


const SearchPage: React.FC = (): JSX.Element => {

    const [params] = useSearchParams()
    const [resultMovies, setResultMovies] = useState([])

    const searchInput = (params.get('input'))?.replace(/\s/g, '+')
    const displaySearchInput = (params.get('input'))

    const baseTrailerURL = 'https://api.themoviedb.org/3/'
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${baseTrailerURL}search/movie?query=${searchInput}&api_key=${API_KEY}`)
            const data = await response.json()
            setResultMovies(data.results)
        }
        fetchData()
    }, [searchInput])

    return (
        <>
            <motion.div 
                initial = {{x: -500, opacity: 0}}
                animate = {{x: 0, opacity: 1}} 
                transition = {{ease: "easeOut", duration: 1}}
                className = "relative movie-row bg-black w-full h-[22rem] flex flex-col font-[Poppins] mt-[5rem] mb-[8rem] xl:mb-[10rem]"
            >
                <h1 className = "movie-row-title text-white text-2xl font-bold ml-8 mb-5 mt-8">
                    Search Results for <br/> <span className = "text-amber-orange"> {`${displaySearchInput}`}</span>
                    {
                    resultMovies.length === 0 ? 
                    (
                        <h1 className = "text-white mt-7">No search results were found :(</h1>
                    ) : ('')
                }
                </h1>

                

                <div className = "movie-row-movies">
                    <SwiperComponent
                        slides = {resultMovies}
                        startIndex = {0}
                        isLargeSwiper = {false}
                    />
                </div>
                   

            </motion.div>
        </>

    )
}

export default SearchPage