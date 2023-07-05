import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

const ProtectedRoutes: React.FC = (): JSX.Element => {
    const user = useSelector(selectUser)
    return (
        <>
            {user === null ? <Navigate to = "/login"/> : <Outlet/>}
        </>
    )
}

export default ProtectedRoutes