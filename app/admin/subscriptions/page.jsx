'use client'
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const SubscriptionsPage = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/email');
      
      if (response.data.success) {
        setEmails(response.data.emails || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch emails');
      }
    } catch (error) {
      console.error("Failed to fetch emails:", error);
      setError(error.message || 'Failed to load email subscriptions');
      setEmails([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmail = useCallback(async (mongoId) => {
    if (!window.confirm('Are you sure you want to delete this email subscription?')) {
      return;
    }

    try {
      const response = await axios.delete('/api/email', {
        params: { id: mongoId }
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Email subscription deleted successfully');
        // Remove the deleted email from state instead of refetching all
        setEmails(prevEmails => prevEmails.filter(email => email._id !== mongoId));
      } else {
        toast.error(response.data.message || 'Failed to delete email subscription');
      }
    } catch (error) {
      console.error("Failed to delete email:", error);
      
      if (error.response?.status === 404) {
        toast.error('Email subscription not found');
      } else {
        toast.error('Failed to delete email subscription. Please try again.');
      }
    }
  }, []);

  const exportEmails = useCallback(() => {
    if (emails.length === 0) {
      toast.error('No emails to export');
      return;
    }

    try {
      const csvContent = [
        ['Email', 'Date Subscribed'],
        ...emails.map(email => [
          email.email,
          new Date(email.date).toLocaleDateString()
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `email-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Email list exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export email list');
    }
  }, [emails]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  if (loading) {
    return (
      <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchEmails}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Email Subscriptions</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total: {emails.length} {emails.length === 1 ? 'subscription' : 'subscriptions'}
          </div>
          {emails.length > 0 && (
            <button
              onClick={exportEmails}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              Export CSV
            </button>
          )}
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No email subscriptions found</p>
        </div>
      ) : (
        <div className='relative max-w-[700px] h-[80vh] overflow-x-auto border border-gray-400 rounded-lg shadow-sm'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50 sticky top-0'>
              <tr>
                <th scope='col' className='px-6 py-4 font-medium'>
                  Email Address
                </th>
                <th scope='col' className='hidden sm:table-cell px-6 py-4 font-medium'>
                  Date Subscribed
                </th>
                <th scope='col' className='px-6 py-4 font-medium'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <SubsTableItem 
                  key={email._id}
                  mongoId={email._id} 
                  deleteEmail={deleteEmail} 
                  email={email.email} 
                  date={email.date}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
