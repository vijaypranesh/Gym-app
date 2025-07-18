const express = require('express');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/workouts (log workout)
router.post('/', auth, async (req, res) => {
  const { startTime, endTime, activityType } = req.body;
  try {
    const workout = new Workout({
      user: req.user.id,
      startTime,
      endTime,
      activityType
    });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/workouts (get workout history)
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ startTime: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 