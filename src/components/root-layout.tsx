import { Link, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className='flex min-h-screen w-screen flex-col overflow-hidden'>
      <header className='w-full'>
        <nav className='flex items-center gap-8 p-4 text-lg'>
          <h1 className='m-0 text-3xl font-bold'>
            <Link to='/'>Servers</Link>
          </h1>
          <div className='flex gap-4'>
            <Link
              to='/'
              className='hover:underline'
            >
              Home
            </Link>
            <Link
              to='/servers/new'
              className='hover:underline'
            >
              New Server
            </Link>
          </div>
        </nav>
      </header>
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
