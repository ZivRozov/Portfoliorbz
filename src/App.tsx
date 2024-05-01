import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
    <nav className='nav'>
    <div className='gummy-bear'></div>
    <div className='nav-backdrop'></div>
      <div className='container'>
        <ul className='nav-inner font-main'>
          <li><a href=''>ABOUT</a></li>
          <li><a href=''>PROJECTS</a></li>
          <li><a href=''>CONTACT</a></li>
        </ul>
      </div>
    </nav>

    </>
  )
}

export default App
