const router = require('express').Router();

const {
  getRooms,
  postRoom,
  deleteRoom,
  editRoom,
} = require('../controllers/roomsController');

router.get('/rooms', getRooms);
router.post('/room', postRoom);
router.delete('/room/:id', deleteRoom);
router.patch('/room/:id', editRoom);

module.exports = router;
