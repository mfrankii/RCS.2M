import React, { useEffect } from 'react'
import ClientItem from './ClientItem';
import { useState } from 'react';
import instance from "../../api/Http"

const ClientsList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    instance.get("GetConsumer")
      .then(result => {
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
            key={client.name} 
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