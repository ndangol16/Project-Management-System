const express = require('express'); 
const router = express.Router();
const Task = require('../models/task');
const Column = require('../models/column');
const multer = require('multer');
const authorize = require('../middlewares/checkAuth');
const setUser = require('../middlewares/setUser');

// router.use(authorize);
router.use(setUser);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + file.originalname;
      req.filename = filename;
      cb(null, filename);
    },
  });

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
  });  

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error("Only image files!"), false);
    } else {
      cb(null, true);
    }
  };

router.get('/', async (req, res) => {
    try {
        const query = req.query;
    
        if (Object.keys(query).length === 0) {
        // if no query return all tasks
        const tasks = await Task.find().populate('column');
        res.send(tasks);
        } else {
        // if query params filter by query
        const matchedTasks = await Task.find(query).populate('column');
    
        if (matchedTasks.length === 0) {
            return res.status(404).send('No matching tasks found');
        }
    
        res.send(matchedTasks);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
    }
);

router.post('/add-task', async (req, res) => {
    try {
        const taskData = req.body;
    
        // Find associated column
        const columnId = taskData.column;
        const column = await Column.findById(columnId);
    
        if (!column) {
        return res.status(404).json({ message: 'Column not found' });
        }
    
        // Create task with associated column
        const newTask = await Task.create(taskData);
        column.tasks.push(newTask);
        await column.save();
    
        res.status(200).json(newTask);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.delete('/delete-task/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(id);
    
        if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
        }
    
        res.status(200).json(deletedTask);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.put('/update-task/:id', upload.single('image'), async (req, res) => {
    try {
      const id = req.params.id;
      const updatedTask = req.body;
  
      // Check if an image was uploaded
      if (req.file) {
        updatedTask.image = req.file.filename; // Set the image field of the updated task to the filename of the uploaded image
      }
  
      const updatedTaskResult = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
  
      if (!updatedTaskResult) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTaskResult);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/update-task-column/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const newColumn = req.body.newColumn;
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, { column: newColumn }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;