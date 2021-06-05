import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function SmallCard({ title, total, backgroundColor, chart }) {
  const useStyles = makeStyles({
    root: {
      padding: 0,
      backgroundColor: backgroundColor,
      color: "white",
      textAlign: "left",
      justifyContent: "left",
    },
    total: { fontSize: "1.3rem" },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          className={classes.total}
          gutterBottom
        >
          {total}
        </Typography>
        <Typography className={classes.pos}>{title}</Typography>
      </CardContent>
    </Card>
  );
}

export default SmallCard;
