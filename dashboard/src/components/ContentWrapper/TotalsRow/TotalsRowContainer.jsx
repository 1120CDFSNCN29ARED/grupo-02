import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SmallCard from "../../SmallCard/SmallCard";
import LineGraph from "../../AreaGraph/AreaGraph";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 25,
  },
}));

const chart = {
  width: 100,
  height: 100,
};

const baseUrl = "http://localhost:3000/api/";
const usersUrl = "users";
const postsUrl = "posts";
const questionsUrl = "questions";

const data = [
  {
    name: "Page A",
    users: 4000,
    posts: 2400,
    value: 2400,
    questions: 1234,
  },
  {
    name: "Page B",
    users: 3000,
    posts: 1398,
    value: 2210,
    questions: 1213,
  },
  {
    name: "Page C",
    users: 2000,
    posts: 9800,
    value: 2290,
    questions: 2400,
  },
  {
    name: "Page D",
    users: 2780,
    posts: 3908,
    value: 2000,
    questions: 3212,
  },
  {
    name: "Page E",
    users: 1890,
    posts: 4800,
    value: 2181,
    questions: 2312,
  },
  {
    name: "Page F",
    users: 2390,
    posts: 3800,
    value: 2500,
    questions: 2457,
  },
  {
    name: "Page G",
    users: 3490,
    posts: 4300,
    value: 2100,
    questions: 1850,
  },
];

export default function TotalsRowContainer() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [valuePublished, setValuePublished] = useState(0);
  const [questions, setQuestions] = useState([]);

  async function getUsers() {
    let response;

    try {

      response = await axios.get(`${baseUrl}${usersUrl}`);
      const result = await response.data.data.users;

      if (result.length > 0) {
        setUsers(result);
      }
    } catch (error) {
      console.log(error.msg);
    }
  }

  async function getPosts() {
    let response;

    try {

      response = await axios.get(`${baseUrl}${postsUrl}`);
      const result = await response.data.data;

      if (result.length > 0) {
        setPosts(result);
        setPublishedValue(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setPublishedValue(posts) {
    let publishedValue;
    
    if (posts.length > 0) {
      publishedValue = posts.reduce((acc, cur) => {
        return acc + cur.post.stock * cur.post.price;
      }, 0);
      setValuePublished(publishedValue);
    }
  }

  async function getQuestions() {
    let response;

    try {
      response = await axios.get(`${baseUrl}${questionsUrl}`);
      const result = response.data.data.questions;

      if (result.length > 0) {
        setQuestions(result);
      }
    } catch (error) {
      console.log(error.msg);
    }
  }

  useEffect(() => {
    async function loadUsers() {
      await getUsers();
    }
    async function loadPosts() {
      await getPosts();
    }
    async function loadQuestions() {
      await getQuestions();
    }
    loadUsers();
    loadPosts();
    loadQuestions();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={3}>
          <SmallCard
            backgroundColor="default"
            title="Usuarios"
            total={users.length}
            chart={chart}
          />
          <LineGraph data={data} dataKey="users" fillColor="#60f542" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SmallCard
            backgroundColor="default"
            title="Posts"
            total={posts.length}
            chart={chart}
          />
          <LineGraph data={data} dataKey="posts" fillColor="#4287f5" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SmallCard
            backgroundColor="default"
            title="Valor Publicado"
            total={"$ " + valuePublished}
            chart={chart}
          />
          <LineGraph data={data} dataKey="value" fillColor="#9c42f5" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SmallCard
            backgroundColor="default"
            title="Consultas"
            total={questions.length}
            chart={chart}
          />
          <LineGraph data={data} dataKey="questions" fillColor="#f5424e" />
        </Grid>
      </Grid>
    </div>
  );
}
