import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, setFilters, setPage } from './tasksSlice';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import Pagination from '../../components/Pagination';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error, currentPage, totalPages, filters } = useSelector(
    (state) => state.tasks
  );
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getTasks({ page: currentPage, filters }));
  }, [dispatch, currentPage, filters]);

  const handleSearch = (searchTerm) => {
    dispatch(setFilters({ search: searchTerm }));
  };

  const handleStatusFilter = (status) => {
    dispatch(setFilters({ status }));
  };

  const handleDateFilter = (date) => {
    dispatch(setFilters({ date }));
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}

      <TaskFilters
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onDateFilter={handleDateFilter}
        filters={filters}
      />

      {status === 'loading' ? (
        <div className="flex justify-center items-center h-32">Loading tasks...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="text-gray-500">No tasks found</div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TaskList;