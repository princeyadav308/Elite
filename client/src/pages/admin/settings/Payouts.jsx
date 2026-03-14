import React from 'react';

const payoutHistory = [
    { id: '#PY-9021-X9', date: 'May 12, 2024', method: 'Bank Transfer', amount: '$4,500.00', status: 'Completed' },
    { id: '#PY-8842-A1', date: 'May 10, 2024', method: 'Bank Transfer', amount: '$2,100.00', status: 'Processing' },
    { id: '#PY-7753-C4', date: 'May 05, 2024', method: 'Bank Transfer', amount: '$5,800.00', status: 'Completed' },
    { id: '#PY-6610-B2', date: 'Apr 28, 2024', method: 'Instant Pay', amount: '$3,200.00', status: 'Completed' },
    { id: '#PY-5541-Z8', date: 'Apr 22, 2024', method: 'Bank Transfer', amount: '$1,950.00', status: 'Completed' },
    { id: '#PY-4432-W3', date: 'Apr 15, 2024', method: 'Bank Transfer', amount: '$6,700.00', status: 'Completed' },
    { id: '#PY-3321-Q1', date: 'Apr 08, 2024', method: 'Bank Transfer', amount: '$4,250.00', status: 'Completed' },
    { id: '#PY-2210-L5', date: 'Apr 01, 2024', method: 'Bank Transfer', amount: '$3,900.00', status: 'Completed' },
];

const statusClasses = {
    Completed: 'bg-emerald-50 text-emerald-600',
    Processing: 'bg-amber-50 text-amber-600',
    Failed: 'bg-red-50 text-red-600',
};

const Payouts = () => {
    return (
        <div className="space-y-6">
            {/* Financial Snapshot */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] p-4">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg">analytics</span>
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Financial Snapshot</h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Last updated: Just now</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="py-2 md:py-0 md:px-6 first:pl-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available for Payout</p>
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-800">$12,450.00</h3>
                            <div className="w-5 h-5 bg-emerald-50 rounded flex items-center justify-center text-emerald-500">
                                <span className="material-symbols-outlined text-xs">account_balance_wallet</span>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 md:py-0 md:px-6">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Clearance</p>
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-800">$2,180.50</h3>
                            <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined text-xs">schedule</span>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 md:py-0 md:px-6 last:pr-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Withdrawn</p>
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-800">$84,320.00</h3>
                            <div className="w-5 h-5 bg-purple-50 rounded flex items-center justify-center text-purple-500">
                                <span className="material-symbols-outlined text-xs">payments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payout History Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] overflow-hidden flex flex-col min-h-[750px]">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-medium text-slate-800">Payout History</h3>
                        <p className="text-sm text-slate-500">Detailed record of all historical withdrawals.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <input className="px-3 py-1.5 text-sm border-none focus:ring-0 w-48 outline-none" placeholder="Search transactions..." type="text" />
                            <button className="px-3 border-l border-slate-200 text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </button>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg bg-white flex items-center gap-2 text-xs font-bold">
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                            Filter
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto flex-grow">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-4">Transaction ID</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4">Method</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {payoutHistory.map((p, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-4 text-sm font-semibold text-slate-700">{p.id}</td>
                                    <td className="px-8 py-4 text-sm text-slate-500">{p.date}</td>
                                    <td className="px-8 py-4 text-sm text-slate-500">{p.method}</td>
                                    <td className="px-8 py-4 text-sm font-bold text-slate-800">{p.amount}</td>
                                    <td className="px-8 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusClasses[p.status]}`}>{p.status}</span>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        {p.status === 'Completed' ? (
                                            <button className="text-[#00d09c] hover:bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ml-auto">
                                                <span className="material-symbols-outlined text-sm">download</span> Receipt
                                            </button>
                                        ) : (
                                            <button className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-not-allowed text-slate-300 flex items-center gap-1 ml-auto" disabled>
                                                <span className="material-symbols-outlined text-sm">download</span> Receipt
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/20">
                    <p className="text-xs font-medium text-slate-400">Showing 1 to 8 of 24 entries</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-400 hover:text-slate-600">Previous</button>
                        <button className="px-3 py-1 bg-[#00d09c] text-white rounded text-xs font-bold shadow-sm">1</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-500 hover:bg-slate-50">2</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-500 hover:bg-slate-50">3</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-500 hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>

            {/* Linked Bank Account */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] p-4 bg-slate-50/20 border-dashed">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-800">Bank of America (Linked)</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-tight font-medium">Account ending in •••• 5678</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-[10px] text-slate-600 hover:bg-white transition-all">Manage Account</button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-[10px] hover:bg-slate-800 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            New Method
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payouts;
