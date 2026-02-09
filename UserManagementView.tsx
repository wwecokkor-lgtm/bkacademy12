
import React, { useState, useEffect } from 'react';
import type { User, UserStatus } from '../../types';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface UserManagementViewProps {
  t: (key: string) => string;
}

const UserManagementView: React.FC<UserManagementViewProps> = ({ t }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Blocked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Suspended': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
       <div className="flex items-center justify-center h-full">
        <i className="fas fa-spinner fa-spin text-4xl text-indigo-600"></i>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('all_users')}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">{t('name')}</th>
              <th scope="col" className="px-6 py-3">{t('email')}</th>
              <th scope="col" className="px-6 py-3">{t('role')}</th>
              <th scope="col" className="px-6 py-3">{t('status')}</th>
              <th scope="col" className="px-6 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline">Edit</button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementView;
