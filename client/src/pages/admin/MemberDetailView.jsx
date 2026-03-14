import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    CreditCard,
    User,
    Clock,
    Download,
    Trash2,
    CheckCircle2,
    ChevronDown
} from 'lucide-react';

const MemberDetailView = ({ member, onBack }) => {
    // 1. Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [selectedYear, setSelectedYear] = useState(2026);

    // Animation Variants
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

    // --- HEATMAP GENERATOR ---
    const activityGrid = useMemo(() => {
        // Regenerate data when year changes to simulate fetching new data
        const weeks = 52;
        const days = 7;
        const grid = [];
        for (let i = 0; i < weeks; i++) {
            const week = [];
            for (let j = 0; j < days; j++) {
                // Randomly assign intensity (0-3)
                // 0 = Empty, 1 = Light, 2 = Medium, 3 = Heavy
                const intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0;
                week.push(intensity);
            }
            grid.push(week);
        }
        return grid;
    }, [selectedYear]);

    // Helper: Get color based on intensity
    const getColor = (intensity) => {
        switch (intensity) {
            case 1: return 'bg-emerald-300';
            case 2: return 'bg-emerald-400';
            case 3: return 'bg-emerald-500';
            default: return 'bg-slate-200'; // Darker gray for better visibility
        }
    };

    // Helper: Determine month labels
    const getMonthForWeek = (weekIndex) => {
        const startDate = new Date(selectedYear, 0, 1);
        const currentDate = new Date(startDate.getTime() + (weekIndex * 7 * 24 * 60 * 60 * 1000));
        return currentDate.toLocaleString('default', { month: 'short' });
    };

    // Helper: Generate tooltip text
    const getTooltip = (weekIdx, dayIdx, intensity) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        if (intensity === 0) return `${days[dayIdx]} • Rest Day`;

        // Random check-in times for demo
        const times = ['06:30 AM', '09:15 AM', '05:45 PM', '07:20 PM'];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        const duration = ['45m', '1h 10m', '1h 30m'][intensity - 1];

        return `${days[dayIdx]} • ${randomTime} • ${duration}`;
    };

    return (
        <motion.div
            className="space-y-8 max-w-7xl mx-auto pb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* --- HEADER --- */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-12 md:mt-0 md:pl-16">
                    {/* Big Avatar */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-slate-400 overflow-hidden">
                            {member.avatar ? (
                                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <span>{member.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{member.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><Mail size={14} /> {member.email}</span>
                            <span className="flex items-center gap-1.5"><Phone size={14} /> {member.phone}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> New York, USA</span>
                        </div>
                        <div className="pt-4 flex items-center justify-center md:justify-start gap-3">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide rounded-full border border-emerald-100">
                                Platinum Member
                            </span>
                            <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-full border border-slate-100">
                                ID: #8821
                            </span>
                        </div>
                    </div>

                    {/* DELETE ACTION (Replaced Dropdown) */}
                    <div>
                        <button
                            className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-rose-100 text-rose-600 font-bold rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all active:scale-95"
                        >
                            <Trash2 size={18} /> Delete Member
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* --- HEATMAP SECTION --- */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                {/* Heatmap Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Calendar className="text-emerald-500" size={20} /> Training Frequency
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Consistency Tracker</p>
                    </div>

                    {/* Year Selector */}
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        {[2025, 2026].map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${selectedYear === year
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* The Heatmap Grid Container */}
                <div className="flex gap-4">
                    {/* Y-Axis Labels (Days) - Perfectly Aligned */}
                    <div className="flex flex-col gap-1 pt-6 text-[10px] font-bold text-slate-300 text-right">
                        <div className="h-3"></div> {/* Sun */}
                        <div className="h-3 leading-[12px]">Mon</div>
                        <div className="h-3"></div> {/* Tue */}
                        <div className="h-3 leading-[12px]">Wed</div>
                        <div className="h-3"></div> {/* Thu */}
                        <div className="h-3 leading-[12px]">Fri</div>
                        <div className="h-3"></div> {/* Sat */}
                    </div>

                    {/* The Grid Component */}
                    <div className="overflow-x-auto pb-4 scrollbar-hide flex-1">
                        {/* Month Labels Row */}
                        <div className="flex gap-1 mb-2 min-w-max">
                            {Array.from({ length: 52 }).map((_, i) => {
                                const startDate = new Date(selectedYear, 0, 1);
                                const currentDate = new Date(startDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
                                const month = currentDate.toLocaleString('default', { month: 'short' });

                                // Logic: Show label if it's the first week of the month
                                // We check if the previous week was in a different month
                                const prevDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
                                const prevMonth = prevDate.toLocaleString('default', { month: 'short' });
                                const showLabel = i === 0 || month !== prevMonth;

                                // Show label only if it fits? For now, we rely on overflow
                                return (
                                    <div key={i} className="w-3 text-[9px] font-bold text-slate-400 overflow-visible whitespace-nowrap">
                                        {showLabel ? month : ''}
                                    </div>
                                );
                            })}
                        </div>

                        {/* The Grid Row */}
                        <div className="flex gap-1 min-w-max">
                            {activityGrid.map((week, wIndex) => (
                                <div key={wIndex} className="flex flex-col gap-1">
                                    {week.map((dayIntensity, dIndex) => (
                                        <div
                                            key={`${wIndex}-${dIndex}`}
                                            className={`w-3 h-3 rounded-[2px] ${getColor(dayIntensity)} transition-all duration-200 hover:scale-125 hover:border hover:border-slate-400 cursor-pointer`}
                                            title={getTooltip(wIndex, dIndex, dayIntensity)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 text-xs text-slate-400 mt-2">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-slate-200 rounded-[2px]"></div>
                        <div className="w-3 h-3 bg-emerald-300 rounded-[2px]"></div>
                        <div className="w-3 h-3 bg-emerald-400 rounded-[2px]"></div>
                        <div className="w-3 h-3 bg-emerald-500 rounded-[2px]"></div>
                    </div>
                    <span>More</span>
                </div>
            </motion.div>

            {/* --- CONTEXT CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Membership Details */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Membership Details</h4>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-bold text-slate-800 mb-1">Platinum Access</p>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">Active</span>
                        </div>
                        <CreditCard className="text-slate-200" size={40} />
                    </div>
                    <div className="mt-6 flex justify-between items-end text-sm">
                        <div>
                            <p className="text-slate-500">Renewal Date</p>
                            <p className="font-bold text-slate-700">Jul 18, 2027</p>
                        </div>
                        <div className="text-right">
                            <p className="text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 size={14} /> Auto-Pay Enabled
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Training Program */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Training Program</h4>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">MS</div>
                        <div>
                            <p className="font-bold text-slate-800">Marcus Sterling</p>
                            <p className="text-xs text-slate-500">Assigned Trainer</p>
                        </div>
                        <div className="ml-auto">
                            <User className="text-slate-200" size={40} />
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Schedule</p>
                            <p className="text-sm font-bold text-slate-700 flex items-center gap-1">
                                <Clock size={12} className="text-slate-400" /> Mon/Wed • 6 PM
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Focus</p>
                            <p className="text-sm font-bold text-slate-700">Hypertrophy</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- BILLING HISTORY TABLE --- */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Transaction History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Item</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="hover:bg-slate-50 transition-colors group"
                                >
                                    <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2026</td>
                                    <td className="px-6 py-4 text-xs font-mono text-slate-400">INV-2026-00{i}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                        {i === 3 ? 'Personal Training (5 Pack)' : 'Monthly Membership (Platinum)'}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                        {i === 3 ? '$350.00' : '$99.00'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full border border-emerald-100">
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MemberDetailView;
