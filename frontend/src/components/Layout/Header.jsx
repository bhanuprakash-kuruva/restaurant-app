
// import React, { useState } from 'react';
// import '../../styles/nav-menu.css';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import MenuIcon from '@mui/icons-material/Menu';
// import { NavLink } from 'react-router-dom';
// import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, Divider, Button } from '@mui/material';
// import { useUser } from '../../contextAPI/context';
// import { useNavigate } from 'react-router-dom';
// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { email,role,logo,logout } = useUser();  // Get the role from the context
//   const handleToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const navigate = useNavigate()
//   const handleLogout = () => {
//     logout(null);
//     logo('CUSTOMER')
//     navigate('/')
//   }
//   // Drawer content
//   const drawer = () => (
//     <Box onClick={handleToggle} sx={{ textAlign: 'center' }}>
//       <Typography color={'goldenrod'} variant='h6' component={'div'} sx={{ flexGrow: 1, my: 2 }}>
//         <FastfoodIcon />
//         <Typography variant='h5'>
//           Table
//           <Button variant='contained' color='success'>Tales</Button>
//         </Typography>
//       </Typography>
//       <Divider />
//       <ul className='mobile-menu'>
//         <li>
//           <NavLink to={'/'}>Home</NavLink>
//         </li>
//         <li>
//           <NavLink to={'/menu'}>Menu</NavLink>
//         </li>
//         {role === 'ADMIN' ? (
//           <li>
//             <NavLink to={'/admin'}>Admin</NavLink>
//           </li>
//         ) : role === 'DELIVERY BOY' ? (
//           <li>
//             <NavLink to={'/deliveryboy'}>Deliveries</NavLink>
//           </li>
//         ) : (
//           <li>
//             <NavLink to={'/profile'}>Profile</NavLink>
//           </li>
//         )}
//         <li>
//           <NavLink to={'/catering'}>Services</NavLink>
//         </li>
//         <li>
//           <NavLink to={'/about'}>About</NavLink>
//         </li>
//         <li>
//           <NavLink to={'/contact'}>Contact</NavLink>
//         </li>
//         {
//           email === null ?(<li>
//             <NavLink to={'/signin'}><Button variant='contained' color='success'>Login</Button></NavLink>
//           </li>):(<li>
//           <Button variant='contained' color='success' onClick={handleLogout}>Log out</Button>
//         </li>)
//         }
//       </ul>
//     </Box>
//   );

