import { useState } from 'react';

const TaskFilters = ({ onSearch, onStatusFilter, onDateFilter, filters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    onStatusFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    onDateFilter(e.target.value);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            onChange={handleDateChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;