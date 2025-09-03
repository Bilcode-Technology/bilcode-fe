
import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockNotifications } from '../data/notificationsData';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative cursor-pointer bg-white hover:bg-gray-100 text-lg font-medium text-black p-3 rounded-full transition-all duration-300 flex items-center justify-center border border-gray-200"
        aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-base">Notifikasi</h3>
            <button onClick={handleMarkAllAsRead} className='text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1'>
                <CheckCheck size={16} />
                <span>Tandai semua dibaca</span>
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
                <p className='text-center text-gray-500 py-8'>Tidak ada notifikasi</p>
            ) : notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
              </div>
            ))}
          </div>
          <div className="p-2 bg-gray-50 border-t border-gray-200">
            <Link to="/notifications" onClick={() => setIsOpen(false)} className="block text-center text-sm font-medium text-blue-600 hover:text-blue-800">
              Lihat Semua Notifikasi
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
