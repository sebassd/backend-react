const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3009;

app.use(express.json());
app.use(cors());

// Define your routes here

const RoomsRouter = require('./routers/RoomsRouter');
const BookingRouter = require('./routers/BookingRouter');

app.use('/api', RoomsRouter);
app.use('/api', BookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
