import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className='flex min-h-screen w-screen flex-col overflow-hidden'>
      <main className='flex grow'>
        <Outlet />
      </main>
      <footer>
        <div className='p-4 text-center text-gray-500'>
          &copy; Copyright {new Date().getFullYear()} - Hrustinszki Ádám
        </div>
      </footer>
    </div>
  );
}
