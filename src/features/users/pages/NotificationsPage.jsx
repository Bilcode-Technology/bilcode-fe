
import { Link } from 'react-router-dom';
import { mockNotifications } from '../data/notificationsData';

const NotificationsPage = () => {
  const notifications = mockNotifications; // In a real app, you'd fetch this

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 pt-32">
        <h1 className="text-3xl font-bold mb-6">Semua Notifikasi</h1>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <ul className="divide-y divide-gray-200">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <li key={notification.id} className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <p className="text-base text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">Anda belum memiliki notifikasi.</li>
            )}
          </ul>
        </div>
        <div className="mt-6 text-center">
            <Link to="/academy" className="text-blue-600 hover:underline">
                &larr; Kembali ke Academy
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
