const express = require('express'); 
const Column = require('../models/column');
const User = require('../models/user');
const router = express.Router();
const authorize = require('../middlewares/checkAuth');
const setUser = require('../middlewares/setUser');

router.use(authorize);

router.get('/', async (req, res) => {
  try {
    const query = req.query;

    if (Object.keys(query).length === 0) {
      // if no query return all columns
      const columns = await Column.find({user: req.user._id});
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

router.post("/add-column", async (req, res) => {
  try {
    const columnData = req.body;
    console.log(columnData);
    // Find associated user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    columnData.user = user._id;

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
    const column = await Column.findById(id);

    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    if (column.tasks.length > 0) {
      return res.status(400).json({ message: 'Column has associated tasks. Delete the tasks first.' });
    }

    const userId = column.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.columns.pull(column);
    await user.save();

    await Column.findByIdAndDelete(id);

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



