import React, {useEffect, useState} from 'react'
import '../css/navbar.css'

import {Link} from 'react-router-dom'

import {motion} from 'framer-motion'

const LoginNavBar: React.FC = (): JSX.Element => {

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

    return (
        <> {
            windowWidth > 850 /* dekstop nav */ ? 
            (
                <div className = {`nav-wrapper w-full h-24 fixed top-0 z-[100]`}>
                    <div className="nav-content flex justify-between items-center w-full h-full">
                        <div className = "flex justify-center items-center gap-5">
                            <Link to = "/login">
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
                        </div>
                        
                        <div className = "flex gap-5 items-center justify-center cursor-pointer">
                            <Link to = "/profile">
                                <motion.img 
                                    initial = {{x: 200, opacity: 0}}
                                    animate = {{x: 0, opacity: 1}}
                                    transition = {{ease: "easeOut", duration: 1}}
                                    className = "nav-avatar cursor-pointer aspect-square h-10 mr-[1.6rem] object-contain select-none"
                                    draggable = "false"
                                    src = "amber_avatar.png" 
                                    alt = "avatar_picture"
                                />
                            </Link>
                        </div>
                        
                    </div>
                </div>
            ) : ( 
                /* mobile nav */  
                <div className = {`nav-wrapper w-full h-24 fixed top-0 z-[100]`}>
                    <div className="nav-content flex justify-between items-center w-full h-full">
                        <div className = "flex justify-center items-center gap-5">

                        {/* conditional logo rendering */}

                            {
                                windowWidth < 500 ? (
                                    <Link to = "/login">
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
                                : 
                                (
                                    <Link to = "/login">
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
                        </div>
                        
                        <div className = "flex gap-5 items-center justify-center cursor-pointer">
                            <motion.div
                                initial = {{y: -100, opacity: 0}}
                                animate = {{y: 0, opacity: 1}}
                                transition = {{ease: "easeOut", duration: 1}}
                                
                                className = "flex gap-3"
                            >
                              
                            </motion.div>

                            <Link to = "/profile">
                                <motion.img 
                                    initial = {{x: 200, opacity: 0}}
                                    animate = {{x: 0, opacity: 1}}
                                    transition = {{ease: "easeOut", duration: 1}}
                                    draggable = "false"
                                    className = "nav-avatar cursor-pointer aspect-square h-10 mr-[1.6rem] object-contain select-none"
                                    src = "amber_avatar.png" 
                                    alt = "avatar_picture"
                                />
                            </Link>
                        </div>
                        
                    </div>
                </div>
            )
        }
            
        </>
    )
}

export default LoginNavBar