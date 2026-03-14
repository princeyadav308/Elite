import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AdminFooter from '../components/AdminFooter';

const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Members', path: '/admin/members', icon: 'people' },
    { label: 'Staff Management', path: '/admin/staff', icon: 'badge' },
    { label: 'Financials', path: '/admin/financials', icon: 'account_balance' },
    { label: 'Revenue Calculator', path: '/admin/revenue-calculator', icon: 'calculate' },
    { label: 'Settings', path: '/admin/settings', icon: 'settings' },
];

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/admin/settings') return location.pathname.startsWith('/admin/settings');
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <div className="w-9 h-9 bg-[#00d09c] rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">fitness_center</span>
                        </div>
                        <span className="text-lg font-bold text-slate-900 tracking-tight uppercase">Elite</span>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1 h-full">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={() =>
                                    `flex items-center gap-1.5 px-4 h-full text-sm font-semibold transition-all relative
                                    ${isActive(item.path)
                                        ? 'text-[#00d09c]'
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`
                                }
                            >
                                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                {item.label}
                                {isActive(item.path) && (
                                    <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#00d09c] rounded-t-full" />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#00d09c] to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                AR
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-xs font-semibold text-slate-800 leading-none">Alex Rivera</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Gym Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="max-w-[1800px] mx-auto px-4 md:px-8 py-8 w-full flex-grow">
                <Outlet />
            </main>

            <AdminFooter />
        </div>
    );
};

export default AdminLayout;
