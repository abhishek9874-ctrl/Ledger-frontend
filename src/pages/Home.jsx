import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import SecurityBanner from '../components/SecurityBanner'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        <SecurityBanner/>
    </div>
  )
}

export default Home
