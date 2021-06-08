import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "100%",
    marginTop: 5,
  },
  inputFields: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostDataCard(props) {
  const classes = useStyles();
  const [post, setPost] = useState(props.post);

  useEffect(() => {
    setPost(props.post);
  }, [post, props.post]);
  console.log("props del postdatacard", props);
  return (
    <Card className={classes.root}>
      <CardContent>
        <form className={classes.inputFields} noValidate autoComplete="off">
          <div>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="title"
              label="Título"
              value={props.post.title}
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="seller"
              label="Vendedor"
              value={props.post.seller.userName}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="type"
              label="Tipo"
              value={props.post.post.productType}
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="price"
              label="Precio"
              type="number"
              value={props.post.post.price}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="brand"
              label="Marca"
              value={props.post.post.brandName}
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="model"
              label="Modelo"
              value={props.post.post.modelName}
              variant="outlined"
            />
          </div>

          <div>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="province"
              label="Provincia"
              value={props.post.location.provinceName}
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="city"
              label="Ciudad"
              value={props.post.location.locationID}
              variant="outlined"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
