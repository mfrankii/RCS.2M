import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';

const ForgotPassword = () => {

  

  const [email, setEmail] = useState('');
  const [isExist, setIsExist] = useState(false);
  const [resetPassword, setResetPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    //API req Check if user exist
    //if exsit sent value for user
    console.log('succses');
    setEmail('');
    setIsExist(true);
    
    
 }

 const resetSubmit = async e => {
    e.preventDefault();
    //check if email value is correct
    //redirect to change password
    console.log('succses');
    setResetPassword('');
    setIsExist(false);
    navigate('/change');
    
    
 }
   


  return (

  
    
    <div>
           <div>
              <h1 className="large text-primary">Reset Password</h1>
              <p className="lead"><i class="fas fa-user"></i> we will sent password to your email</p>
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
                <input type="submit" className="btn btn-primary" value="send" />
              </form>
          </div>
          {isExist &&
            <div>
              <p className="lead"><i class="fas fa-user"></i>display password you got on email</p>
              <form className="form" onSubmit={e => resetSubmit(e)}>
              <div className="form-group">
                  <input 
                      type="password" 
                      placeholder="email sent password"
                      name="resetPassword" 
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      />
              </div>
                <input type="submit" className="btn btn-primary" value="Reset" />
              </form>
          </div>
          }
        
    </div>
    
    
  )
}

export default ForgotPassword;