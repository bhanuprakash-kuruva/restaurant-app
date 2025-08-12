
// import React, { useState, useEffect } from 'react';
// import Layout from '../components/Layout/Layout';
// import { Box, Container, TextField, Button, Typography, Input } from '@mui/material';
// import TapasIcon from '@mui/icons-material/Tapas';
// import { useUser } from '../contextAPI/context';
// import { useNavigate } from 'react-router-dom';
// const AddChefs = () => {
//   const [newChef, setNewChef] = useState({
//     name: '',
//     speciality: '',
//     experience: '',
//     rating: 0,
//     description: '',
//     image: null, // Initially set to null
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewChef({
//       ...newChef,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setNewChef({
//       ...newChef,
//       image: e.target.files[0], // Get the selected image file
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check that all required fields are populated
//     if (!newChef.name || !newChef.speciality || !newChef.experience || !newChef.rating || !newChef.image || !newChef.description) {
//       alert("Please fill all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', newChef.name);
//     formData.append('speciality', newChef.speciality);
//     formData.append('experience', newChef.experience);
//     formData.append('rating', newChef.rating);
//     formData.append('description', newChef.description);
//     formData.append('image', newChef.image);

//     try {
//       const response = await fetch('http://localhost:8071/chef/addchef', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add chef');
//       }

//       const data = await response.json();
//       alert('Chef added successfully!');
//       setNewChef({
//         name: '',
//         speciality: '',
//         experience: '',
//         rating: 0,
//         description: '',
//         image: null,
//       });
//     } catch (error) {
//       console.error(error);
//       alert('Failed to add chef');
//     }
//   };
//   const { role } = useUser()
//   const navigate = useNavigate()
//   useEffect(() => {
//     if (role !== 'ADMIN') {
//       navigate('/needaccess')
//     }
//   }, [])
//   return (
//     <Layout>
//       <Container maxWidth="sm" sx={{ my: 3, borderRadius: '15px', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px', boxShadow: '2' }}>
//         <TapasIcon color="goldenrod" />
//         <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom>
//           Add Chef
//         </Typography>

//         {/* Chef Form */}
//         <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             name="name"
//             value={newChef.name}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             label="Speciality"
//             variant="outlined"
//             fullWidth
//             name="speciality"
//             value={newChef.speciality}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             label="Experience (years)"
//             variant="outlined"
//             fullWidth
//             name="experience"
//             type="number"
//             value={newChef.experience}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             label="Rating"
//             variant="outlined"
//             fullWidth
//             name="rating"
//             type="number"
//             value={newChef.rating}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             name="description"
//             value={newChef.description}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             required
//           />

//           {/* File input for image upload */}
//           <Input
//             type="file"
//             name="image"
            
//             onChange={handleImageChange}
//             sx={{ mb: 2 }}
//             required
//           />

//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             <Button type="submit" variant="contained" color="success" >
//               Add Chef
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     </Layout>
//   );
// };

// export default AddChefs;

//mobile
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Box, Container, TextField, Button, Typography, Input } from '@mui/material';
import TapasIcon from '@mui/icons-material/Tapas';
import { useUser } from '../contextAPI/context';
import { useNavigate } from 'react-router-dom';

const AddChefs = () => {
  const [newChef, setNewChef] = useState({
    name: '',
    speciality: '',
    experience: '',
    rating: '',
    description: '',
    image: null,
  });

  const { role } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/needaccess');
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChef({ ...newChef, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewChef({ ...newChef, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newChef.name || !newChef.speciality || !newChef.experience || !newChef.rating || !newChef.image || !newChef.description) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(newChef).forEach(key => formData.append(key, newChef[key]));

    try {
      const response = await fetch('http://localhost:8071/chef/addchef', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add chef');

      alert('Chef added successfully!');
      setNewChef({
        name: '',
        speciality: '',
        experience: '',
        rating: '',
        description: '',
        image: null,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add chef');
    }
  };

  return (
    <Layout>
      <Container
        maxWidth="sm"
        sx={{
          my: { xs: 2, md: 4 },
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <TapasIcon sx={{ fontSize: 40, color: 'goldenrod', mb: 1 }} />
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Add Chef
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth name="name" value={newChef.name} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField label="Speciality" fullWidth name="speciality" value={newChef.speciality} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField label="Experience (years)" fullWidth type="number" name="experience" value={newChef.experience} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField label="Rating" fullWidth type="number" name="rating" value={newChef.rating} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField label="Description" fullWidth name="description" value={newChef.description} onChange={handleChange} multiline rows={3} sx={{ mb: 2 }} required />

          {/* Styled file input for mobile */}
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Chef Image
            <Input type="file" name="image" onChange={handleImageChange} sx={{ display: 'none' }} required />
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="success" size="large" sx={{ width: { xs: '100%', sm: 'auto' } }}>
              Add Chef
            </Button>
          </Box>
        </form>
      </Container>
    </Layout>
  );
};

export default AddChefs;
