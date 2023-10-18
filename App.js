import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button, List, ListItem, ListItemText } from '@material-ui/core';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users') 
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  // Calculate the index of the first user on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Get the users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  //pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      {error && <p>Error: {error}</p>}
      {currentUsers.map(user => (
        <Card key={user.id} className="user-card">
          <CardContent>
            <Typography variant="h5" component="h2">
              {user.name}
            </Typography>
            <Typography color="textSecondary">
              <strong>Username:</strong> {user.username}
              <strong>Email:</strong> {user.email}
              <strong>Contact:</strong> {user.phone}
              <strong>City:</strong> {user.address.city}
            <Button className="button" variant="outlined" onClick={() => setSelectedUser(user)}>
              View Details
            </Button>
            </Typography>
            {selectedUser && selectedUser.id === user.id && (
              <div className="user-details-list">
                <Typography variant="h6">User Details:</Typography>
                <List>
                  <ListItem>
                    <ListItemText primary={`Username: ${selectedUser.username}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Email: ${selectedUser.email}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Contact: ${selectedUser.phone}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`City: ${selectedUser.address.city}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`State: ${selectedUser.address.state || 'N/A'}`} />
                  </ListItem>
                </List>
                <Button className = "button" variant="outlined" onClick={handleCloseDetails}>
                  Close Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <Button 
            key={index + 1}
            variant="outlined"
            color={currentPage === index + 1 ? "primary" : "default"}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
}
export default App;