import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice'

import {
  Route,
  Routes,
} from 'react-router-dom'

import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";

import RootLayout from './pages/RootLayout'
import WentWrong from './pages/WentWrong'
import HomeScreen from './pages/HomeScreen'
import Originals from './pages/Originals'
import Movies from './pages/Movies'
import TopRated from './pages/TopRated'
import Trending from './pages/Trending'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'

import ProtectedRoutes from './components/ProtectedRoutes';

import Login from './pages/Login'

import '../src/css/reset.css'
import '../src/css/utility.css'

const App: React.FC = (): JSX.Element => {

  const dispatch = useDispatch()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user)
          dispatch(
              login(
                {
                  uid: user.uid,
                  email: user.email,
                }
              )
            )
        } else {
          dispatch(logout())
        }
      });

      return unsubscribe
    }, [dispatch])

    return (
      <>
        <div className = "app bg-black mb-10 flex justify-center items-center flex-col w-full">
          <Routes>
            
            <Route element = {<ProtectedRoutes/>} errorElement = {<WentWrong/>}>
              <Route path = "/" element = {<RootLayout/>}>
                  <Route index element = {<HomeScreen/>}/>
                  <Route path = "/originals" element = {<Originals/>}/>
                  <Route path = "/movies" element = {<Movies/>}/>
                  <Route path = "/top-rated" element = {<TopRated/>}/>
                  <Route path = "/trending" element = {<Trending/>}/>
                  <Route path = "/search" element = {<SearchPage/>}/>
                  <Route path = "/profile" element = {<ProfilePage/>}/>
              </Route>
            </Route>
            <Route path = "/login" element = {<Login/>}/>

          </Routes> 
        </div>
      </>
    )
}

export default App;
