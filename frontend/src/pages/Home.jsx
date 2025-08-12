// import React,{useState} from 'react';
// import Layout from '../components/Layout/Layout';
// import { Link } from 'react-router-dom';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@mui/material';
// import Banner from '../assets/banner.jpeg';
// import '../styles/home.css';

// const Home = () => {
//   const [open,setOpen] = useState(false);
//   const [flag,setFlag] = useState(false)
//   const handleClick=()=>{
//     setOpen(!open)
//   }
//   return (
//     <Layout>
//       <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
//         <div className="head">
//           <h1>Food Website</h1>
//           <div style={{ maxWidth: '400px', lineHeight: '1.8' }}>
//             <p>Savor the Flavors, Anytime, Anywhere!</p>
//             <p>
//               Discover your next favorite dish from a variety of cuisines, crafted with love and fresh ingredients. 
//               Whether dining in or ordering out, we bring the joy of food to your table!
//             </p>
//             <Link to={flag?'/menu':'/'}>
//               <Button variant="contained" color="success" onClick={handleClick}>
//                 Order Now
//               </Button>
//             </Link>
//           </div>
//         </div>
//         <Box sx={{mb:0,fontSize:'10px',display:'flex',flexDirection:'column',gap:'1'}}>
//           <Accordion sx={{width:'500px', bgcolor:'gray', color:'black'}}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography >
//                 What kind of food is available ? 
//               </Typography>
              
//             </AccordionSummary>
//             <AccordionDetails>
//                 <Typography>
//                   Restaurant provide a wide range range of food items include veg-items as well as non-veg items 
//                 </Typography>
//               </AccordionDetails>
//           </Accordion>
//           <Accordion sx={{width:'500px', bgcolor:'gray', color:'black'}}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography >
//                 What food is famous here ? 
//               </Typography>
              
//             </AccordionSummary>
//             <AccordionDetails>
//                 <Typography>
//                   Our restaurant is famous for non-veg items as well as for fast food items. 
//                 </Typography>
//               </AccordionDetails>
//           </Accordion>
//         </Box>
//         <Dialog
//       open={open}
//       onClose={() => setOpen(false)}
//       sx={{
//         '& .MuiDialog-paper': {
//           backgroundColor: 'gray', // Set background color
//           color: '#fff',           // Set text color
//           padding: 2,              // Optional padding
//         },
//       }}
//     >
//       <DialogTitle><Typography variant='h5' sx={{fontWeight:'200',color:'black'}}> Require Confirmation</Typography></DialogTitle>
//       <DialogContent>
//         <DialogContentText sx={{ color: '#fff',fontSize:'14px' }}>
//           Do you have an account?
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => setOpen(false)}
//           sx={{ textTransform: 'none' }} // Optional: normalize button text
//         >
//           <Link
//             to="/signin"
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//             }}
//           >
//             Signin
//           </Link>
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => setOpen(false)}
//           sx={{ textTransform: 'none', ml: 1 }} // Add margin for spacing
//         >
//           <Link
//             to="/signup"
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//             }}
//           >
//             Signup
//           </Link>
//         </Button>
//       </DialogActions>
//     </Dialog>
//       </div>
//     </Layout>
//   );
// };

// export default Home;

//mobile
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Banner from '../assets/banner.jpeg';
import '../styles/home.css';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For responsive breakpoints

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Layout>
      <div
        className="home"
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: isMobile ? '20px' : '40px'
        }}
      >
        {/* Header Section */}
        <div
          className="head"
          style={{
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: isMobile ? '100%' : '600px',
            margin: 'auto',
          }}
        >
          <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem' }}>Food Website</h1>
          <div style={{ lineHeight: '1.8', fontSize: isMobile ? '14px' : '16px' }}>
            <p>Savor the Flavors, Anytime, Anywhere!</p>
            <p>
              Discover your next favorite dish from a variety of cuisines, crafted with love and fresh ingredients.
              Whether dining in or ordering out, we bring the joy of food to your table!
            </p>
            <Button
              variant="contained"
              color="success"
              onClick={handleClick}
              sx={{ mt: 2 }}
              component={Link}
              to={flag ? '/menu' : '/'}
            >
              Order Now
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            px: 2
          }}
        >
          {[
            {
              question: 'What kind of food is available?',
              answer:
                'Restaurant provides a wide range of food items including vegetarian and non-vegetarian dishes.'
            },
            {
              question: 'What food is famous here?',
              answer: 'Our restaurant is famous for non-veg items as well as for fast food.'
            }
          ].map((item, index) => (
            <Accordion
              key={index}
              sx={{
                width: '100%',
                maxWidth: '600px',
                bgcolor: 'gray',
                color: 'black'
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: 'gray',
              color: '#fff',
              padding: 2,
              width: isMobile ? '90%' : '400px'
            }
          }}
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: '200', color: 'black' }}>
              Require Confirmation
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: '#fff', fontSize: '14px' }}>
              Do you have an account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpen(false)}
              sx={{ textTransform: 'none' }}
              component={Link}
              to="/signin"
            >
              Signin
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpen(false)}
              sx={{ textTransform: 'none', ml: 1 }}
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Home;
