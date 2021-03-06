/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Route } from 'react-router-dom';
import TableContainer from '../ContentWrapper/Tables/TablesContainer';
import axios from 'axios';
import UserInformationContainer from './UserInformationContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //marginTop: 90,
    padding: theme.spacing(11, 3),
  },
}));

function UsersContainer() {
  const baseUrl = "http://localhost:3000/api/";
  const usersUrl = "users";

  const classes = useStyles();
  const [users, setUsers] = useState([]);

  async function getUsers() {
    let response;

    try {
      response = await axios.get(`${baseUrl}${usersUrl}`);
      const result = response.data.data.users;

      if (result.length > 0) {
        console.log("Users: ", result);
        setUsers(result);
      }
    } catch (error) {
      console.log("Error: ", error.msg);
    }
  }

  useEffect(() => {
    async function loadUsers() {
      await getUsers();
    }

    loadUsers();
    console.log("UsersContainer Users: ", users);
  }, []);

  return (
    <div className={classes.root}>
      {users.length === 0 && <p>Loading...</p>}
      {
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TableContainer category="users" />
          </Grid>
          <Route path="/users/:userID" render={(props) => <UserInformationContainer {...props} users={users}/>}/>
        </Grid>
      }
    </div>
  );
}

export default UsersContainer;
