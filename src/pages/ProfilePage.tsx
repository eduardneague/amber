import React, {useState} from 'react'
import '../css/profilepage.css'

import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

const ProfilePage: React.FC = (): JSX.Element => {
    const user = useSelector(selectUser)
    const [error, setError] = useState<string>('')

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Sign Out: Success')
            })
            .catch((error: any) => {
                setError(error.message)
            })
    }

    return (
        <>
            <div className = "mt-[10rem] mb-[5rem] md:mt-[15rem] md:mb-[10rem] flex flex-col items-center justify-center font-[Poppins]">
                <div className = "flex">
                    <div>
                        <img 
                            src="amber_avatar.png" 
                            alt="amber_avatar" 
                            className = "h-[5rem] select-none"
                            draggable = "false"
                        />
                    </div>

                    <div className = "ml-5">
                        <img 
                            src="amber_logo_full.png" 
                            alt = "Amber Logo" 
                            draggable = "false" 
                            className = "select-none object-contain h-[1.5rem]"
                        />
                        <h1 className = "text-white font-bold text-2xl">Welcome!</h1>
                        <h1 className = "text-gray-300 text-xl">{user.email}</h1>
                    </div>
                </div>
                

                <button 
                    onClick = {handleSignOut}
                    className = "get-started-button select-none w-[19rem] bg-amber-orange p-3 text-white font-bold text-xl md:text-2xl rounded-md mt-5 md:mt-7 cursor-pointer"
                >
                    Sign Out
                </button>
                <p className = "text-red-500 font-[Poppins]">
                    {error}
                </p> 
            </div>
        </>
    )
}

export default ProfilePage