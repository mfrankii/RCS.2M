import React, { useEffect } from 'react'
import ClientItem from './ClientItem';
import { useState } from 'react';
import instance from "../../api/Http"



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
  const [data, setData] = useState([]);
  useEffect(() => {
    instance.get("GetConsumer")
      .then(result => {
        console.table(result.data)
        setData(result.data);
      })
      .catch(err => {
          console.error(err)
          alert("Error user:" + err)
      })
  }, []);

  return (
    <div>
      <h1>Clients List</h1>
       {
        data.map((client) => (
            <ClientItem
            key={client.consumer_id} 
            name={client.name}
            email={client.email}
            phone={client.phone}
            Active={client.isActive ? "Is Active" : "Is Not Active"}
            />
        ))
       }
        
    </div>
  )
}

export default ClientsList;