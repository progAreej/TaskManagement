
// const pool = require('../Config/db'); // Adjust the path as necessary

// // Create a new task
// const createTask = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const result = await pool.query(
//       'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
//       [title, description]
//     );
//     res.status(201).json({ message: 'Task created successfully', task: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Task creation failed' });
//   }
// };

// // Get all tasks (excluding soft-deleted ones)
// const getAllTasks = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM tasks WHERE is_deleted IS NULL');
//     res.json({ tasks: result.rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve tasks' });
//   }
// };

// // Update a task
// const updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     const result = await pool.query(
//       'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
//       [title, description, id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     res.json({ message: 'Task updated successfully', task: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Task update failed' });
//   }
// };

// // Delete a task (soft delete)
// const deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       'UPDATE tasks SET is_deleted = NOW() WHERE id = $1 RETURNING *',
//       [id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     res.json({ message: 'Task deleted successfully', task: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Task deletion failed' });
//   }
// };

// module.exports = {
//   createTask,
//   getAllTasks,
//   updateTask,
//   deleteTask,
// };


const pool = require('../Config/db'); // Adjust the path as necessary

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json({ message: 'Task created successfully', task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Task creation failed' });
  }
};

// Get all tasks (excluding soft-deleted ones)
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE is_deleted IS NULL');
    res.json({ tasks: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND is_deleted IS NULL RETURNING *',
      [title, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found or has been deleted' });
    }
    res.json({ message: 'Task updated successfully', task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Task update failed' });
  }
};

// Delete a task (soft delete)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE tasks SET is_deleted = NOW() WHERE id = $1 AND is_deleted IS NULL RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found or has already been deleted' });
    }
    res.json({ message: 'Task deleted successfully', task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Task deletion failed' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
