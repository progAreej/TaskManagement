import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { title, description });
      setMessage('Task created successfully!');
      setTitle('');
      setDescription('');
      fetchTasks(); // Refresh tasks
    } catch (error) {
      setMessage('Task creation failed.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setMessage('Task deleted successfully!');
      fetchTasks(); // Refresh tasks
    } catch (error) {
      setMessage('Task deletion failed.');
    }
  };

  const handleEditTask = async (id, newTitle, newDescription) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: newTitle, description: newDescription });
      setMessage('Task updated successfully!');
      fetchTasks(); // Refresh tasks
    } catch (error) {
      setMessage('Task update failed.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Task List</h2>
        <form onSubmit={handleCreateTask}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Task
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>

        <h3 className="text-xl font-bold mt-8 mb-4">Tasks</h3>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="mb-4 p-4 border rounded-lg">
              <h4 className="text-lg font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditTask(task.id, task.title, task.description)}
                  className="py-1 px-2 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
