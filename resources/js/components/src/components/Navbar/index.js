import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttonMenu: {
    color: '#fff',
    "&:hover": {
      color: '#fff'
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <div className="container">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              AppPhone
            </Typography>
            <Link to="/">
              <Button color="inherit" className={classes.buttonMenu}>Miembros</Button>
            </Link>

            <Link to="/group">
              <Button color="inherit" className={classes.buttonMenu}>Grupos</Button>
            </Link>
              <Button
                color="primary"
                endIcon={<Icon>exit_to_app</Icon>}
                className={classes.buttonMenu}
                href="/logout">
                Salir
              </Button>
          </Toolbar>
          </div>
      </AppBar>
    </div>
  )
}

export default Navbar;