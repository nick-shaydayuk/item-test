import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, updateProduct } from '../../store/productsSlice';
import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, useState } from 'react';

const EditView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product: Product = location.state;
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.productReducer);

  const [title, setTitle] = useState(product.title);
  const [thumbnail, setThumbnail] = useState(product.thumbnail);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleUpdateValue = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    switch (key) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'thumbnail':
        setThumbnail(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'price':
        setPrice(parseInt(e.target.value));
        break;

      default:
        break;
    }
  };

  const onUpdateProduct = () => {
    dispatch(
      updateProduct({
        id: parseInt(product.id),
        title: title,
        thumbnail: thumbnail,
        description: description,
        price: price,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        return;
      }
      navigate('/');
    });
  };

  return (
    <main>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Stack>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              className="card"
            >
              <CardMedia
                component="img"
                sx={{
                  16: 9,
                }}
                image={thumbnail}
                height={200}
                className="card__image"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography>{description}</Typography>
                <Typography fontSize={14}>Price is: {price}$</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Stack>
        <Stack maxWidth="sm">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleUpdateValue(e, 'title');
              }}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Thumbnail"
              variant="outlined"
              value={thumbnail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleUpdateValue(e, 'thumbnail');
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleUpdateValue(e, 'description');
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleUpdateValue(e, 'price');
              }}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Stack>
      </Stack>
      {error ? <>{error}</> : <></>}
      <Container maxWidth="sm">
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/');
            }}
          >
            Leave
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onUpdateProduct();
            }}
          >
            Save
          </Button>
        </Stack>
      </Container>
    </main>
  );
};

export default EditView;
