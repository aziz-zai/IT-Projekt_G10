import React from 'react'
import './Home.css'
import NavBar from '../components/NavBar'
import test from '../images/test.svg'

function Home() {
  return (
      <div>
    <NavBar/>
    <div className="test">
        <img src={test}></img>
        <h1>Die Seite steht ist noch in Bearbeitung!</h1>
    </div>
    </div>
  )
}

export default Home