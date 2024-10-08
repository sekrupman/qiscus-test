import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

function Navigationbar(){
    return(
      <div>
        <Navbar.Brand href="/">
            <img
              alt="logo"
              src="/images/logo.png"
              width="80"
              height="80"
            />{' '}
            <span style={{ fontSize:'30px' }}>Chat App</span>
          </Navbar.Brand>
      </div>
    )
}

export default Navigationbar