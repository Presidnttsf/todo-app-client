import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from './tasksSlice';

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ 
      name, 
      description, 
      status: 'PENDING',
      dueDate: dueDate || new Date().toISOString().split('T')[0] // Default to today if not set
    }));
    setName('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;