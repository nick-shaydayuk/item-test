import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarComponent = () => {
  return (
    <header>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Random Marketplace
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default AppBarComponent;
