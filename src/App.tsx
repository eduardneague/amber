import React from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom'

import RootLayout from './pages/RootLayout'
import WentWrong from './pages/WentWrong'
import HomeScreen from './pages/HomeScreen'
import Originals from './pages/Originals'
import Movies from './pages/Movies'
import TopRated from './pages/TopRated'
import Trending from './pages/Trending'

import '../src/css/reset.css'
import '../src/css/utility.css'

const App: React.FC = (): JSX.Element => {
    return (
      <>
        <div className = "app bg-black mb-10">
          <Routes>
            <Route path = "/" element = {<RootLayout/>} errorElement = {<WentWrong/>}>
                <Route index element = {<HomeScreen/>}/>
                <Route path = "/originals" element = {<Originals/>}/>
                <Route path = "/movies" element = {<Movies/>}/>
                <Route path = "/top-rated" element = {<TopRated/>}/>
                <Route path = "/trending" element = {<Trending/>}/>
            </Route>
          </Routes> 
        </div>
      </>
    )
}

export default App;
