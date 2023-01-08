import React from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const Navbar = (props) => {

  const cookies = new Cookies();
  const logoutHandler = () => {
    cookies.remove("Username")
    window.location.reload()
  };

console.log(props.username)

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> RCS 2M</Link>
      </h1>
        {!props.username &&
          <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/'>Login</Link></li>
          </ul>
        }
        {props.username &&
        <ul>
          <li>Welcome,  {props.username}</li>
          <li onClick={logoutHandler}><Link to='/'>LogOut</Link></li>
        </ul>
        }
      
    </nav>
  )
}

export default Navbar;
