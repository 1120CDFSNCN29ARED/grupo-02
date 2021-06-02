import React, { useEffect, useState } from 'react'
import axios from 'axios';
function UserProfileCard() {

  const baseUrl = "http://localhost:3000/api/users";
  const usersUrl = "users";


  const [users, setUsers] = useState([]);

  async function getUsers(){
    let response;
    try {
      response = await fetch(`${baseUrl}`);
      if (response) {
        console.log("REPSONSE EXISTS:", response);
        const result = await response.json();
				console.log("RESULT DATA: ", result);
        return result
      }
      
    } catch (error) {
      console.log("Error: ",error);
    }
  }

  useEffect(() => {
    getUsers();
    return () => {
      //
    }
  }, [])

  return (
    <div>
      Testing The fetch users:{}
    </div>
  )
}

export default UserProfileCard
