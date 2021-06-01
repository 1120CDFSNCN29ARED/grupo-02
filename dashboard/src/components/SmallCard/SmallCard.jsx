import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AreaGraph from "../AreaGraph/AreaGraph";

function SmallCard({ title, total, backgroundColor, chart }) {
  const useStyles = makeStyles({
    root: {
      width: 250,
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
        <AreaGraph width={chart.width} height={chart.height} />
      </CardContent>
    </Card>
  );
}

export default SmallCard;
