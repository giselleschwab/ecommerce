import { useEffect } from 'react';

type ToastAlertProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
};

export default function ToastAlert({ message, type = 'info', onClose }: ToastAlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-[#203a40]',
    error: 'bg-red-500',
    info: 'bg-[#4b8795]',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 text-white px-4 py-2 rounded-lg shadow-lg ${bgColors[type]} animate-fade-in-up`}>
      {message}
    </div>
  );
}
