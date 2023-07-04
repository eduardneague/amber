import React, {useEffect, useState} from 'react'
import '../css/navbar.css'

import {NavLink, Link} from 'react-router-dom'

import {motion} from 'framer-motion'
import {BiSearchAlt2} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {useScrollBlock} from '../useBlockScroll'

const NavBar: React.FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean | null>(false)
    const [mobileNav, setMobileNav] = useState<boolean>(false)
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    const [blockScroll, allowScroll] = useScrollBlock()

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

    const handleSearchClick = (event: any) => {
        setShowSearch(true)
    }

    return (
        <> {
            windowWidth > 820 /* dekstop nav */ ? 
            (
                <div className = {` ${show ? 'nav-black' : 'nav-wrapper'} w-full h-24 fixed top-0 z-[100]`}>
                    <div className="nav-content flex justify-between items-center w-full h-full">
                        <div className = "flex justify-center items-center gap-5">
                            <Link to = "/">
                                <motion.img
                                    initial = {{x: -200, opacity: 0}}
                                    animate = {{x: 0, opacity: 1}}
                                    transition = {{ease: "easeOut", duration: 1}}
                                    className = "mt-1 nav-logo aspect-square h-24 ml-[1.6rem] cursor-pointer object-contain select-none"
                                    draggable = "false"
                                    src = "amber_logo_full.png" 
                                    alt = "amber_logo"
                                />
                            </Link>
                            <div className = "flex gap-5 mb-[.15rem] font-[Poppins] select-none">
                                <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                        }
                                >
                                        Home
                                </NavLink>
                                <NavLink
                                        to="/originals"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                        }
                                >
                                        Originals
                                </NavLink>
                                <NavLink
                                        to="/movies"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                        }
                                        >
                                        Movies
                                </NavLink>
                                <NavLink
                                        to="/top-rated"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                        }
                                >
                                        Top Rated
                                </NavLink>
                                <NavLink
                                        to="/trending"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                        }
                                >
                                        Trending
                                </NavLink>
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
                                )
                                : 
                                (
                                    <div onClick = {(event) => {handleSearchClick(event)}}>
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

                        {/* conditional logo rendering */}

                            {
                                windowWidth < 500 ? (
                                    <Link to = "/">
                                        <motion.img
                                            initial = {{x: -200, opacity: 0}}
                                            animate = {{x: 0, opacity: 1}}
                                            transition = {{ease: "easeOut", duration: 1}}
                                            className = "nav-logo aspect-square h-[2rem] ml-[1.6rem] cursor-pointer object-contain select-none"
                                            draggable = "false"
                                            src = "amber_logo.png" 
                                            alt = "amber_logo"
                                        />
                                    </Link>
                                )
                                : 
                                (
                                    <Link to = "/">
                                        <motion.img
                                            initial = {{x: -200, opacity: 0}}
                                            animate = {{x: 0, opacity: 1}}
                                            transition = {{ease: "easeOut", duration: 1}}
                                            className = "mt-2 nav-logo aspect-square h-24 ml-[1.6rem] cursor-pointer object-contain select-none"
                                            draggable = "false"
                                            src = "amber_logo_full.png" 
                                            alt = "amber_logo"
                                        />
                                    </Link>
                                )
                            }    
                        {
                            mobileNav ? 
                            (
                                <motion.div
                                initial = {{x: 300, opacity: 0}}
                                animate = {{x: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: .5}} 
                                className = "absolute bg-black z-[101] right-0 top-0 w-full h-screen flex justify-center items-center font-[Poppins]"
                            >
                                <div
                                    onClick = {() => {allowScroll(); handleHamburgerClick()}}
                                >
                                    <AiOutlineClose className = "text-white text-4xl absolute top-[5%] right-[10%] cursor-pointer"/>
                                </div>

                                <div className = "flex flex-col gap-5 mb-[.15rem] text-center text-xl items-center select-none">
                                    <NavLink
                                            to="/"
                                            onClick = {() => {allowScroll(); handleHamburgerClick()}}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                            }
                                    >
                                            Home
                                    </NavLink>
                                    <NavLink
                                            to="/originals"
                                            onClick = {() => {allowScroll(); handleHamburgerClick()}}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                            }
                                    >
                                            Originals
                                    </NavLink>
                                    <NavLink
                                            to="/movies"
                                            onClick = {() => {allowScroll(); handleHamburgerClick()}}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                            }
                                    >
                                            Movies
                                    </NavLink>
                                    <NavLink
                                            to="/top-rated"
                                            onClick = {() => {allowScroll(); handleHamburgerClick()}}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                            }
                                    >
                                            Top Rated
                                    </NavLink>
                                    <NavLink
                                            to="/trending"
                                            onClick = {() => {allowScroll(); handleHamburgerClick()}}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "" : isActive ? "text-white font-bold" : "text-white"
                                            }
                                    >
                                            Trending
                                    </NavLink>
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
                                {
                                showSearch ? (
                                   <motion.div
                                    initial = {{x: -100, opacity: 0}}
                                    animate = {{x: 0, opacity: 1}}
                                    transition = {{ease: "easeOut", duration: .5}}
                                    className = "relative z-[100]"
                                    >
                                        <input 
                                            type = "text" 
                                            placeholder = "Search"
                                            name = "search_value"
                                            // value = ""
                                            className = "search-bar p-2 text-white bg-black focus:outline-2 focus:outline focus:outline-amber-orange font-[Poppins]"
                                        />
                                        <div className = "absolute top-[22%] right-2">
                                            <BsFillArrowRightCircleFill className = "text-amber-orange text-2xl"/>
                                        </div>
                                   </motion.div>
                                ) : 
                                (
                                    <div onClick = {(event) => {handleSearchClick(event)}} className = "flex gap-2">
                                        <BiSearchAlt2 className = "text-white text-3xl"/>
                                    </div>
                                )
                            }
                                
                            </motion.div>

                            <div onClick = {() => {blockScroll(); handleHamburgerClick()} }>
                                <RxHamburgerMenu className = "text-white text-3xl"/>
                            </div>

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