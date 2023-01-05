import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../profile/Profile';
import instance from "../../api/Http"

const Login = (props) => {

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    instance.post("/login",{email: email, password: password},{withCredentials: true,})
    .then(res => {
      if (!res.data.Status)
        throw "Invalid user!"

        setUser(res.data.Username)
        console.log('succses');
        setEmail('');
        setPassword('');
        props.onSetIsLogin();
    })
    .catch(err => {
        console.error(err)
        alert("Error user:" + err)
    })

 }
   


  return (

  
    
    <div>
        {props.login && 
          <Profile Username={user} />
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
              <p className="my-1">
              Forgot Password? <Link to='/reset'>Reset Password</Link>
              </p>
          </div>
        }
    </div>
    
    
  )
}

export default Login;