const express = require('express'); 
const Column = require('../models/column');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query;

    if (Object.keys(query).length === 0) {
      // if no query return all columns
      const columns = await Column.find().populate('user');
      res.send(columns);
    } else {
      // if query params filter by query
      const matchedColumns = await Column.find(query).populate('user');

      if (matchedColumns.length === 0) {
        return res.status(404).send('No matching columns found');
      }

      res.send(matchedColumns);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/add-column', async (req, res) => {
  try {
    const columnData = req.body;
    
    // Find associated user
    const userId = columnData.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create column with associated user
    const newColumn = await Column.create(columnData);
    user.columns.push(newColumn);
    await user.save();

    res.status(200).json(newColumn);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete-column/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedColumn = await Column.findByIdAndDelete(id);

    if (!deletedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    // Remove the column association from the user
    const userId = deletedColumn.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.columns.pull(deletedColumn);
    await user.save();

    res.status(200).json({ message: 'Column deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/update-column/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedColumn = req.body;
    const updatedColumnResult = await Column.findByIdAndUpdate(id, updatedColumn, { new: true });

    if (!updatedColumnResult) {
      return res.status(404).json({ message: 'Column not found' });
    }

    res.status(200).json(updatedColumnResult);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;



