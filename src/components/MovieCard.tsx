import React, {useState} from 'react'
import {motion} from 'framer-motion'

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

    const [showInfo, setShowInfo] = useState<boolean>(false)

    const handleShowInfo = () => {
        setShowInfo(prevInfo => !prevInfo)
    }

    const truncateText = (string: string, n: number) => {
        if(string?.length > n) {
            return string.substr(0, n - 1) + '...'
        } else {
            return string
        }
    }

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
        <div>
            <img 
                onClick = {handleShowInfo}
                src = {`https://image.tmdb.org/t/p/original${isLarge ? background : posterBackground}`}
                alt = {title} 
                className = "movie-card h-full object-cover select-none rounded-md relative"
                draggable = {false}
                style = {isLarge ? posterStyles : backgroundStyles}
            />   
            {
                showInfo ? 
                (
                    <motion.div 
                        initial = {{opacity: 0}}
                        animate = {{opacity: 1}}
                        transition = {{ease: "easeOut", duration: .5}}
                        className = {` ${isLarge ? 'p-7' : 'p-5'} select-none movie-overlay absolute top-0 w-[100%] scale-[1.05] cursor-pointer h-full rounded-md p-5 flex flex-col gap-2 font-[Poppins]`}
                        onClick = {handleShowInfo}
                        >
                        <div className = "flex flex-col gap-4 w-full scale-[1]">
                            <h1 className = "text-sm text-white font-bold">
                                {title}
                            </h1>
                            <p className = "text-sm text-white">
                                {isLarge ? truncateText(description, 150) : truncateText(description, 80)}
                            </p>
                        </div>
                  
                        <div className = "flex flex-col text-white justify-center font-bold absolute bottom-[-10%] ">
                            <h1 className = "font-bold text-white">NOW ON</h1>
                            <img src = "amber_logo_full.png" alt = "Amber Logo" className = "aspect-square object-contain w-24 mt-[-1.8rem]"/>
                        </div>

                    </motion.div>
                ) : 
                ('')
            }
        </div>
    )
}

export default MovieCard