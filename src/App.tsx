import React from 'react';
import HomeScreen from './pages/HomeScreen'

import '../src/css/reset.css'
import '../src/css/utility.css'

const App: React.FC = (): JSX.Element => {
    return (
      <>
        <div className = "app bg-black mb-10">
            <HomeScreen/>        
        </div>
      </>
    )
}

export default App;
