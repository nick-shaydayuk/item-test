import Grid from '@mui/material/Grid';
import { Product } from '../../store/productsSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/edit/:${product.id}`, { state: product });
  };

  return (
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
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small" onClick={() => onEdit()}>
            Edit
          </Button>
          <Typography fontSize={14}>Price is: {product.price}$</Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
