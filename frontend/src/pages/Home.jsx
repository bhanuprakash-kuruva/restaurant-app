import React,{useState} from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@mui/material';
import Banner from '../assets/banner.jpeg';
import '../styles/home.css';

const Home = () => {
  const [open,setOpen] = useState(false);
  const [flag,setFlag] = useState(false)
  const handleClick=()=>{
    setOpen(!open)
  }
  return (
    <Layout>
      <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
        <div className="head">
          <h1>Food Website</h1>
          <div style={{ maxWidth: '400px', lineHeight: '1.8' }}>
            <p>Savor the Flavors, Anytime, Anywhere!</p>
            <p>
              Discover your next favorite dish from a variety of cuisines, crafted with love and fresh ingredients. 
              Whether dining in or ordering out, we bring the joy of food to your table!
            </p>
            <Link to={flag?'/menu':'/'}>
              <Button variant="contained" color="success" onClick={handleClick}>
                Order Now
              </Button>
            </Link>
          </div>
        </div>
        <Box sx={{mb:0,fontSize:'10px',display:'flex',flexDirection:'column',gap:'1'}}>
          <Accordion sx={{width:'500px', bgcolor:'gray', color:'black'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography >
                What kind of food is available ? 
              </Typography>
              
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                  Restaurant provide a wide range range of food items include veg-items as well as non-veg items 
                </Typography>
              </AccordionDetails>
          </Accordion>
          <Accordion sx={{width:'500px', bgcolor:'gray', color:'black'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography >
                What food is famous here ? 
              </Typography>
              
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                  Our restaurant is famous for non-veg items as well as for fast food items. 
                </Typography>
              </AccordionDetails>
          </Accordion>
        </Box>
        <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'gray', // Set background color
          color: '#fff',           // Set text color
          padding: 2,              // Optional padding
        },
      }}
    >
      <DialogTitle><Typography variant='h5' sx={{fontWeight:'200',color:'black'}}> Require Confirmation</Typography></DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#fff',fontSize:'14px' }}>
          Do you have an account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(false)}
          sx={{ textTransform: 'none' }} // Optional: normalize button text
        >
          <Link
            to="/signin"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Signin
          </Link>
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(false)}
          sx={{ textTransform: 'none', ml: 1 }} // Add margin for spacing
        >
          <Link
            to="/signup"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Signup
          </Link>
        </Button>
      </DialogActions>
    </Dialog>
      </div>
    </Layout>
  );
};

export default Home;
