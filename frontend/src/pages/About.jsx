import React from 'react';
import Layout from '../components/Layout/Layout';
import { Box, Typography,CardMedia } from '@mui/material';
import aboutImg  from '../assets/about.avif'
const About = () => {
  return (
    <Layout>
       <Box sx={{ width: '100%', height: 400, mb: 5 }}>
           <CardMedia
             component="img"
             alt="Restaurant Ambiance"
             image={aboutImg}
             sx={{
               height: '100%',
               objectFit: 'cover',
               borderRadius: 2,
             }}
           />
         </Box>
      <Box
        sx={{
          my: 10,
          p: 2,
          textAlign: 'center',
          "& h4": {
            fontWeight: 'bold',
            my: 2,
          },
          "& p": {
            textAlign: 'justify',
            lineHeight: 1.8,
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4": {
              fontSize: '1.5rem',
            },
            "& p": {
              fontSize: '0.9rem',
            },
          },
        }}
      >
        <Typography variant="h4">Welcome to Our Restaurant</Typography>
        <Typography variant="body1" component="p">
          Welcome to a world of culinary delights where every meal is crafted with passion and precision. At our restaurant, we believe that dining is not just about satisfying hunger but about creating memories that linger long after the meal is over. From the carefully chosen ingredients to the warm and inviting ambiance, every detail has been meticulously planned to ensure your visit is nothing short of extraordinary. Whether you’re celebrating a special occasion, catching up with loved ones, or simply indulging in a moment for yourself, we are here to make every experience unforgettable.
        </Typography>
        <br />

        <Typography variant="h5">Exciting Offers</Typography>
        <Typography variant="body1" component="p">
          To make your dining experience even more delightful, we have curated a range of exclusive offers. Enjoy discounts during festive seasons, exciting deals for group bookings, and special privileges for our loyal customers through our membership program. Our offers aren’t just about saving money—they’re about adding value to your dining experience. Relish unique themed menus during holidays or partake in our "Chef’s Specials" that bring innovative dishes straight from our kitchen to your table. With our rotating offers, there’s always a reason to celebrate at our restaurant.
        </Typography>
        <br />

        <Typography variant="h5">Wide Variety of Food</Typography>
        <Typography variant="body1" component="p">
          Our menu is a treasure trove of flavors that cater to diverse palates. Whether you crave the rich spices of Indian curries, the umami flavors of Asian stir-fries, or the comfort of classic continental dishes, we have something for everyone. Start your meal with our selection of appetizers that tease your taste buds, and end it with decadent desserts that leave you wanting more. For those with dietary preferences or restrictions, we offer a variety of vegetarian, vegan, and gluten-free options, ensuring everyone at your table feels included. With every dish crafted to perfection, your taste journey starts here.
        </Typography>
        <br />

        <Typography variant="h5">Our Expert Chefs</Typography>
        <Typography variant="body1" component="p">
          Behind every dish is a team of culinary artists who bring their passion and expertise to the table. Our chefs are not only skilled in traditional cooking methods but are also innovators who constantly push the boundaries of flavor and presentation. Their creativity shines through in every bite, turning simple ingredients into extraordinary dishes. Join us for one of our live kitchen events, where you can watch our chefs in action and learn the secrets behind their creations. Their dedication to quality and love for food is what makes our restaurant a culinary destination.
        </Typography>
        <br />

        <Typography variant="h5">24/7 Availability</Typography>
        <Typography variant="body1" component="p">
          We understand that cravings can strike at any hour, which is why we’re here for you 24/7. Whether it’s an early morning breakfast to kickstart your day or a late-night snack to satisfy those midnight hunger pangs, we’ve got you covered. Our round-the-clock service ensures that delicious meals are always just a call or click away. With our seamless online ordering platform, you can enjoy your favorite dishes from the comfort of your home or on the go. No matter the time, we’re here to make sure you never go hungry.
        </Typography>
        <br />

        <Typography variant="h5">Catering Services</Typography>
        <Typography variant="body1" component="p">
          Planning a special event? Let us take care of the food while you focus on creating memories with your guests. Our catering services are designed to add a touch of elegance to any occasion, from intimate gatherings to grand celebrations. We work closely with you to design a customized menu that reflects your preferences and theme, ensuring every dish is a hit. From setup to cleanup, our dedicated team handles every detail so you can relax and enjoy the event. Let us help you make your celebration truly unforgettable with our impeccable catering services.
        </Typography>
        <br />

        <Typography variant="h5">A Culinary Adventure Awaits</Typography>
        <Typography variant="body1" component="p">
          Beyond the food, we offer an array of experiences to make your visit extraordinary. Join us for our themed dinner nights, where we transport you to different cultures and cuisines. Enjoy live music performances that add a touch of magic to your evening or participate in our cooking workshops to learn from the best. Our spacious and tastefully designed interiors provide the perfect backdrop for your special moments, whether it’s a romantic dinner or a family celebration. At our restaurant, every meal is a journey, and we’re here to make it remarkable.
        </Typography>
        <br />

        <Typography variant="h5">Sustainability and Quality</Typography>
        <Typography variant="body1" component="p">
          At the heart of our philosophy is a commitment to sustainability and quality. We source our ingredients responsibly, ensuring they are fresh, seasonal, and ethically produced. From farm-fresh vegetables to sustainably caught seafood, we prioritize the health of our planet and our patrons. Our eco-friendly practices extend to minimizing waste and supporting local farmers and suppliers. When you dine with us, you’re not just enjoying a meal—you’re supporting a vision for a better and greener future.
        </Typography>
        <br />

        <Typography variant="body1" component="p">
          Thank you for choosing our restaurant as your dining destination. We are honored to be a part of your special moments and everyday meals. Come, explore our menu, immerse yourself in our unique offerings, and let us make every visit an unforgettable experience. Bon appétit!
        </Typography>
      </Box>
    </Layout>
  );
};

