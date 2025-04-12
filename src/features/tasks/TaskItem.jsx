import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, removeTask } from './tasksSlice';
import { format, parseISO } from 'date-fns';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate || new Date().toISOString().split('T')[0]
  });

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch(editTask({ id: task._id, taskData: { status: newStatus } }));
  };

  const handleEdit = () => {
    dispatch(editTask({ id: task._id, taskData: editedTask }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeTask(task._id));
  };

  // Safe date formatting
  const formatDate = (dateString) => {
    try {
      return dateString ? format(parseISO(dateString), 'MMM dd, yyyy') : 'No date set';
    } catch (error) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{task.name}</h3>
              <p className="text-gray-600 mt-1">{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Due: {formatDate(task.dueDate)}
              </p>
            </div>
            <select
              value={task.status}
              onChange={handleStatusChange}
              className="border rounded px-2 py-1"
            >
              <option value="PENDING">Pending</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;