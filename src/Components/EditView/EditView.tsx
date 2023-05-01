import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, updateProduct } from '../../store/productsSlice';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useAppDispatch } from '../../hooks';

const EditView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product: Product = location.state;
  const dispatch = useAppDispatch();

  const onUpdateProduct = () => {
    dispatch(
      updateProduct({
        id: '1',
        title: 'string',
        thumbnail: 'string',
        description: 'string',
        price: 1,
      })
    );
    navigate('/')
  };

  return (
    <main>
      <Container maxWidth="sm">
        {JSON.stringify(product)}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="card">
            <CardMedia
              component="img"
              sx={{
                16: 9,
              }}
              image={product.thumbnail}
              height={200}
              className="card__image"
              alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{product.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Container>
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