//   return (
//     <Box>
//       <AppBar component={'nav'} sx={{ bgcolor: 'black' }}>
//         <Toolbar>
//           <IconButton
//             onClick={handleToggle}
//             color='inherit'
//             aria-label='open drawer'
//             edge='start'
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography color={'goldenrod'} variant='h6' component={'div'} sx={{ flexGrow: 1 }}>
//             <Box>
//               <FastfoodIcon />
//               Table
//               <Button variant='contained' color='success'>
//                 <Typography sx={{ color: 'goldenrod', fontSize: '18px' }}>Tales</Typography>
//               </Button>
//             </Box>
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             <ul className='nav-menu'>
//               <li>
//                 <NavLink
//                   to='/'
//                   className={({ isActive }) => (isActive ? 'active' : '')}
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to='/menu'
//                   className={({ isActive }) => (isActive ? 'active' : '')}
//                 >
//                   Menu
//                 </NavLink>
//               </li>
//               {role === 'ADMIN' ? (
//                 <li>
//                   <NavLink
//                     to='/admin'
//                     className={({ isActive }) => (isActive ? 'active' : '')}
//                   >
//                     Admin
//                   </NavLink>
//                 </li>
//               ) : role === 'DELIVERY BOY' ? (
//                 <li>
//                   <NavLink
//                     to='/deliveryboy'
//                     className={({ isActive }) => (isActive ? 'active' : '')}
//                   >
//                     Deliveries
//                   </NavLink>
//                 </li>
//               ) : (
//                 <li>
//                   <NavLink
//                     to='/profile'
//                     className={({ isActive }) => (isActive ? 'active' : '')}
//                   >
//                     Profile
//                   </NavLink>
//                 </li>
//               )}
//               <li>
//                 <NavLink
//                   to='/catering'
//                   className={({ isActive }) => (isActive ? 'active' : '')}
//                 >
//                   Services
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to='/about'
//                   className={({ isActive }) => (isActive ? 'active' : '')}
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to='/contact'
//                   className={({ isActive }) => (isActive ? 'active' : '')}
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               {
//           email === null ?(<li>
//             <NavLink to={'/signin'}><Button variant='contained' color='success'>Login</Button></NavLink>
//           </li>):(<li>
//           <Button variant='contained' color='success' onClick={handleLogout}>Log out</Button>
//         </li>)
//         }
//             </ul>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box component={'nav'}>
//         <Drawer
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             "& .MuiDrawer-paper": {
//               boxSizing: 'border-box',
//               width: '240px'
//             }
//           }}
//           variant='temporary'
//           open={mobileOpen}
//           onClose={handleToggle}
//         >
//           {drawer()}
//         </Drawer>
//       </Box>
//       <Box>
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// };

// export default Header;

//mobile
import React, { useState } from 'react';
import '../../styles/nav-menu.css';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useUser } from '../../contextAPI/context';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { email, role, logo, logout } = useUser();
  const navigate = useNavigate();

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout(null);
    logo('CUSTOMER');
    navigate('/');
  };

  // const navLinks = [
  //   { label: 'Home', path: '/' },
  //   { label: 'Menu', path: '/menu' },
  //   role === 'ADMIN'
  //     ? { label: 'Admin', path: '/admin' }
  //     : role === 'DELIVERY BOY'
  //     ? { label: 'Deliveries', path: '/deliveryboy' }
  //     : { label: 'Profile', path: '/profile' },
  //   { label: 'Services', path: '/catering' },
  //   { label: 'About', path: '/about' },
  //   { label: 'Contact', path: '/contact' }
  // ];
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    ...(role === 'ADMIN'
      ? [
          { label: 'Admin', path: '/admin' },
          { label: 'Deliveries', path: '/deliveryboy' }
        ]
      : role === 'DELIVERYBOY'
      ? [{ label: 'Deliveries', path: '/deliveryboy' }]
      : [{ label: 'Profile', path: '/profile' }]
    ),
    { label: 'Services', path: '/catering' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];
  
  // Drawer content
  const drawer = (
    <Box onClick={handleToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FastfoodIcon sx={{ mr: 1, color: 'goldenrod' }} />
        <Typography variant="h6" color="goldenrod">
          Table
        </Typography>
        <Button size="small" variant="contained" color="success" sx={{ ml: 1 }}>
          Tales
        </Button>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton component={NavLink} to={link.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {email === null ? (
            <ListItemButton component={NavLink} to="/signin" sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="success" fullWidth>Login</Button>
            </ListItemButton>
          ) : (
            <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="success" fullWidth>Log out</Button>
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Mobile Menu Button */}
          <IconButton
            onClick={handleToggle}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <FastfoodIcon sx={{ mr: 1, color: 'goldenrod' }} />
            <Typography variant="h6" color="goldenrod" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
              Table
            </Typography>
            <Button size="small" variant="contained" color="success" sx={{ ml: 1 }}>
              <Typography sx={{ color: 'goldenrod', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                Tales
              </Typography>
            </Button>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ul className="nav-menu">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                {email === null ? (
                  <NavLink to="/signin">
                    <Button variant="contained" color="success">Login</Button>
                  </NavLink>
                ) : (
                  <Button variant="contained" color="success" onClick={handleLogout}>
                    Log out
                  </Button>
                )}
              </li>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
        variant="temporary"
        open={mobileOpen}
        onClose={handleToggle}
      >
        {drawer}
      </Drawer>

      {/* Offset for AppBar */}
      <Toolbar />
    </Box>
  );
};

export default Header;
