import React, {useEffect, useState} from 'react'
import '../css/navbar.css'

import {motion} from 'framer-motion'
import {BiSearchAlt2} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

const NavBar: React.FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean | null>(false)
    const [mobileNav, setMobileNav] = useState<boolean>(false)
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleWindowChange = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleWindowChange)
        return () => {
            window.removeEventListener("resize", handleWindowChange)
        }
    }, [windowWidth])

    const transitionNavBar = () => {
        if(window.scrollY > 200) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)
        return () => {
            window.removeEventListener('scroll', transitionNavBar)
        }
    }, [])

    const handleHamburgerClick = () => {
        setMobileNav(prevNav => !prevNav)
    }

    const handleSearchClick = () => {
        setShowSearch(prevSearch => !prevSearch)
    }

    return (
        <> {
            windowWidth > 720 /* dekstop nav */ ? 
            (
                <div className = {` ${show ? 'nav-black' : 'nav-wrapper'} w-full h-24 fixed top-0 z-[100]`}>
                    <div className="nav-content flex justify-between items-center w-full h-full">
                        <div className = "flex justify-center items-center gap-5">
                            <motion.img
                                initial = {{x: -200, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: 1}}
                                className = "mt-2 nav-logo aspect-square h-24 ml-[1.6rem] cursor-pointer object-contain select-none"
                                draggable = "false"
                                src = "amber_logo_full.png" 
                                alt = "amber_logo"
                            />
                            <div className = "flex gap-5 mb-[.15rem]">
                                <h1 className = "text-white">Home</h1>
                                <h1 className = "text-white">Originals</h1>
                                <h1 className = "text-white">Movies</h1>
                                <h1 className = "text-white">Top Rated</h1>
                                <h1 className = "text-white">Trending</h1>
                            </div>
                        </div>
                        
                        <div className = "flex gap-5 items-center justify-center cursor-pointer">
                            {
                                showSearch ? (
                                   <motion.div
                                    initial = {{x: -100, opacity: 0}}
                                    animate = {{x: 0, opacity: 1}}
                                    transition = {{ease: "easeOut", duration: .5}}
                                    className = "relative"
                                    >
                                        <input 
                                            type = "text" 
                                            placeholder = "Search"
                                            name = "search_value"
                                            // value = ""
                                            className = "search-bar p-2 text-white bg-black font-[Poppins] focus:outline-2 focus:outline focus:outline-amber-orange"
                                        />
                                        <div className = "absolute top-[20%] right-2">
                                            <BsFillArrowRightCircleFill className = "text-amber-orange text-2xl"/>
                                        </div>
                                   </motion.div>
                                ) : 
                                (
                                    <div onClick = {handleSearchClick}>
                                        <BiSearchAlt2 className = "text-white text-3xl"/>
                                    </div>
                                )
                            }
                            
                            <motion.img 
                                initial = {{x: 200, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: 1}}
                                className = "nav-avatar cursor-pointer aspect-square h-10 mr-[1.6rem] object-contain select-none"
                                draggable = "false"
                                src = "amber_avatar.png" 
                                alt = "avatar_picture"
                            />
                        </div>
                        
                    </div>
                </div>
            ) : ( 
                /* mobile nav */  
                <div className = {` ${show ? 'nav-black' : 'nav-wrapper'} w-full h-24 fixed top-0 z-[100]`}>
                    <div className="nav-content flex justify-between items-center w-full h-full">
                        <div className = "flex justify-center items-center gap-5">
                            <motion.img
                                initial = {{x: -200, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: 1}}
                                className = "mt-2 nav-logo aspect-square h-24 ml-[1.6rem] cursor-pointer object-contain select-none"
                                draggable = "false"
                                src = "amber_logo_full.png" 
                                alt = "amber_logo"
                            />
                
                        {
                            mobileNav ? 
                            (
                                <motion.div
                                initial = {{x: 300, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: .5}} 
                                className = "absolute bg-black right-0 top-0 w-full h-screen flex justify-center items-center font-[Poppins]"
                            >
                                <div
                                    onClick = {handleHamburgerClick}
                                >
                                    <AiOutlineClose className = "text-white text-4xl absolute top-[5%] right-[10%] cursor-pointer"/>
                                </div>

                                <div className = "flex flex-col gap-5 mb-[.15rem] text-center text-xl items-center">
                                {
                                showSearch ? (
                                   <motion.div
                                    initial = {{x: -100, opacity: 0}}
                                    animate = {{x: 0, opacity: 1}}
                                    transition = {{ease: "easeOut", duration: .5}}
                                    className = "relative"
                                    >
                                        <input 
                                            type = "text" 
                                            placeholder = "Search"
                                            name = "search_value"
                                            // value = ""
                                            className = "search-bar p-2 text-white bg-black focus:outline-2 focus:outline focus:outline-amber-orange font-[Poppins]"
                                        />
                                        <div className = "absolute top-[24%] right-2">
                                            <BsFillArrowRightCircleFill className = "text-amber-orange text-2xl"/>
                                        </div>
                                   </motion.div>
                                ) : 
                                (
                                    <div onClick = {handleSearchClick} className = "flex gap-2">
                                        <BiSearchAlt2 className = "text-white text-3xl"/>
                                        <h1 className = "text-white font-[Poppins]">Search</h1>
                                    </div>
                                )
                            }
                                    <h1 className = "text-white cursor-pointer">Home</h1>
                                    <h1 className = "text-white cursor-pointer">Originals</h1>
                                    <h1 className = "text-white cursor-pointer">Movies</h1>
                                    <h1 className = "text-white cursor-pointer">Top Rated</h1>
                                    <h1 className = "text-white cursor-pointer">Trending</h1>
                                </div>
                            </motion.div>
                            ) : 
                            ('')
                        }
                            
                            
                        </div>
                        
                        <div className = "flex gap-5 items-center justify-center cursor-pointer">
                            <motion.div
                                initial = {{y: -100, opacity: 0}}
                                animate = {{y: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: 1}}
                                
                                className = "flex gap-3"
                            >
                                <div onClick = {handleHamburgerClick}>
                                    <RxHamburgerMenu className = "text-white text-3xl"/>
                                </div>
                            </motion.div>

                            <motion.img 
                                initial = {{x: 200, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: 1}}
                                draggable = "false"
                                className = "nav-avatar cursor-pointer aspect-square h-10 mr-[1.6rem] object-contain select-none"
                                src = "amber_avatar.png" 
                                alt = "avatar_picture"
                            />
                        </div>
                        
                    </div>
                </div>
            )
        }
            
        </>
    )
}

export default NavBar