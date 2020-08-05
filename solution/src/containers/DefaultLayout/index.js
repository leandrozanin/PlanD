import React, {useState} from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Container from '@material-ui/core/Container'
import useStyles from './styles'
import logo from '../../assets/logowhite.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DashboardIcon from '@material-ui/icons/Dashboard'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'
import PlaceIcon from '@material-ui/icons/Place'
  
const DefaultLayout = ({ children, nav=[] }) => {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);
    const toggleDrawer = () => setOpenMenu(!openMenu);
        
    return(
      <div className={classes.container}>
           <CssBaseline />
            <header>
                <IconButton onClick={() => toggleDrawer()} aria-label="menu">
                    <MenuIcon className={classes.menuIcon} />
                </IconButton>
                <img className="logo" src={logo} alt="logo" />
                <div className="controllers">
                    {nav}
                </div>
            </header>
            <React.Fragment key="left">
                <Drawer anchor="left" open={openMenu} onClose={() => toggleDrawer()}>
                    <div
                        className={clsx(classes.list)}
                        role="presentation"
                        onClick={() => toggleDrawer()}
                        onKeyDown={() => toggleDrawer()}
                    >
                        <List>
                            <Link color="inherit" href="/">
                                <ListItem button>
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            <Link color="inherit" href="/places">
                                <ListItem button>
                                    <ListItemIcon><PlaceIcon /></ListItemIcon>
                                    <ListItemText primary="Places" />
                                </ListItem>
                            </Link>
                            <Link color="inherit" href="/signin">
                                <ListItem button>
                                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                    <ListItemText primary="Sair" />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
            <Container component="main" maxWidth="md" >
            {children}
            </Container>
      </div>
    )
}


export default DefaultLayout;