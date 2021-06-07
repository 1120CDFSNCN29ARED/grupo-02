import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import TotalsRowContainer from "../ContentWrapper/TotalsRow/TotalsRowContainer";
import TablesContainer from "../ContentWrapper/Tables/TablesContainer";
import LastAndCategoryInformationContainer from "../ContentWrapper/LastCreatedRow/LastAndCategoryInformationContainer";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export default function Main() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TotalsRowContainer />
        <LastAndCategoryInformationContainer />
        <TablesContainer category="users" />
        <TablesContainer category="posts" />
      </main>
    </>
  );
}
