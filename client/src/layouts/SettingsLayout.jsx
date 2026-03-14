import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const settingsTabs = [
    { label: 'Profile Information', path: '/admin/settings/profile', icon: 'person' },
    { label: 'Gym Profile', path: '/admin/settings/gym-profile', icon: 'store' },
    { label: 'Subscriptions', path: '/admin/settings/subscriptions', icon: 'credit_card' },
];

const SettingsLayout = () => {
    const location = useLocation();

    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar */}
                <aside className="w-full lg:w-72 space-y-6 sticky top-24">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] p-6">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#00d09c] to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                                EF
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-800 leading-tight">Elite Fitness</h2>
                                <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">ID: GYM-4421</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            {settingsTabs.map((tab) => {
                                const active = location.pathname === tab.path;
                                return (
                                    <NavLink
                                        key={tab.path}
                                        to={tab.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${active
                                            ? 'bg-emerald-50 text-[#00d09c] font-medium'
                                            : 'text-slate-600 hover:bg-white hover:shadow-sm hover:translate-x-1'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined">{tab.icon}</span>
                                        {tab.label}
                                    </NavLink>
                                );
                            })}
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-semibold text-sm hover:bg-red-50 rounded-xl transition-colors">
                                <span className="material-symbols-outlined text-lg">logout</span>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-1">Support</p>
                            <h3 className="text-lg font-semibold mb-4">Need help managing?</h3>
                            <p className="text-xs text-indigo-100 mb-4 leading-relaxed">Contact your dedicated account manager for any technical assistance.</p>
                            <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-xs font-bold transition-colors">
                                Contact Support
                            </button>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500 rounded-full opacity-20"></div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 space-y-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
