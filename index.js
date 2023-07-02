const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 3009;

app.use(express.json());
app.use(cors());
app.use(helmet());
// Define your routes here

const RoomsRouter = require('./routers/RoomsRouter');
const BookingRouter = require('./routers/BookingRouter');

app.use('/api', RoomsRouter);
app.use('/api', BookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
