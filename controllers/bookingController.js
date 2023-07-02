const jsonfile = require('jsonfile');

const getBookings = (req, res) => {
  jsonfile.readFile('./db/database.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(data.bookings);
      res.json(data.bookings);
    }
  });
};

const postBooking = (req, res) => {
  const newRoom = req.body;

  // Read existing data from ./db/database.json
  jsonfile.readFile('./db/database.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(data.bookings);
      const database = data.bookings;

      // Generate a new unique ID for the booking
      const newId =
        database.length > 0 ? database[database.length - 1].id + 1 : 1;

      // Add the new booking object with the generated ID
      newRoom.id = newId;

      // Push the new booking to the existing database array
      database.push(newRoom);

      // Write updated data to ./db/database.json
      jsonfile.writeFile('./db/database.json', data, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
};

module.exports = { getBookings, postBooking };
