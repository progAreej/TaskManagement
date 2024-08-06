

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      console.log('API Response:', response.data);
      console.log('Response Tasks:', response.data.tasks);
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      alert('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', { title, description });
      setMessage('Task created successfully!');
      fetchTasks();
      setTitle('');
      setDescription('');
    } catch (error) {
      setMessage('Task creation failed.');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!editingTask) return;
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editingTask.id}`, { title, description });
      setMessage('Task updated successfully!');
      fetchTasks();
      setEditingTask(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      setMessage('Task update failed.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setMessage('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      setMessage('Task deletion failed.');
    }
  };

  const startEditing = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTask(task);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">{editingTask ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="mb-4 p-4 border border-gray-300 rounded-lg flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-4">{task.description}</p>
              <div className="flex justify-end space-x-4 mt-auto">
                <button
                  onClick={() => startEditing(task)}
                  className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
