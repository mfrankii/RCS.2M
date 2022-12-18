import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../profile/Profile';

const Login = (props) => {

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = async e => {
    e.preventDefault();
    //API req Check if user exist
    //if exsit set isLogin to true and render profile with Data
    console.log('succses');
    setEmail('');
    setPassword('');
    props.onSetIsLogin();
    
 }
   


  return (

  
    
    <div>
        {props.login && 
          <Profile />
        }
        {!props.login && 
           <div>
              <h1 className="large text-primary">Sign In</h1>
              <p className="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
              
              <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                  <input 
                      type="email" 
                      placeholder="Email Address"
                      name="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
              </form>
              <p className="my-1">
              Dont have an account? <Link to='/register'>Sign Up</Link>
              </p>
          </div>
        }
    </div>
    
    
  )
}

export default Login;