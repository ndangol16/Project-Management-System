const express = require('express'); 
const router = express.Router();
const Column = require('../models/column');

router.get('/', async (req, res) => {
  try {
    const query = req.query; 

    if (Object.keys(query).length === 0) {
      // if no query params, return all columns
      const columns = await Column.find();
      res.send(columns);
    } else {
      // if query params, filter by query
      const matchedColumns = await Column.find(query);
      
      if (matchedColumns.length === 0) {
        return res.status(404).send('No matching columns found');
      }
      
      res.send(matchedColumns);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post('/add-column', async(req, res) => {
    try{
        const column = req.body;
        const newColumn = await Column.create(column);
        res.status(200).json(newColumn);
        }
    catch(err){
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


