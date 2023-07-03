import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {useScrollBlock} from '../useBlockScroll.ts'

import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import {IoArrowBackCircleOutline} from 'react-icons/io5'
import requests from '../requests.ts'
import axios from '../axios.ts' // local axios, not global

import '../css/mainbanner.css'

const MainBanner: React.FC = (): JSX.Element => {

    const [randomMovie, setRandomMovie] = useState<any>()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [movieTrailer, setMovieTrailer] = useState<any>('')
    const [movieID, setMovieID] = useState<any>()
    const [playTrailer, setPlayTrailer] = useState<boolean>(false)
    const [moreInformation, setMoreInformation] = useState<boolean>(false)

    const [blockScroll, allowScroll] = useScrollBlock();

    const baseTrailerURL = 'https://api.themoviedb.org/3/tv/'
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY

    // Fetch Request

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals)
            const randomNumber = (Math.trunc(Math.random() * request.data.results.length - 1))

            setRandomMovie(request.data.results[randomNumber])
            setMovieID(request.data.results[randomNumber].id)

            return request
        }
        fetchData()
    }, [])

    // Trailer Request

    useEffect(() => {
        const fetchVideo = async () => {
            const request = await fetch(`${baseTrailerURL}/${movieID}/videos?api_key=${API_KEY}`)
            const data = await request.json()
            setMovieTrailer(data)
            return request
        }
        
        fetchVideo()
    }, [randomMovie])

    // Window Width For Conditional Rendering

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [windowWidth])

    const mainBannerStyle = {
        backgroundImage: 
            `url('https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`,
    }

    const truncateText = (string: string, n: number) => {
        if(string?.length > n) {
            return string.substr(0, n - 1) + '...'
        } else {
            return string
        }
    }

    const handleChangePlayer = () => {
        setPlayTrailer(prevTrailer => !prevTrailer)
    }

    const handleMoreInformation = () => {
        setMoreInformation(prevInfo => !prevInfo)
    }

    const handleMoreInformationParent = (event: any) => {
        if(event.target === event.currentTarget) {
            setMoreInformation(prevInfo => !prevInfo)
            allowScroll()
        }
    }

    return (
        <>
            <motion.div 
                initial = {{y: -200, opacity: 0}}
                animate = {{y: 0, opacity: 1}}
                transition = {{ease: "easeOut", duration: 1}}
                className = "banner-background relative object-contain main-banner-wrapper w-full bg-norepeat bg-cover bg-center font-[Poppins]" 
                style = {mainBannerStyle}
            >
                {movieTrailer?.results && playTrailer ?
                    (
                        <div 
                            onClick = {() => {allowScroll(); handleChangePlayer()}}
                            className = "movie-trailer-wrapper z-[999] w-full fixed h-screen flex justify-center items-center"
                        >
                            <iframe
                                className = "movie-trailer flex absolute w-full bg-black z-[1000]" 
                                src={`https://www.youtube.com/embed/${movieTrailer?.results[0].key}?`} 
                            />
                        </div>
                    ) 
                    : 
                        ('')
                }

                {
                    moreInformation ? 
                    (
                        <motion.div 
                            initial = {{opacity: 0}}
                            animate = {{opacity: 1}}
                            transition = {{ease: "easeOut", duration: .3}}
                            onClick = {(event) => {handleMoreInformationParent(event);}}
                            className = "movie-trailer-wrapper z-[999] w-full fixed h-screen flex justify-center items-center"
                        >
                            <motion.div 
                                initial = {{x: -200, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: .5}}
                                className = "more-info-box bg-[#111] w-[85%] rounded-xl flex flex-col font-[Poppins]">
                                <img 
                                    src = {`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
                                    alt = {randomMovie?.name || randomMovie?.title || randomMovie?.original_name}
                                    className = "w-full bg-cover rounded-tr-xl rounded-tl-xl"
                                />
                                <div className = "flex flex-col p-5 gap-3">

                                    <div className = "flex gap-1">
                                        <img 
                                            src="amber_logo.png" 
                                            alt="amber_Logo" 
                                            className = "more-info-amber-original-logo aspect-square object-contain w-4"
                                        />
                                        <h1 className = "more-info-amber-original text-amber-orange font-bold text-sm">
                                            Original
                                        </h1>
                                    </div>

                                    <div className = "flex gap-2">
                                        <h1 className = "more-info-title text-2xl font-bold text-white"> 
                                            {
                                                truncateText(randomMovie?.name, 20) || 
                                                truncateText(randomMovie?.title, 20) ||
                                                truncateText(randomMovie?.original_name, 20) 
                                            } 
                                        </h1>
                                       
                                        
                                    </div>
                                    
                                    <p className = "more-info-description text-white text-sm mb-2">
                                        {truncateText(randomMovie?.overview, 200)}
                                    </p>

                                    <div className = "flex gap-2">
                                        <button 
                                            onClick = {() => {handleChangePlayer(); handleMoreInformation();}}   
                                            className = "play-button text-black flex w-1/2 justify-center items-center banner-button rounded-md p-[.4rem] bg-white shadow-lg">
                                            <div className = "text-3xl">
                                                <BsFillPlayFill/>
                                            </div>
                                            <h1 className = "text-xl font-bold">
                                                Play
                                            </h1>
                                        </button>


                                        <button
                                            onClick = {() => {allowScroll(); handleMoreInformation()}}
                                            className = "more-info-button text-white flex gap-2 w-1/2 justify-center items-center banner-button rounded-md bg-opacity-70 p-[.4rem] bg-gray-500 shadow-lg"
                                            >
                                            <div className = "text-3xl">
                                                <IoArrowBackCircleOutline/>
                                            </div>
                                            <h1 className = "text-xl font-bold">
                                                Back
                                            </h1>
                                        </button>   
                                    </div>
                                   
                                </div>

                            </motion.div>
                        </motion.div>
                    ) : 
                    (
                        ''
                    )
                }
                
                <div className = "banner-contents-wrapper text-white pt-[16rem] items-center flex flex-col gap-3">
                    <div className = "banner-contents flex flex-col gap-4">
                        <h1 className = "banner-title text-3xl font-bold">
                            {windowWidth < 450 ?
                                (
                                    truncateText(randomMovie?.name, 20) || 
                                    truncateText(randomMovie?.title, 20) ||
                                    truncateText(randomMovie?.original_name, 20)
                                ) : 
                                (
                                    randomMovie?.name || 
                                    randomMovie?.title ||
                                    randomMovie?.original_name
                                )
                            }
                        </h1>

                        <p className="banner-description mb-2 text-sm max-w-[20rem]">
                            {truncateText(randomMovie?.overview, 100)}
                        </p>
                        
                        <div className = "banner-buttons-wrapper flex gap-2">
                            <button 
                                onClick = {() => {blockScroll(); handleChangePlayer();}}   
                                className = "play-button text-black flex justify-center items-center banner-button rounded-md p-[.4rem] bg-white shadow-lg">
                                    <div className = "text-3xl">
                                        <BsFillPlayFill/>
                                    </div>
                                    <h1 className = "text-xl font-bold">
                                        Play
                                    </h1>
                            </button>

                            <button 
                                onClick = {() => {blockScroll(); handleMoreInformation();}}
                                className = "more-info-button text-white flex gap-2 justify-center items-center banner-button rounded-md bg-opacity-70 p-[.4rem] bg-gray-500 shadow-lg">
                                    <div className = "text-3xl">
                                        <AiOutlineInfoCircle/>
                                    </div>
                                    <h1 className = "text-xl font-bold">
                                        More information
                                    </h1>
                            </button>   
                        </div>

                        
                    </div>
                </div>

                <div className = "banner-fade"/>
            </motion.div>
        </>
    )
}

export default MainBanner