import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => {


  const logoutHandler = () => {
    props.onSetIsLogin();
  };



  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> RCS 2M</Link>
      </h1>
        {!props.login &&
          <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/'>Login</Link></li>
          </ul>
        }
        {props.login &&
          <li onClick={logoutHandler}><Link to='/'>LogOut</Link></li>
        }
      
    </nav>
  )
}

export default Navbar;
