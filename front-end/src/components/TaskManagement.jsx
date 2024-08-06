

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      console.log('Fetched tasks:', response.data.tasks); // Debugging
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      showAlert('error', 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, { title, description });
      console.log('Task created:', response.data.task); // Debugging
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      showAlert('success', 'Task created successfully!');
      resetForm();
    } catch (error) {
      console.error('Task creation failed:', error);
      showAlert('error', 'Task creation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!editingTask) return;
    setIsLoading(true);
    try {
      const response = await axios.patch(`${API_BASE_URL}/tasks/${editingTask.id}`, { title, description });
      console.log('Task updated:', response.data.task); // Debugging
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === response.data.task.id ? response.data.task : task))
      );
      showAlert('success', 'Task updated successfully!');
      resetForm();
    } catch (error) {
      console.error('Task update failed:', error);
      showAlert('error', 'Task update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      console.log('Task deleted:', id); // Debugging
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      showAlert('success', 'Task deleted successfully!');
    } catch (error) {
      console.error('Task deletion failed:', error);
      showAlert('error', 'Task deletion failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTask(task);
  };

  const resetForm = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 5000);
  };

  return (
    <div className="container mx-auto p-6">
      {alert.message && (
        <div className={`mb-4 p-4 rounded-md ${alert.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {alert.type === 'error' ? <AlertCircle className="h-5 w-5 inline-block mr-2" /> : <CheckCircle className="h-5 w-5 inline-block mr-2" />}
          <span>{alert.message}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {editingTask ? 'Edit Task' : 'Create Task'}
          </h2>
          <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (editingTask ? 'Update Task' : 'Create Task')}
              </button>
              {editingTask && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Task List</h2>
          {isLoading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
