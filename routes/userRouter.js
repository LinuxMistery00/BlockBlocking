const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name'); // Retorna apenas os nomes dos usuários
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("User model Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
