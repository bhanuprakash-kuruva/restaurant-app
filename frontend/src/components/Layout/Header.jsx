
import React, { useState } from 'react';
import '../../styles/nav-menu.css';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, Divider, Button } from '@mui/material';
import { useUser } from '../../contextAPI/context';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { email,role,logo,logout } = useUser();  // Get the role from the context
  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate()
  const handleLogout = () => {
    logout(null);
    logo('CUSTOMER')
    navigate('/')
  }
  // Drawer content
  const drawer = () => (
    <Box onClick={handleToggle} sx={{ textAlign: 'center' }}>
      <Typography color={'goldenrod'} variant='h6' component={'div'} sx={{ flexGrow: 1, my: 2 }}>
        <FastfoodIcon />
        <Typography variant='h5'>
          Table
          <Button variant='contained' color='success'>Tales</Button>
        </Typography>
      </Typography>
      <Divider />
      <ul className='mobile-menu'>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/menu'}>Menu</NavLink>
        </li>
        {role === 'ADMIN' ? (
          <li>
            <NavLink to={'/admin'}>Admin</NavLink>
          </li>
        ) : role === 'DELIVERY BOY' ? (
          <li>
            <NavLink to={'/deliveryboy'}>Deliveries</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to={'/profile'}>Profile</NavLink>
          </li>
        )}
        <li>
          <NavLink to={'/catering'}>Services</NavLink>
        </li>
        <li>
          <NavLink to={'/about'}>About</NavLink>
        </li>
        <li>
          <NavLink to={'/contact'}>Contact</NavLink>
        </li>
        {
          email === null ?(<li>
            <NavLink to={'/signin'}><Button variant='contained' color='success'>Login</Button></NavLink>
          </li>):(<li>
          <Button variant='contained' color='success' onClick={handleLogout}>Log out</Button>
        </li>)
        }
      </ul>
    </Box>
  );

  return (
    <Box>
      <AppBar component={'nav'} sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <IconButton
            onClick={handleToggle}
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color={'goldenrod'} variant='h6' component={'div'} sx={{ flexGrow: 1 }}>
            <Box>
              <FastfoodIcon />
              Table
              <Button variant='contained' color='success'>
                <Typography sx={{ color: 'goldenrod', fontSize: '18px' }}>Tales</Typography>
              </Button>
            </Box>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ul className='nav-menu'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/menu'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Menu
                </NavLink>
              </li>
              {role === 'ADMIN' ? (
                <li>
                  <NavLink
                    to='/admin'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Admin
                  </NavLink>
                </li>
              ) : role === 'DELIVERY BOY' ? (
                <li>
                  <NavLink
                    to='/deliveryboy'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Deliveries
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to='/profile'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to='/catering'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/contact'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Contact
                </NavLink>
              </li>
              {
          email === null ?(<li>
            <NavLink to={'/signin'}><Button variant='contained' color='success'>Login</Button></NavLink>
          </li>):(<li>
          <Button variant='contained' color='success' onClick={handleLogout}>Log out</Button>
        </li>)
        }
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component={'nav'}>
        <Drawer
          sx={{
            display: { xs: 'block', sm: 'none' },
            "& .MuiDrawer-paper": {
              boxSizing: 'border-box',
              width: '240px'
            }
          }}
          variant='temporary'
          open={mobileOpen}
          onClose={handleToggle}
        >
          {drawer()}
        </Drawer>
      </Box>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Header;
