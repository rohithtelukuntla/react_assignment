const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
// const path = require ('path');
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// API Endpoint to fetch data from the public API
app.get('https://jsonplaceholder.typicode.com/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // const formattedData = response.data.map(user => ({
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        // }));
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve the React app in production (optional)
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('myproject/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'myproject', 'build', 'index.html'));
//     });
// }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
