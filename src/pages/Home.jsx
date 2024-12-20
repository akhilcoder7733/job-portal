import React from 'react'
import Hero from './Hero'
import NoticePage from './NoticePage'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <div style={{backgroundImage:"linear-gradient(348deg, rgba(229,206,197,1) 15%, rgba(54,177,117,1) 100%)"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Terminal Solutions</title>
      </Helmet>
    <Hero/>
    <NoticePage/>
    </div>
  )
}

export default Home
