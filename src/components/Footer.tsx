import React from 'react'
import {Link} from 'react-router-dom'
import '../css/footer.css'

const Footer: React.FC = (): JSX.Element => {
    return (
        <div className = "flex flex-col justify-center items-center w-full">
            <div className = "footer-grid bg-black font-[Poppins] text-white mt-3">
                <Link to = "/">
                    <img 
                        src = "amber_logo_full.png" 
                        alt = "Amber Logo"
                        className = "w-32 cursor-pointer select-none"
                        draggable = "false"
                    />
                </Link>
                
                <Link to = "https://www.themoviedb.org/" target = "_blank">
                    <img 
                        src = "powered_by_tmdb.png" 
                        alt = "TMDB Logo"
                        className = "w-32 cursor-pointer select-none"
                        draggable = "false"
                    />
                </Link>

                
                <div className = "footer-grid-column1 flex flex-col gap-2 text-sm text-gray-100">
                    <p className = "footer-link">Audio Description</p>
                    <p className = "footer-link">Investors</p>
                    <p className = "footer-link">Legal Manners</p>
                    <p className = "footer-link">Usage Conditions</p>
                    <p className = "footer-link">Company Information</p>
                </div>
                <div className = "footer-grid-column2 flex flex-col gap-2 text-sm">
                    <p className = "footer-link">Help</p>
                    <p className = "footer-link">Media Center</p>
                    <p className = "footer-link">Carrers</p>
                    <p className = "footer-link">Confidenitality</p>
                    <p className = "footer-link">Cookie Preferences</p>
                </div>
            </div>
        <p className = "text-gray-100 text-sm mt-10">@2023 Amber Inc.</p>
        </div>
    ) 
}

export default Footer