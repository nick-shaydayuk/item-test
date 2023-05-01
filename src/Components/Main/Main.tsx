import React, { ChangeEvent, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Main.scss';
import Products from '../Products/Products';
import TextField from '@mui/material/TextField';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/nick-shaydayuk/item-test">
        GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({});

const Album: React.FC = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [priceSearch, setPriceSearch] = useState<string>('');

  const handleSetSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setSearchString(e.target.value);
  };

  const handleSetPriceSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setPriceSearch(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="main">
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Random Marketplace
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Random Marketplace is an exciting online shopping destination that offers a vast and
              diverse selection of products from around the world. From fashion and beauty to home
              decor and electronics, this marketplace has something for everyone
            </Typography>
          </Container>
          <Container maxWidth="md">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchString}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleSetSearchString(e);
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={priceSearch}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleSetPriceSearch(e);
              }}
              fullWidth
            />
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Products searchString={searchString} priceSearch={priceSearch} />
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};

export default Album;
