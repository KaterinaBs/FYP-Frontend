import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import React from 'react';
import image from '../../assets/logo3.png';
import ExitImage from '../../assets/exit50.png';
import { useAuth } from '../auth/useAuth';

function Header() {

    const { loggedInUser } = useAuth();


    const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null)
    return (
        loggedInUser &&
        <header>
            <div className='navBar' id = 'TopNav'>
            <ul className = 'list'>
                <li><NavLink to='/' className ={getLinkStyle}> My Modules </NavLink></li>
                <li><NavLink to = '/announcements'className='announcements'>Announcements</NavLink></li>
                <li><NavLink to='/myaccount' className='account'> My Account </NavLink></li>
            </ul>
            </div>
            <img className='logout' src={ExitImage}></img>
            <Link to='/' className='logo'> <img className='webTitle' src={image}></img></Link> 
            {
        loggedInUser &&
         <div className="welcome"><p>{`Welcome ${loggedInUser.TeacherName}`}</p></div>
      }
        </header> 
       
    )
}



export default Header;
  
  
  