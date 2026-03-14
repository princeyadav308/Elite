import React from 'react';

const AdminFooter = () => {
    return (
        <footer className="py-12 bg-slate-50/50 border-t border-slate-200/60 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
                {/* Brand */}
                <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-[#00d09c] rounded-lg flex items-center justify-center shadow-sm shadow-emerald-500/20">
                        <span className="material-symbols-outlined text-white text-lg">fitness_center</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight uppercase">ELITE</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <a href="#" className="hover:text-[#00d09c] transition-colors">Privacy</a>
                    <a href="#" className="hover:text-[#00d09c] transition-colors">Terms</a>
                    <a href="#" className="hover:text-[#00d09c] transition-colors">Support</a>
                </div>

                {/* Copyright */}
                <p className="text-xs font-medium text-slate-400">
                    © 2026 ELITE Gym Management. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default AdminFooter;
