import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import requests from '../requests.ts'
import axios from '../axios.ts' // local axios, not global

import '../css/mainbanner.css'

const MainBanner: React.FC = (): JSX.Element => {

    const [randomMovie, setRandomMovie] = useState<any>()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    // Fetch Request

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setRandomMovie(request.data.results[(Math.trunc(Math.random() * request.data.results.length - 1))])
            return request
        }
        fetchData()
    }, [])

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

    return (
        <>
            <motion.div 
                initial = {{y: -200, opacity: 0}}
                animate = {{y: 0, opacity: 1}}
                transition = {{ease: "easeOut", duration: 1}}
                className = "banner-background relative object-contain main-banner-wrapper w-full bg-norepeat bg-cover bg-center font-[Poppins]" 
                style = {mainBannerStyle}
            >
                
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
                            <button className = "play-button text-black flex justify-center items-center banner-button rounded-md p-[.4rem] bg-white shadow-lg">
                                <div className = "text-3xl">
                                    <BsFillPlayFill/>
                                </div>
                                <h1 className = "text-xl font-bold">
                                    Play
                                </h1>
                            </button>

                            <button className = "more-info-button text-white flex gap-2 justify-center items-center banner-button rounded-md bg-opacity-70 p-[.4rem] bg-gray-500 shadow-lg">
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