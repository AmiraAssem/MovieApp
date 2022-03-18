import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'

export default function Navbar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${style.bgCustom} shadow-lg mb-5`}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fw-bold ms-5" to="/" >Noxe </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.userData ? <>
                <li className="nav-item">
                  <Link className={`nav-link active ${style.customLink}`} to="/home" >Home </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link  ${style.customLink}`} to="/" >About </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link  ${style.customLink}`} to="/" >Network </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link  ${style.customLink}`} to="/" >Movies </Link>
                </li>

              </> : ''}
            </ul>
            <div className="social-media d-flex">
              <i className='mx-2 fab fa-instagram'></i>
              <i className='mx-2 fab fa-facebook'></i>
              <i className='mx-2 fab fa-youtube'></i>
              <i className='mx-2 fab fa-twitter'></i>
            </div>
            <ul className="navbar-nav me-5 mb-2 mb-lg-0">
              {props.userData ?
                <li className="nav-item">
                  <span className="nav-link cursor " onClick={props.logOut} >LogOut </span>
                </li>
                : <>
                  <li className="nav-item">
                    <Link className="nav-link " to="/login" >Login </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/register" >Register </Link>
                  </li>
                </>}

            </ul>
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>

    </div>
  )
}
