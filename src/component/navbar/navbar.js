import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

function Navigationbar(){
    return(
        <Navbar.Brand href="/">
            <img
              alt="logo"
              src="/images/logo.png"
              width="80"
              height="80"
              className="d-inline-block align-top"
            />{' '}
            <span style={{ fontSize:'30px' }}>Chat App</span>
          </Navbar.Brand>
    )
}

export default Navigationbar