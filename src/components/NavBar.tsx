import React, {useEffect, useState} from 'react'
import '../css/navbar.css'
import {motion} from 'framer-motion'

const NavBar: React.FC = (): JSX.Element => {

    const [show, setShow] = useState<boolean | null>(false)

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

    return (
        <>
            <div className = {` ${show ? 'nav-black' : 'nav-wrapper'} w-full h-24 fixed top-0 z-[100]`}>
                <div className="nav-content flex justify-between items-center w-full h-full">
                    <motion.img
                        initial = {{x: -200, opacity: 0}}
                        animate = {{x: 0, opacity: 1}}
                        transition = {{ease: "easeOut", duration: 1}}
                        className = "mt-2 nav-logo aspect-square h-24 ml-[1.6rem] cursor-pointer object-contain"
                        src = "amber_logo_full.png" 
                        alt = "amber_logo"
                    />
                    <motion.img 
                        initial = {{x: 200, opacity: 0}}
                        animate = {{x: 0, opacity: 1}}
                        transition = {{ease: "easeOut", duration: 1}}
                        className = "nav-avatar cursor-pointer aspect-square h-10 mr-[1.6rem] object-contain"
                        src = "amber_avatar.png" 
                        alt = "avatar_picture"
                    />
                </div>
            </div>
        </>
    )
}

export default NavBar