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
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState(props.posts);
  console.log("props del postinformationcontainer", props);
  const postToDisplay = props.posts.find((e) => e.post.postID === postID);
  const [post, setPost] = useState(postToDisplay);
  console.log("PostToDisplay: ", postToDisplay);

  useEffect(() => {
    setPost(postToDisplay);
    console.log("Post Updated: ", post, "color: green");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <div className={classes.root}>
      {
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <PostDataCard post={postToDisplay} />
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default PostInformationContainer;
