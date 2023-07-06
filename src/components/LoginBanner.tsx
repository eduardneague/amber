import React, {useState} from 'react'
import { useScrollBlock } from '../useBlockScroll'
import { auth } from '../firebase'
import { motion } from 'framer-motion'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

import '../css/login.css'

const LoginBanner: React.FC = (): JSX.Element => {
    
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const [blockScroll, allowScroll] = useScrollBlock()
    blockScroll()

    if(user) {
        navigate('/', {state: {message: "Already Logged In"}})
        allowScroll()
    }

    const [signIn, setSignIn] = useState<boolean>(false)
    const [register, setRegister] = useState<boolean>(false)
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    
    const [formDetails, setFormDetails] = useState(
        {
            email_input: '',
            password_input: ''
        }
    )
    const [registerDetails, setRegisterDetails] = useState(
        {
            email_register_input: '',
            password_register_input: ''
        }
    )

    const handleRegister = () => {
        setRegister(true)
        setRegisterSuccess(false)
        setSignIn(false)
        setRegisterDetails({
            email_register_input: '',
            password_register_input: ''
        })
    }
    
    const handleBackToSignIn = () => {
        setRegister(false)
        setSignIn(true)
        setError('')
    }

    const handleFormSubmit = (event: any) => {
        event.preventDefault()
    }

    const handleRegisterFormSubmit = (event: any) => {
        event.preventDefault()
    }

    const signInUser = () => {
        signInWithEmailAndPassword(auth, formDetails.email_input, formDetails.password_input)
            .then((userCredentials: any) => {
                // console.log(userCredentials)
                navigate('/', {state: {message: "Log In: Success"}})
                allowScroll()
                setError('')
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    const registerUser = () => {
        createUserWithEmailAndPassword(auth, registerDetails.email_register_input, registerDetails.password_register_input)
            .then(() => {
                setRegisterSuccess(true)
            })
            .catch((error: any) => {
                setError(error.message)
            })
    }
    
    const handleRegisterInputChange = (event: any) => {
        setRegisterDetails((prevFormData) => ({ ...prevFormData, [event.target.name]: event.target.value }));
    }

    const handleInputChange = (event: any) => {
        setFormDetails((prevFormData) => ({ ...prevFormData, [event.target.name]: event.target.value }));
    }

    return (
        <div className = "login-background-wrapper bg-cover w-full h-screen flex justify-center items-center font-[Poppins]">
            { signIn === false && register === false ?
                (
                    <motion.div 
                        initial = {{y: -200, opacity: 0}}
                        animate = {{y: 0, opacity: 1}}
                        transition = {{ease: "easeOut", duration: .5}}
                        className = "login-box flex flex-col justify-center items-center"
                    >
                        <img 
                            src = "amber_logo_full.png" 
                            alt = "Amber Logo"
                            className = "object-contain h-[4rem] md:h-[5rem] lg:h-[7rem] select-none" 
                            draggable = "false"
                        />

                        <h1 className = "text-white text-center text-xl md:text-3xl lg:text-4xl font-bold">
                            Your one stop for all movies <br/> and tv shows!
                        </h1>

                        <button 
                            onClick = {() => setSignIn(true)}
                            className = "get-started-button select-none bg-amber-orange p-4 text-white font-bold text-xl md:text-2xl rounded-md mt-5 md:mt-7 cursor-pointer"
                        >
                            Get Started
                        </button>
                    </motion.div>
                ) 
                /* SIGN IN */ 
                : signIn === true && register === false ?
                (
                    <div>
                        <motion.div 
                            initial = {{y: -200, opacity: 0}}
                            animate = {{y: 0, opacity: 1}}
                            transition = {{ease: "easeOut", duration: .5}}
                            className = "login-box-credentials flex gap-6 flex-col bg-[#111] w-[20rem] p-5 font-[Poppins]">
                            <h1 className = "text-white text-2xl font-bold">
                                Sign In
                            </h1>
                            <form 
                                onSubmit = {handleFormSubmit}
                                className = "flex flex-col gap-4"
                            >
                                <input 
                                    type = "email" 
                                    name = "email_input"
                                    id = "email_input"
                                    value = {formDetails.email_input}
                                    placeholder = 'Email'
                                    onChange = {handleInputChange}
                                    className = "p-2 w-full h-12 rounded-md"
                                />
                                <input 
                                    type = "password" 
                                    name = "password_input"
                                    id = "password_input"
                                    value = {formDetails.password_input}
                                    placeholder = 'Password'
                                    onChange = {handleInputChange}
                                    className = "p-2 w-full h-12 rounded-md"
                                />
                                <button 
                                    onClick = {signInUser}
                                    className = "sign-in-button get-started-button mt-4 flex justify-center items-center select-none h-12 bg-amber-orange p-4 text-white font-bold text-xl rounded-md cursor-pointer"
                                >
                                Sign In
                                </button>
                                <p className = "text-red-500 font-[Poppins]">
                                    {error}
                                </p> 
                            </form>
                            <p className = "text-gray-400 flex gap-1">New to Amber? 
                                <span 
                                    className = "text-white font-bold cursor-pointer select-none hover:underline"
                                    onClick = {handleRegister}
                                > 
                                    Register now.
                                </span> 
                            </p>
                        </motion.div>
                        <motion.div 
                            initial = {{y: -200, opacity: 0}}
                            animate = {{y: 0, opacity: 1}}
                            transition = {{ease: "easeOut", duration: .5}}
                            className = "login-box-credentials flex gap-0 flex-col bg-[#111] w-[20rem] p-5 font-[Poppins] mt-5">
                            <h1 className = "text-white text-xl font-bold">
                                Here's a demo account for just trying out the app:
                            </h1>
                            <div className = "mt-5">
                                <p className = "text-amber-orange font-bold">E-mail: <span className = "font-normal text-white">demo@amber.com</span> </p>
                                <p className = "text-amber-orange font-bold">Password: <span className = "font-normal text-white">demodemo</span> </p>
                            </div>
                        </motion.div>
                    </div>

                /* REGISTER */ 
                ) : signIn === false && register === true && registerSuccess === false ? 
                (
                    <motion.div 
                        initial = {{y: -200, opacity: 0}}
                        animate = {{y: 0, opacity: 1}}
                        transition = {{ease: "easeOut", duration: .5}}
                        className = "login-box-credentials flex gap-6 flex-col bg-[#111] w-[20rem] p-5 font-[Poppins]">
                        <h1 className = "text-white text-2xl font-bold">
                            Register
                        </h1>
                        <form 
                            onSubmit = {handleRegisterFormSubmit}
                            className = "flex flex-col gap-4"
                        >
                            <input 
                                type = "email" 
                                name = "email_register_input"
                                id = "email_register_input"
                                value = {registerDetails.email_register_input}
                                placeholder = 'Email'
                                onChange = {handleRegisterInputChange}
                                className = "p-2 w-full h-12 rounded-md"
                            />
                            <input 
                                type = "password" 
                                name = "password_register_input"
                                id = "password_register_input"
                                value = {registerDetails.password_register_input}
                                placeholder = 'Password'
                                onChange = {handleRegisterInputChange}
                                className = "p-2 w-full h-12 rounded-md"
                            />
                            <button 
                                onClick = {registerUser}
                                className = "sign-in-button get-started-button mt-4 flex justify-center items-center select-none h-12 bg-amber-orange p-4 text-white font-bold text-xl rounded-md cursor-pointer"
                            >
                            Register
                            </button>
                            <p className = "text-red-500 font-[Poppins]">
                                {error}
                            </p> 
                        </form>
                        <p className = "text-gray-400 flex flex-col">Already have an account?
                            <span 
                                className = "text-white font-bold cursor-pointer select-none hover:underline"
                                onClick = {handleBackToSignIn}
                            > 
                                Sign In now.
                            </span> 
                        </p>
                    </motion.div>
                ) 
                : signIn === false && register === true && registerSuccess === true ? 
                (
                    <div className = "login-box-credentials flex gap-6 flex-col bg-[#111] w-[20rem] p-5 font-[Poppins]">
                        <h1 className = "text-white text-center text-2xl font-bold">Account Created <br/> Successfully</h1>
                        <p className = "text-white text-xl text-center">Your account was created successfuly!</p>
                        <button 
                                onClick = {handleBackToSignIn}
                                className = "sign-in-button get-started-button mt-4 flex justify-center items-center select-none h-12 bg-amber-orange p-4 text-white font-bold text-xl rounded-md cursor-pointer"
                            >
                            Sign In
                            </button>
                    </div>                
                ) 
                : ('')
            }
        </div>  
    )
}

export default LoginBanner