export default About;
// import React from 'react';
// import Layout from '../components/Layout/Layout';
// import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';

// const About = () => {
//   return (
//     <Layout>
//       <Box
//         sx={{
//           my: 10,
//           p: 2,
//           textAlign: 'center',
//           "& h4": {
//             fontWeight: 'bold',
//             my: 2,
//           },
//           "& p": {
//             textAlign: 'justify',
//             lineHeight: 1.8,
//           },
//           "@media (max-width:600px)": {
//             mt: 0,
//             "& h4": {
//               fontSize: '1.5rem',
//             },
//             "& p": {
//               fontSize: '0.9rem',
//             },
//           },
//         }}
//       >
//         {/* Hero Image */}
//         <Box sx={{ width: '100%', height: 400, mb: 5 }}>
//           <CardMedia
//             component="img"
//             alt="Restaurant Ambiance"
//             image="your-hero-image-url.jpg"
//             sx={{
//               height: '100%',
//               objectFit: 'cover',
//               borderRadius: 2,
//             }}
//           />
//         </Box>

//         {/* Welcome Section */}
//         <Typography variant="h4">Welcome to Our Restaurant</Typography>
//         <Typography variant="body1" component="p">
//           Welcome to a world of culinary delights where every meal is crafted with passion and precision...
//         </Typography>
//         <br />

//         {/* Exciting Offers Section */}
//         <Typography variant="h5">Exciting Offers</Typography>
//         <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={{ boxShadow: 3 }}>
//               <CardMedia
//                 component="img"
//                 alt="Special Offer"
//                 image="offer-image-url.jpg"
//                 sx={{
//                   height: 200,
//                   objectFit: 'cover',
//                 }}
//               />
//               <Typography variant="body2" sx={{ p: 2 }}>
//                 Special offers and exclusive deals to make your dining experience even more delightful.
//               </Typography>
//             </Card>
//           </Grid>
//         </Grid>
//         <br />

//         {/* Wide Variety of Food Section */}
//         <Typography variant="h5">Wide Variety of Food</Typography>
//         <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt="Food Variety"
//                 image="food-variety-image-url.jpg"
//                 sx={{
//                   height: 200,
//                   objectFit: 'cover',
//                 }}
//               />
//               <Typography variant="body2" sx={{ p: 2 }}>
//                 Our menu features a wide range of dishes that cater to different tastes and preferences.
//               </Typography>
//             </Card>
//           </Grid>
//         </Grid>
//         <br />

//         {/* Our Expert Chefs Section */}
//         <Typography variant="h5">Our Expert Chefs</Typography>
//         <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt="Our Chefs"
//                 image="chefs-image-url.jpg"
//                 sx={{
//                   height: 200,
//                   objectFit: 'cover',
//                 }}
//               />
//               <Typography variant="body2" sx={{ p: 2 }}>
//                 Meet our talented chefs who are dedicated to bringing you the finest culinary experience.
//               </Typography>
//             </Card>
//           </Grid>
//         </Grid>
//         <br />

//         {/* Catering Services Section */}
//         <Typography variant="h5">Catering Services</Typography>
//         <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt="Catering Services"
//                 image="catering-image-url.jpg"
//                 sx={{
//                   height: 200,
//                   objectFit: 'cover',
//                 }}
//               />
//               <Typography variant="body2" sx={{ p: 2 }}>
//                 Our catering services add a touch of elegance to your special events, with custom menus for any occasion.
//               </Typography>
//             </Card>
//           </Grid>
//         </Grid>
//         <br />

//         {/* Sustainability Section */}
//         <Typography variant="h5">Sustainability and Quality</Typography>
//         <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt="Sustainability"
//                 image="sustainability-image-url.jpg"
//                 sx={{
//                   height: 200,
//                   objectFit: 'cover',
//                 }}
//               />
//               <Typography variant="body2" sx={{ p: 2 }}>
//                 We prioritize sustainability and eco-friendly practices, ensuring our ingredients are fresh and responsibly sourced.
//               </Typography>
//             </Card>
//           </Grid>
//         </Grid>
//         <br />

//         {/* Closing Section */}
//         <Typography variant="body1" component="p">
//           Thank you for choosing our restaurant as your dining destination. We are honored to be a part of your special moments and everyday meals...
//         </Typography>
//       </Box>
//     </Layout>
//   );
// };

// export default About;
