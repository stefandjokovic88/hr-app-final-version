import React, { useState/*,useEffect*/ } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import { Sidenav } from '../Sidenav/Sidenav';
import navLogo from '../../../../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../../../redux/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export const Navbar = (props) => {

    const {user,type} = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const [visibleSidenav, setVisibleSidenav] = useState(false)

    const handleSideNav = () => {
        visibleSidenav ? setVisibleSidenav(false) : setVisibleSidenav(true)
    }

    const routeAndClose = () => {
        setVisibleSidenav(false)
    }

    const onOutsideClick = () => {
        setVisibleSidenav(false)
    }


    return (
        <div>
        <div className="nav">
            <div className="nav-mob">
        
                {user && 
                <div className="nav-burger">
                    {visibleSidenav ? null : <i className="fa fa-2x fa-bars nav-burger-icon" onClick={handleSideNav} />}
                </div>
                }
                
                <div className="nav-logo">
                    <Link to="/">
                        <img src={navLogo} alt="navigation-logo" className="nav-logo-icon" />
                    </Link>
                    <button className="submit-button" onClick={props.toggleTheme}>{props.themeIcon ? <FontAwesomeIcon icon={faSun} className="sun-icon"/> : <FontAwesomeIcon icon={faMoon} className="moon-icon"/>}</button>  
                </div>
            </div>
            {user && 
                <div className="nav-items">
                    <div className="nav-item">
                        <p className="nav-option" onClick={() => dispatch(logout())}>Logout</p>   
                    </div>
                </div>
            }
            {!user && !type && 
                <div className="nav-items">
                    <div className="nav-item">
                        <Link to="/login" className="nav-item-anchor">Login</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/join" className="nav-item-anchor">Register</Link>
                    </div>
                </div>
            }
        </div>
            {visibleSidenav ? <Sidenav routeAndClose={routeAndClose} onOutsideClick={onOutsideClick} /> : null}
        </div>
    )
}