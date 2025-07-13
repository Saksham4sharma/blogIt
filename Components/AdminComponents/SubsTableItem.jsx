import React from 'react';

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const handleDelete = () => {
    deleteEmail(mongoId);
  };

  return (
    <tr className='bg-white border-b hover:bg-gray-50 transition-colors'>
      <td className='px-6 py-4 font-medium text-gray-900'>
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 text-gray-400 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" 
            />
          </svg>
          <span title={email}>
            {email || "No Email"}
          </span>
        </div>
      </td>
      
      <td className='px-6 py-4 hidden sm:table-cell text-gray-600'>
        {formatDate(date)}
      </td>
      
      <td className='px-6 py-4'>
        <button 
          onClick={handleDelete}
          className='text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors duration-200'
          title="Delete email subscription"
          aria-label={`Delete subscription for ${email}`}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItem;
