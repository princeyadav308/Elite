import { Outlet, NavLink, Link } from 'react-router-dom';

const navLinks = [
  { name: 'Dashboard', path: '/trainer/dashboard' },
  { name: 'Schedule', path: '/trainer/schedule' },
  { name: 'My Clients', path: '/trainer/clients' },
  { name: 'Library', path: '/trainer/library' },
  { name: 'Profile', path: '/trainer/profile' },
];

export default function TrainerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/trainer/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d09c] rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">fitness_center</span>
              </div>
              <span className="text-xl font-bold text-[#1e293b]">FlexHub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500 h-16">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `h-full flex items-center transition-colors border-b-2 font-semibold ${
                      isActive
                        ? 'text-[#00d09c] border-[#00d09c]'
                        : 'border-transparent hover:text-[#00d09c]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                src="https://i.pravatar.cc/150?img=47"
              />
              <span className="text-sm font-bold hidden sm:block text-[#1e293b]">Sarah Jenkins</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex bg-[#f8f9fa]">
          <Outlet />
      </div>

      <footer className="py-10 text-center border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00d09c]">fitness_center</span>
            <span className="font-bold text-slate-700">FlexHub</span>
          </div>
          <p className="text-xs text-slate-500">
            © 2024 FlexHub Trainer Portal. Professional Analytics for Fitness Experts.
          </p>
        </div>
      </footer>
    </div>
  );
}
