import React from 'react';
import Layout from '../components/Layout/Layout';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Contact = () => {
  return (
    <Layout>
      {/* Header Section */}
      <Box
        sx={{
          my: 5,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1">
          We are here to assist you with any questions or concerns.We believe in fostering meaningful relationships with our customers. Feel free to connect with us anytime—our team is always ready to assist you with queries, support, or any information you need. Your satisfaction is our priority. Feel free to reach out to us through the contact
          details provided below.
        </Typography>
      </Box>

      {/* Contact Details Section */}
      <Box
        sx={{
          m: 2,
          display: 'flex',
          justifyContent: 'center',
          width: '600px',
          margin: '0 auto',
          '@media (max-width:600px)': {
            width: '300px',
          },
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Contact Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <SupportAgentIcon sx={{ color: 'green', pt: 1, mr: 1 }} />
                  +91 23458578 (Toll-Free)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MailIcon sx={{ color: 'green', pt: 1, mr: 1 }} />
                  bhanuprakashuruva09@gmail.com
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CallIcon sx={{ color: 'green', pt: 1, mr: 1 }} />
                  7207485739
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default Contact;
