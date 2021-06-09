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
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="title"
            label="Título"
            value={props.post.post.title}
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
            id="published"
            label="Publicado"
            value={props.post.post.published ? "Sí" : "No"}
            variant="outlined"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="publishedDate"
            label="Fecha de publicación"
            value={
              props.post.post.published && props.post.post.publishedDate
                ? props.post.post.publishedDate
                : "N/A"
            }
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
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="onSale"
            label="En oferta"
            value={props.post.post.onSale ? "Sí" : "No"}
            variant="outlined"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="discount"
            type="number"
            label="Descuento"
            value={props.post.post.discount}
            variant="outlined"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="rating"
            type="number"
            label="Rating"
            value={props.post.post.rating}
            variant="outlined"
          />
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
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="version"
            label="Versión"
            value={
              props.post.post.versionName ? props.post.post.versionName : "N/A"
            }
            variant="outlined"
          />
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
            value={props.post.location.localityName}
            variant="outlined"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="postalCode"
            label="Código Postal"
            value={props.post.location.postalCode}
            variant="outlined"
          />
        </form>
      </CardContent>
    </Card>
  );
}
