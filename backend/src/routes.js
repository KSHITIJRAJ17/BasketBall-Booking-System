// backend/src/routes.js

const express = require('express');
const router = express.Router();
const User = require('./models/Users');
const Plot = require('./models/Plot')

router.post('/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email }); // Use User instead of UserModel
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const wallet = user.wallet
          res.json({ email, password, wallet })
        }
        else {
          res.json("incorrect password")
        }
      }
      else {
        res.json("no such user")
      }
    })
});

router.post('/booking', async (req, res) => {
  const { email, selectedDate, selectedTime, plot } = req.body;

  try {
    // Fetch user details by email
    let user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if wallet value is greater than 100
    if (user.wallet < 100) {
      return res.status(400).json({ error: 'Insufficient funds in wallet' });
    }

    // Check if entry already exists in plot table for the given date and time
    const existingEntry = await Plot.findOne({ selectedDate, selectedTime, plot });
    if (existingEntry) {
      return res.status(400).json({ error: 'Entry already exists for the given date and time' });
    }
    // Create a new entry in plot table
    await Plot.create({ email, selectedDate, selectedTime, plot });
   
    // Reduce wallet value by 100
    user.wallet -= 100;

    // Update the user's wallet value in the database
    await User.updateOne({ email }, { $set: { wallet: user.wallet } });

    // Return success message
    res.status(200).json({ message: 'Booking successful' });
  } catch (err) {
    console.error('Error booking plot:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/fetchWallet', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the wallet value
    res.status(200).json({ wallet: user.wallet });
  } catch (error) {
    console.error('Error fetching wallet value:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/fetchBookingsByEmail', async (req, res) => {
  try {
    const { email } = req.body;

    // Find all plot entries by email
    const bookings = await Plot.find({ email });

    // Return the bookings
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings by email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
