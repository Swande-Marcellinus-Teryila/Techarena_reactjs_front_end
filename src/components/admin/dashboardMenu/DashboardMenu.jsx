import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ panelcomponent }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };







  const sideMenu = <><Paper sx={{ width: 320, maxWidth: '100%' }}>
    <MenuList>
    <Link
        to={'/'}
        className="text-decoration-none text text-dark"
        >
        <MenuItem>
          <ListItemIcon>
            <HomeIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>&nbsp;&nbsp;
            Home
          </ListItemText>
        </MenuItem>
      </Link>
      <Divider />
     
      <Divider />
      <Link
        to={'/tai/main/roles'}
        className="text-decoration-none text text-dark"
        >
        <MenuItem>
          <ListItemIcon>
            <PeopleAltIcon fontSize='small'/>
          </ListItemIcon>
          <ListItemText>&nbsp;&nbsp;
            Roles
          </ListItemText>
        </MenuItem>
      </Link>

      <Link
        to={'/tai/main/courses'}
        className="text-decoration-none text text-dark"
        >
        <MenuItem>
        
          <ListItemIcon>
            <LibraryBooksOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>&nbsp;&nbsp;
            Courses 
          </ListItemText>
        </MenuItem>
      </Link>

      <Link
        to={'/tai/main/course-categories'}
        className="text-decoration-none text text-dark"
        >
        <MenuItem>
          <ListItemIcon>
            <AutoStoriesIcon fontSize='small'/>
          </ListItemIcon>
          <ListItemText>&nbsp;&nbsp;
            Course  Category
          </ListItemText>
        </MenuItem>
      </Link>
      <Divider />

      <Link
        to={'/tai/main/departments'}
        className="text-decoration-none text text-dark"
        >
        <MenuItem>
          <ListItemIcon>
            <AutoStoriesIcon fontSize='small'/>
          </ListItemIcon>
          <ListItemText>&nbsp;&nbsp;
            Departments
          </ListItemText>
        </MenuItem>
      </Link>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <Cloud fontSize="small" />
        </ListItemIcon>
        <ListItemText>Web Clipboard</ListItemText>
      </MenuItem>
    </MenuList>
  </Paper>
  </>



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='app-bar shadow-lg' position="fixed" style={{ backgroundColor: "white", color: '#012970' }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className='admin-label' variant="h6" noWrap component="div">
            Admin
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer className='admin-drawer' variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider className='bg bg-light' />
        <List>
          {sideMenu}
        </List>

        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph style={{ backgroundColor: 'whitesmoke', }}>
          {panelcomponent}
        </Typography>

        <footer style={{ textAlign: 'center', marginTop: '70px', color: '#e67300' }}>All rights reserved</footer>


      </Box>
    </Box>
  );
}
