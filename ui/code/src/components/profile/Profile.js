import React from 'react'
import ClientsList from './ClientsList';
import { useState } from 'react';



const Profile = (props) => {


  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPackege, setClientPackege] = useState('');
  const [client,setClient] = useState({});

  const onSubmit = async e => {
    e.preventDefault();
    //API post req to ADD new client to list
    //if email exist do not add client
    console.log('succses');


    setClientName('');
    setClientEmail('');
    setClientPackege('');
 }


  return (
    <div>
        <h1 className="large text-primary">Hello {props.Username}</h1>
        <p className="lead">Add New Client</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                  <input 
                      type="text" 
                      placeholder="Client Name"
                      name="name" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      />
              </div>
              <div className="form-group">
                  <input
                  type="email"
                  placeholder="Client Email"
                  name="email"
                  value={clientEmail}
                  onChange={(e) =>  setClientEmail(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <input
                  type="text"
                  placeholder="Client Packege"
                  name="packege"
                  value={clientPackege}
                  onChange={(e) => setClientPackege(e.target.value)}
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Add Client" />
              </form>
        <ClientsList />
    </div>
  )
}

export default Profile;