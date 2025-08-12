
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { Container, Grid, Typography, Card, CardContent, CardActions, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import the calendar's styles
import Layout from '../components/Layout/Layout';
import { useUser } from '../contextAPI/context';
import { useNavigate } from 'react-router-dom';
// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const EventAnalysis = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {role} =useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(role !=='ADMIN'){
      navigate('/needaccess')
    }
  },[])
  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://restaurant-app-backend-mu.vercel.app//catering/getEvents');
        if (response.ok) {
          const data = await response.json();
          setEventsData(data.events);
        } else {
          const error = await response.json();
          alert("Error occurred", error.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (eventsData.length === 0) {
    return <Typography>No events data available</Typography>;
  }
  
  // Get current date for comparison
  const currentDate = new Date();

  // Separate events into completed and not completed
  const completedEvents = eventsData.filter(event => new Date(event.eventDate) < currentDate);
  const notCompletedEvents = eventsData.filter(event => new Date(event.eventDate) >= currentDate);

  // Aggregate data for charts
  const eventTypeCount = eventsData.reduce((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {});

  // Generate colors dynamically for each event type
  const getColor = (index) => {
    const colors = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#E91E63'];
    return colors[index % colors.length];
  };

  // Bar chart data (Event Types by Count)
  const barChartData = {
    labels: Object.keys(eventTypeCount),
    datasets: [
      {
        label: 'Number of Events',
        data: Object.values(eventTypeCount),
        backgroundColor: Object.keys(eventTypeCount).map((_, index) => getColor(index)),
        borderColor: Object.keys(eventTypeCount).map((_, index) => getColor(index)),
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data (Event Type Distribution)
  const pieChartData = {
    labels: Object.keys(eventTypeCount),
    datasets: [
      {
        data: Object.values(eventTypeCount),
        backgroundColor: Object.keys(eventTypeCount).map((_, index) => getColor(index)),
      },
    ],
  };

  // Extract booked dates from event data
  const bookedDates = eventsData.map(event => {
    const eventDate = new Date(event.eventDate);
    if (eventDate.getTime()) {
      return eventDate.toISOString().split('T')[0]; // Return ISO string formatted date
    }
    return null;
  }).filter(date => date !== null);

  // Handler for calendar date selection
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // Helper function to render event details
  const renderEventDetails = (event) => {
    return (
      <Card key={event._id} sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">{event.eventName}</Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(event.eventDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Event Type: {event.eventType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of Guests: {event.numberOfGuests}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of Days: {event.noOfDays}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {new Date(event.eventDate) < currentDate ? 'Completed' : 'Not yet completed'}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small" color="primary">View Details</Button>
        </CardActions> */}
      </Card>
    );
  };

  // Function to generate a legend with color codes
  const renderColorLegend = () => {
    return (
      <List>
        {Object.keys(eventTypeCount).map((eventType, index) => (
          <ListItem key={eventType} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: getColor(index),
                marginRight: 2,
              }}
            />
            <ListItemText primary={`${eventType}`} secondary={`Color: ${getColor(index)}`} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Layout>
        <Container>
      <Typography variant="h4" sx={{textAlign:'center',fontWeight:'bold',my:2}} gutterBottom>
        Catering Event Analysis
      </Typography>
      <Grid container spacing={3}>
        {/* Bar chart: Number of Events by Type */}
        <Grid item xs={12} sm={6} sx={{ height: '300px' }}>
          <Typography variant="h6" sx={{fontWeight:'bold'}}>Number of Events by Type</Typography>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </Grid>

        {/* Pie chart: Event Type Distribution */}
        <Grid item xs={12} sm={6} sx={{ height: '300px' }}>
          <Typography variant="h6" sx={{fontWeight:'bold'}}>Event Type Distribution</Typography>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </Grid>

        {/* Calendar to highlight booked dates */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{fontWeight:'bold'}}>Calendar</Typography>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (view === 'month' && bookedDates.includes(date.toISOString().split('T')[0])) {
                return 'highlighted';
              }
              return '';
            }}
          />
        </Grid>

        {/* Color Code Legend */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>Event Type Color Codes</Typography>
          {renderColorLegend()}
        </Grid>

        {/* Not Yet Completed Events Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" sx={{fontWeight:'bold'}} gutterBottom>Not Yet Completed Events</Typography>
          {notCompletedEvents.length > 0 ? (
            notCompletedEvents.map(event => renderEventDetails(event))
          ) : (
            <Typography>No upcoming events</Typography>
          )}
        </Grid>

        {/* Completed Events Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" sx={{fontWeight:'bold'}} gutterBottom>Completed Events</Typography>
          {completedEvents.length > 0 ? (
            completedEvents.map(event => renderEventDetails(event))
          ) : (
            <Typography>No completed events found</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
    </Layout>
  );
};

export default EventAnalysis;
