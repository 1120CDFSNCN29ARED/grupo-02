import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostDataCard from "./PostDataCard";
//import PostHistoryCard from "./PostHistoryCard";
//import PostInformationCard from "./PostInformationCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 25,
    //marginTop: 90,
    padding: theme.spacing(0, 3),
  },
}));

function PostInformationContainer(props) {
  const postID = props.match.params.postID;
  console.log("PARAMS: ", props.match.params.postID);
  const classes = useStyles();
  const [posts, setPosts] = useState(props.posts);
  const postToDisplay = props.posts.find((e) => e.postID === postID);
  const [post, setPost] = useState(postToDisplay);
  console.log("PostToDisplay: ", postToDisplay);

  useEffect(() => {
    setPost(postToDisplay);
    console.log("Post Mounted: ", post, "color: yellow");
  }, []);

  useEffect(() => {
    setPost(postToDisplay);
    console.log("Post Updated: ", post, "color: green");
  }, [post]);

  return (
    <div className={classes.root}>
      {
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <PostDataCard user={postToDisplay} />
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default PostInformationContainer;
