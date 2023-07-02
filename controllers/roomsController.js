const jsonfile = require('jsonfile');

const getRooms = (req, res) => {
  jsonfile.readFile('./db/database.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(data.rooms);
    }
  });
};

const postRoom = (req, res) => {
  const newRoom = req.body;

  console.log(newRoom);

  // Separate the services string into an array of words
  if (typeof newRoom.services === 'string') {
    newRoom.services = newRoom.services
      .split(',')
      .map((service) => service.trim());
  }

  // Read existing data from data1.json
  jsonfile.readFile('./db/database.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const rooms = data.rooms;

      // Push the new room to the existing rooms array
      rooms.push(newRoom);

      // Write updated data to data1.json
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

const deleteRoom = (req, res) => {
  const roomId = req.params.id;

  // Read existing data from ./db/rooms.json
  jsonfile.readFile('./db/database.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const rooms = data.rooms;

      // Find the index of the room with the given ID
      const roomIndex = rooms.findIndex((room) => room.id === roomId);

      if (roomIndex === -1) {
        res.status(404).send('Room not found');
      } else {
        // Remove the room from the array
        rooms.splice(roomIndex, 1);

        // Write updated data to ./db/rooms.json
        jsonfile.writeFile('./db/database.json', data, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.sendStatus(200);
          }
        });
      }
    }
  });
};

const editRoom = (req, res) => {
  const roomId = req.params.id;
  const updatedFields = req.body;

  // Read existing data from ./db/rooms.json
  jsonfile.readFile('./db/database.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const rooms = data.rooms;

      // Find the room with the given ID
      const room = rooms.find((room) => room.id === roomId);
      console.log(room);
      if (!room) {
        res.status(404).send('Room not found');
      } else {
        // Update the room object with the provided fields
        Object.assign(room, updatedFields);

        // Write updated data to ./db/rooms.json
        jsonfile.writeFile('./db/database.json', data, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.sendStatus(200);
          }
        });
      }
    }
  });
};

module.exports = { getRooms, postRoom, deleteRoom, editRoom };
