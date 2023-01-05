import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ChangePassword = () => {

  

  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    //API req Check if old password is correct
    //change old password to new password
    setNewPassword('');
    setOldPassword('');
    alert("password changed");
    //if new password is ok go to login screen
    navigate('/');
    
    
 }


  return (

  
    
    <div>
              <h1 className="large text-primary">Change Password</h1>
              <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                  <input 
                      type="password" 
                      placeholder="Old Password"
                      name="oldPassword" 
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      />
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="New password"
                  name="newPassword"
                  minLength="6"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Change Password" />
              </form>
     </div>
    
    
  )
}

export default ChangePassword;