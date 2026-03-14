import React, { useState } from 'react';
import {
    Landmark,
    CreditCard,
    Wallet,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    Plus,
    MoreVertical,
    Trash2,
    Download,
    User,
    ShieldCheck,
    X,
    Loader2,
    Receipt
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BankingTab = () => {
    // --- State: Payroll Data ---
    const [staffList, setStaffList] = useState([
        { id: 1, name: 'Marcus Sterling', role: 'Senior Trainer', amount: 3800, status: 'Due Today', avatar: 'MS', paid: false },
        { id: 2, name: 'Sarah Jenkins', role: 'Yoga Instructor', amount: 2400, status: 'Due in 2 days', avatar: 'SJ', paid: false },
        { id: 3, name: 'Mike Ross', role: 'Strength Coach', amount: 3100, status: 'Overdue', avatar: 'MR', paid: false },
        { id: 4, name: 'Jessica Pearson', role: 'Front Desk Lead', amount: 2100, status: 'Due Today', avatar: 'JP', paid: false },
    ]);

    // --- State: Payment Modal ---
    const [selectedStaff, setSelectedStaff] = useState(null); // Staff object being paid
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // --- Handlers ---
    const handlePayClick = (staff) => {
        setSelectedStaff(staff);
        setPaymentSuccess(false);
    };

    const handleConfirmPayment = () => {
        setIsProcessing(true);
        // Simulate Bank API Call
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);

            // Update the list to show "Paid"
            setStaffList(prev => prev.map(s =>
                s.id === selectedStaff.id ? { ...s, paid: true, status: 'Paid' } : s
            ));
        }, 2000);
    };

    const closeAndReset = () => {
        setSelectedStaff(null);
        setPaymentSuccess(false);
    };

    // --- Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 relative"
        >

            {/* --- Section 1: Financial Snapshots --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet size={80} className="text-emerald-500 transform rotate-12" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-emerald-50 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Wallet className="text-emerald-600 w-6 h-6" />
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">Ready</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">Available for Payout</p>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">$12,450.00</h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                        <ArrowUpRight size={16} /> Withdraw Funds
                    </motion.button>
                </motion.div>

                {/* Pending Clearance */}
                <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock size={80} className="text-amber-500 transform -rotate-12" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-amber-50 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Clock className="text-amber-500 w-6 h-6" />
                        </div>
                        <span className="text-slate-400 text-xs font-semibold bg-slate-50 px-2 py-1 rounded-lg">Est. 24-48 hrs</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">Pending Clearance</p>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">$2,180.50</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1 bg-slate-50/50 p-2 rounded-lg border border-slate-100/50">
                        *Includes weekend transactions
                    </div>
                </motion.div>

                {/* Lifetime Withdrawn */}
                <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Landmark size={80} className="text-indigo-500 transform rotate-6" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-indigo-50 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Landmark className="text-indigo-600 w-6 h-6" />
                        </div>
                        <span className="text-slate-400 text-xs font-semibold bg-slate-50 px-2 py-1 rounded-lg">Lifetime</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">Total Withdrawn</p>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">$84,320.00</h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Download size={16} /> Download Statement
                    </motion.button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* --- Section 2: PENDING PAYROLL (New Feature) --- */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100/50 flex justify-between items-center bg-white/50">
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg tracking-tight">Staff Payroll</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">February 2026 • 4 Pending</p>
                        </div>
                        <button className="text-sm text-emerald-600 font-bold hover:text-emerald-700 transition-colors">View All Staff</button>
                    </div>

                    <div className="divide-y divide-slate-100/50">
                        {staffList.map((staff, index) => (
                            <motion.div
                                key={staff.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 flex items-center justify-between hover:bg-white/60 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-300
                                        ${staff.paid ? 'bg-emerald-100 text-emerald-600 rotate-0' : 'bg-slate-100 text-slate-600 group-hover:rotate-3 group-hover:scale-105'}`}>
                                        {staff.paid ? <CheckCircle2 size={20} /> : staff.avatar}
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm transition-colors ${staff.paid ? 'text-slate-400' : 'text-slate-800'}`}>{staff.name}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{staff.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* Status Pill */}
                                    {!staff.paid && (
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm
                                            ${staff.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                            {staff.status}
                                        </span>
                                    )}

                                    {/* Amount */}
                                    <span className={`font-mono font-bold text-base ${staff.paid ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-800'}`}>
                                        ${staff.amount.toLocaleString()}
                                    </span>

                                    {/* Action Button */}
                                    <AnimatePresence mode="wait">
                                        {staff.paid ? (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-400 text-xs font-bold rounded-xl cursor-not-allowed flex items-center gap-1"
                                            >
                                                Paid <CheckCircle2 size={12} />
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handlePayClick(staff)}
                                                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all"
                                            >
                                                Pay Now
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Bulk Action Footer */}
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-lg hover:bg-slate-100"
                        >
                            Process Bulk Payment (All Pending)
                        </motion.button>
                    </div>
                </motion.div>

                {/* --- Section 3: Linked Accounts (Right) --- */}
                <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-slate-200/50 p-6 h-fit relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="font-bold text-slate-800 text-lg tracking-tight">Funding Source</h3>
                        <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} className="p-2 hover:bg-slate-100/80 rounded-full text-slate-400 transition-colors">
                            <Plus size={20} />
                        </motion.button>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {/* Primary Account */}
                        <motion.div whileHover={{ y: -2 }} className="p-4 border border-emerald-200/50 bg-emerald-50/20 rounded-2xl relative group cursor-pointer transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-md shadow-emerald-500/5">
                                    <Landmark className="text-emerald-600 w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-slate-800">Bank of America</p>
                                        <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded shadow-sm">Primary</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">Checking •••• 5678</p>
                                </div>
                            </div>
                        </motion.div>
                        {/* Secondary Card */}
                        <motion.div whileHover={{ y: -2 }} className="p-4 border border-slate-100 hover:border-slate-300/50 hover:shadow-lg rounded-2xl relative group transition-all bg-white/40 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                                    <CreditCard className="text-slate-500 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Visa Corporate</p>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">Debit •••• 4242</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* --- PAYMENT PORTAL MODAL --- */}
            <AnimatePresence>
                {selectedStaff && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                            onClick={closeAndReset}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-white/90 backdrop-blur-2xl w-full max-w-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-100/50 flex justify-between items-center bg-white/40">
                                <h3 className="font-bold text-slate-800 tracking-tight">Initiate Salary Payment</h3>
                                <button onClick={closeAndReset} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    {paymentSuccess ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center py-8"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-xl shadow-emerald-500/20"
                                            >
                                                <Receipt size={40} />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Payment Successful!</h3>
                                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                                <span className="font-bold text-slate-900">${selectedStaff.amount.toLocaleString()}</span> has been sent to <span className="font-bold text-slate-900">{selectedStaff.name}</span>.<br />
                                                <span className="font-mono text-xs text-slate-400 mt-2 block">ID: #PAY-{Math.floor(Math.random() * 10000)}</span>
                                            </p>
                                            <div className="flex gap-3">
                                                <button onClick={closeAndReset} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                                    Close
                                                </button>
                                                <button className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
                                                    <Download size={18} /> Receipt
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="payment-form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {/* Beneficiary Card */}
                                            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-700 font-bold border border-slate-100 text-lg">
                                                    {selectedStaff.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Beneficiary</p>
                                                    <p className="font-bold text-slate-800 text-lg">{selectedStaff.name}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{selectedStaff.role} • Chase •• 8821</p>
                                                </div>
                                            </div>

                                            {/* Amount Display */}
                                            <div className="text-center mb-8">
                                                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Transfer Amount</p>
                                                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                                                    ${selectedStaff.amount.toLocaleString()}
                                                </div>
                                            </div>

                                            {/* Source Selector */}
                                            <div className="mb-8">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Funding Source</label>
                                                <div className="flex items-center gap-4 p-4 border-2 border-emerald-500/20 bg-emerald-50/20 rounded-2xl cursor-pointer hover:border-emerald-500 transition-colors relative">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                                        <Landmark className="text-emerald-600" size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-800">Bank of America</p>
                                                        <p className="text-xs text-slate-500 font-medium">Available: $12,450.00</p>
                                                    </div>
                                                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 shadow-sm ring-2 ring-white" />
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleConfirmPayment}
                                                disabled={isProcessing}
                                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed group"
                                            >
                                                {isProcessing ? (
                                                    <><Loader2 className="animate-spin" size={20} /> Processing...</>
                                                ) : (
                                                    <><ShieldCheck size={20} className="group-hover:text-emerald-400 transition-colors" /> Confirm & Pay ${selectedStaff.amount.toLocaleString()}</>
                                                )}
                                            </motion.button>
                                            <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1 opacity-70">
                                                <ShieldCheck size={10} /> 256-bit Secure SSL Encrypted Transaction
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BankingTab;
