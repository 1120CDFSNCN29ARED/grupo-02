import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Route } from "react-router-dom";
import TableContainer from "../ContentWrapper/Tables/TablesContainer";
import axios from "axios";
import PostInformationContainer from "./PostInformationContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //marginTop: 90,
    padding: theme.spacing(11, 3),
  },
}));

function PostsContainer() {
  const baseUrl = "http://localhost:3000/api/";
  const postsUrl = "posts";

  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    let response;

    try {
      response = await axios.get(`${baseUrl}${postsUrl}`);
      const result = response.data.posts;

      if (result.length > 0) {
        console.log("Posts: ", result);
        setPosts(result);
      }
    } catch (error) {
      console.log("Error: ", error.msg);
    }
  }

  useEffect(() => {
    async function loadPosts() {
      await getPosts();
    }

    loadPosts();
    console.log("PostsContainer Posts: ", posts);
  }, []);

  return (
    <div className={classes.root}>
      {
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TableContainer category="posts" />
          </Grid>
          <Route
            path="/posts/:postID"
            render={(props) => (
              <PostInformationContainer {...props} posts={posts} />
            )}
          />
        </Grid>
      }
    </div>
  );
}

export default PostsContainer;
