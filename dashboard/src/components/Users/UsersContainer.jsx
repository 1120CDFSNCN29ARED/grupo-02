import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Switch, Link, Route } from 'react-router-dom';
import TableContainer from '../ContentWrapper/Tables/TablesContainer';
import axios from 'axios';
import UserDataCard from './UserDataCard';
import UserHistoryCard from './UserHistoryCard';
import UserInformationCard from './UserInformationCard';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 25,
    //marginTop: 90,
    padding: theme.spacing(11, 3),
  },
}));

function UsersContainer() {
  const baseUrl = "http://localhost:3000/api/";
  const usersUrl = "users";

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <Grid item xs={12}>
            <UserInformationCard user={users[0]} />
          </Grid>
          <Grid item xs={12} md={8}>
            <UserDataCard user={users[0]} />
          </Grid>
          <Grid item xs={12} md={4}>
            <UserHistoryCard />
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default UsersContainer;
