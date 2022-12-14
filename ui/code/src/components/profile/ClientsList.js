import React from 'react'
import ClientItem from './ClientItem';
import { useState } from 'react';


const list = [
  {
  id: '1',
  name: 'sharon',
   email: 'shaha12@gmail.com',
  package: '123'
  },
  {
  id:'2',
  name: 'ram',
   email: 'ddsda12@gmail.com',
  package: '1224'
  },
  {
   id:'3',
  name: 'moshe',
  email: 'mmma12@gmail.com',
  package: '443'
  },
]

const ClientsList = (props) => {
    
    //fetch the client list from db and render it
    const listArr = [
      {
      id: '1',
      name: 'sharon',
       email: 'shaha12@gmail.com',
      package: '123'
      },
      {
      id:'2',
      name: 'ram',
       email: 'ddsda12@gmail.com',
      package: '1224'
      },
      {
       id:'3',
      name: 'moshe',
      email: 'mmma12@gmail.com',
      package: '443'
      },
    ]
  

  return (
    <div>
      <h1>Clients List</h1>
       {
        list.map((client) => (
            <ClientItem
            id={client.id} 
            name={client.name}
            email={client.email}
            package={client.packageNum}
            />
        ))
       }
        
    </div>
  )
}

export default ClientsList;