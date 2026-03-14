import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

/* ── Helpers ── */
const years = [2023, 2024, 2025, 2026];
const getQuarters = (year) => [
    { label: `Jan - Mar (${year})`, value: `Q1 ${year}` },
    { label: `Apr - Jun (${year})`, value: `Q2 ${year}` },
    { label: `Jul - Sep (${year})`, value: `Q3 ${year}` },
    { label: `Oct - Dec (${year})`, value: `Q4 ${year}` },
];

/* ── Framer Motion Variants ── */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardHover = {
    y: -3,
    boxShadow: '0 14px 32px -8px rgba(0,0,0,0.10), 0 6px 16px -4px rgba(0,0,0,0.06)',
    transition: { duration: 0.2 },
};

/* ── Dropdown Menu ── */
const DropdownMenu = ({ options, isOpen, onClose, menuRef }) => {
    if (!isOpen) return null;
    return (
        <div ref={menuRef} className="absolute right-0 top-8 z-30 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5">
            {options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => { opt.action?.(); onClose(); }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-slate-50 hover:text-[#00d09c] transition-colors flex items-center gap-3"
                >
                    <span className="material-symbols-outlined text-base">{opt.icon}</span>
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

/* ── Click-Outside Hook ── */
const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    }, [ref, handler]);
};

/* ── Peak Hours Chart Config ── */
const peakHoursData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        data: [65, 85, 75, 100, 60, 40, 30],
        backgroundColor: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
            (d) => d === 'Thu' ? '#00d09c' : 'rgba(0, 208, 156, 0.18)'
        ),
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.7,
    }],
};

const peakHoursOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                font: { family: "'Plus Jakarta Sans'", size: 11, weight: 700 },
                color: '#334155',
            },
        },
        y: {
            display: false,
            grid: { display: false },
            beginAtZero: true,
            max: 110,
        },
    },
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { family: "'Plus Jakarta Sans'", size: 12, weight: 700 },
            bodyFont: { family: "'Plus Jakarta Sans'", size: 11 },
            cornerRadius: 8,
            padding: 10,
            displayColors: false,
            callbacks: {
                title: () => '',
                label: (ctx) => `${ctx.raw} visitors`,
            },
        },
    },
};

/* ══════════════════════════════════════════════════
   Dashboard Component
   ══════════════════════════════════════════════════ */
import LiveClock from '../../components/dashboard/LiveClock';
import DateRangePicker from '../../components/dashboard/DateRangePicker';
import DashboardReport from '../../components/dashboard/DashboardReport';
import { PDFDownloadLink } from '@react-pdf/renderer';

/* ── ... (imports) ... ── */

/* ══════════════════════════════════════════════════
   Dashboard Component
   ══════════════════════════════════════════════════ */
const Dashboard = () => {
    const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
    const [openMenu, setOpenMenu] = useState(null);
    const [alerts, setAlerts] = useState([
        { id: 1, text: '3 Payments Failed Today', icon: 'credit_card_off', color: 'text-red-600 bg-red-50 border-red-200' },
        { id: 2, text: '1 Treadmill Out of Order', icon: 'fitness_center', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    ]);
    const menuRef = useRef(null);

    useClickOutside(menuRef, () => setOpenMenu(null));

    const genericOptions = [
        { label: 'View Details', icon: 'visibility' },
        { label: 'Download CSV', icon: 'download' },
        { label: 'Share Report', icon: 'share' },
        { label: 'Print', icon: 'print' },
    ];

    const toggleMenu = (id) => setOpenMenu(openMenu === id ? null : id);
    const dismissAlert = (id) => setAlerts(alerts.filter(a => a.id !== id));

    return (
        <motion.div
            className="w-full space-y-6"
            variants={stagger}
            initial="hidden"
            animate="show"
        >
            {/* ── Live Floor Indicator ── */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-[#00d09c]/30">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#00d09c]"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d09c]"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Live: 45 / 100 Capacity</span>
                </div>
                <LiveClock />
            </motion.div>

            {/* ── Header Row ── */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="heading-sm text-slate-950">Dashboard Overview</h1>
                    <p className="text-sm text-slate-800 mt-1">Detailed Analytics and Performance Metrics</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Advanced Date Picker */}
                    <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

                    {/* Divider */}
                    <div className="hidden md:block w-px h-8 bg-slate-200"></div>

                    {/* Quick Actions */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-900 hover:border-[#00d09c] hover:text-[#00d09c] transition-all">
                        <span className="material-symbols-outlined text-base">how_to_reg</span>
                        Quick Check-in
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d09c] text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-emerald-200">
                        <span className="material-symbols-outlined text-base">person_add</span>
                        Add Member
                    </button>

                    {/* Public PDF Export Button */}
                    <PDFDownloadLink document={<DashboardReport />} fileName="elite-dashboard-report.pdf">
                        {({ blob, url, loading, error }) => (
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all ml-2" disabled={loading}>
                                <span className="material-symbols-outlined text-base">download</span>
                                {loading ? 'Generating...' : 'Export Report'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </motion.div>

            {/* ── Priority Alerts ── */}
            {alerts.length > 0 && (
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border ${alert.color} text-sm font-bold`}>
                            <span className="material-symbols-outlined text-base">{alert.icon}</span>
                            {alert.text}
                            <button
                                onClick={() => dismissAlert(alert.id)}
                                className="ml-1 w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    ))}
                </motion.div>
            )}

            {/* ══ Stat Cards ══ */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Active Members */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-200 shadow-sm cursor-default">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Members</span>
                        <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-md">+12.4%</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                        <span className="heading-xs text-slate-900">1,284</span>
                        <span className="text-xs text-slate-700 font-medium">prev: 1,142</span>
                    </div>
                    <div className="mt-4 flex items-end gap-1 h-8">
                        <div className="flex-1 bg-emerald-500/10 h-[40%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/15 h-[60%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/15 h-[50%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/30 h-[70%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500 h-[90%] rounded-sm"></div>
                    </div>
                </motion.div>

                {/* Monthly Revenue */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-200 shadow-sm cursor-default">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Monthly Revenue</span>
                        <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-md">+$4.2k</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                        <span className="heading-xs text-slate-900">$42,500</span>
                        <span className="text-xs text-slate-500 font-medium">target: $40k</span>
                    </div>
                    <div className="mt-4 flex items-end gap-1 h-8">
                        <div className="flex-1 bg-emerald-500/10 h-[80%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/30 h-[85%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/15 h-[60%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/30 h-[75%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500 h-[95%] rounded-sm"></div>
                    </div>
                </motion.div>

                {/* Member Retention + At-Risk Pipeline */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-200 shadow-sm cursor-default">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Member Retention</span>
                        <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-0.5 rounded-md">-1.2%</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                        <span className="heading-xs text-slate-900">94.2%</span>
                        <span className="text-xs text-slate-500 font-medium">bench: 95%</span>
                    </div>
                    {/* At-Risk Pipeline sub-metric */}
                    <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200/60">
                        <span className="material-symbols-outlined text-amber-600 text-sm">warning</span>
                        <span className="text-[11px] font-bold text-amber-800">12 at-risk — no visit in 30d</span>
                        <a href="#" className="text-[11px] font-bold text-amber-600 hover:underline ml-auto whitespace-nowrap">View →</a>
                    </div>
                </motion.div>

                {/* New Sign-ups */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-200 shadow-sm cursor-default">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">New Sign-ups</span>
                        <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-md">+18 this week</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                        <span className="heading-xs text-slate-900">67</span>
                        <span className="text-xs text-slate-500 font-medium">this month</span>
                    </div>
                    <div className="mt-4 flex items-end gap-1 h-8">
                        <div className="flex-1 bg-emerald-500/10 h-[30%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/15 h-[45%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/15 h-[55%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500/30 h-[65%] rounded-sm"></div>
                        <div className="flex-1 bg-emerald-500 h-[80%] rounded-sm"></div>
                    </div>
                </motion.div>
            </motion.div>

            {/* ══ Row 2: Revenue Distribution | Peak Hours (Chart.js) | Membership Breakdown ══ */}
            <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Distribution */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full shadow-sm relative cursor-default">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Revenue Distribution</h3>
                        <button onClick={() => toggleMenu('revenue')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="material-symbols-outlined text-slate-700 text-lg">more_vert</span>
                        </button>
                        <DropdownMenu options={genericOptions} isOpen={openMenu === 'revenue'} onClose={() => setOpenMenu(null)} menuRef={menuRef} />
                    </div>
                    <div className="flex-grow flex flex-col justify-center space-y-3">
                        {[
                            { label: 'Memberships', amount: '$32,000', pct: 75, color: 'bg-[#00d09c]' },
                            { label: 'Personal Training', amount: '$8,500', pct: 20, color: 'bg-emerald-400' },
                            { label: 'Retail / Supplements', amount: '$2,000', pct: 5, color: 'bg-emerald-300' },
                        ].map((item) => (
                            <div key={item.label} className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition-colors space-y-1.5">
                                <div className="flex justify-between text-xs font-bold text-gray-900">
                                    <span>{item.label}</span>
                                    <span className="text-[#00d09c]">{item.amount} ({item.pct}%)</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${item.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.pct}%` }}
                                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-800">
                        <span>Total: $42,500</span>
                        <a className="text-[#00d09c] hover:underline font-bold" href="#">View Full Report</a>
                    </div>
                </motion.div>

                {/* Peak Hours — Chart.js Animated Bar Chart */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full shadow-sm relative cursor-default">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Peak Hours</h3>
                        <button onClick={() => toggleMenu('peak')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="material-symbols-outlined text-slate-500 text-lg">more_vert</span>
                        </button>
                        <DropdownMenu options={genericOptions} isOpen={openMenu === 'peak'} onClose={() => setOpenMenu(null)} menuRef={menuRef} />
                    </div>
                    <div className="flex-grow min-h-[160px]">
                        <Bar data={peakHoursData} options={peakHoursOptions} />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-slate-800 font-medium">Busiest: <span className="text-slate-950 font-bold">Thu, 6–8 PM</span></div>
                        <div className="text-xs text-[#00d09c] font-bold">+5.2% vs avg</div>
                    </div>
                </motion.div>

                {/* Membership Breakdown */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm relative cursor-default">
                    <div className="p-5 pb-3 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Membership Breakdown</h3>
                        <button onClick={() => toggleMenu('membership')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="material-symbols-outlined text-slate-500 text-lg">more_vert</span>
                        </button>
                        <DropdownMenu options={genericOptions} isOpen={openMenu === 'membership'} onClose={() => setOpenMenu(null)} menuRef={menuRef} />
                    </div>
                    <div className="px-5 pb-5 space-y-2.5 flex-grow">
                        {[
                            { plan: 'Premium', members: 486, pct: 38, color: 'bg-[#00d09c]', icon: 'diamond' },
                            { plan: 'Standard', members: 542, pct: 42, color: 'bg-emerald-400', icon: 'star' },
                            { plan: 'Basic', members: 196, pct: 15, color: 'bg-emerald-300', icon: 'circle' },
                            { plan: 'Day Pass', members: 60, pct: 5, color: 'bg-slate-300', icon: 'confirmation_number' },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.plan}
                                variants={fadeUp}
                                className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-base text-gray-900">{item.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-bold text-gray-900">{item.plan}</span>
                                        <span className="text-xs font-bold text-slate-500">{item.members} members</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                                        <motion.div
                                            className={`h-full ${item.color} rounded-full`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.pct}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 + idx * 0.1 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* ══ Row 3: Equipment Status | Recent Activity ══ */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Equipment Status */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative cursor-default">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Equipment Status</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs">
                                <span className="w-2 h-2 rounded-full bg-[#00d09c]"></span>
                                <span className="font-bold text-[#00d09c]">92% Operational</span>
                            </div>
                            <button onClick={() => toggleMenu('equip')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                                <span className="material-symbols-outlined text-slate-500 text-lg">more_vert</span>
                            </button>
                            <DropdownMenu
                                options={[
                                    { label: 'View All Equipment', icon: 'fitness_center' },
                                    { label: 'Schedule Maintenance', icon: 'build' },
                                    { label: 'Download Report', icon: 'download' },
                                ]}
                                isOpen={openMenu === 'equip'}
                                onClose={() => setOpenMenu(null)}
                                menuRef={menuRef}
                            />
                        </div>
                    </div>
                    <div className="p-5 space-y-2.5">
                        {[
                            { name: 'Cardio Machines', status: '48/50 Active', pct: 96, color: 'bg-[#00d09c]', icon: 'directions_run' },
                            { name: 'Strength Equipment', status: '22/24 Active', pct: 91, color: 'bg-[#00d09c]', icon: 'fitness_center' },
                            { name: 'Free Weights', status: 'Fully Stocked', pct: 100, color: 'bg-[#00d09c]', icon: 'exercise' },
                            { name: 'Locker Rooms', status: '3 Reported Issues', pct: 75, color: 'bg-amber-500', statusColor: 'text-amber-600', icon: 'door_open' },
                            { name: 'Upcoming Maintenance', status: '2 Scheduled', pct: 40, color: 'bg-blue-400', statusColor: 'text-blue-600', icon: 'build' },
                        ].map((item, idx) => (
                            <div key={item.name} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-base text-gray-900">{item.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between text-xs font-bold text-gray-900 mb-1.5">
                                        <span className="uppercase tracking-wide">{item.name}</span>
                                        <span className={item.statusColor || 'text-slate-500'}>{item.status}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${item.color} rounded-full`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.pct}%` }}
                                            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 + idx * 0.12 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={fadeUp} whileHover={cardHover} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative cursor-default">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Recent Activity</h3>
                        <button onClick={() => toggleMenu('activity')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="material-symbols-outlined text-slate-500 text-lg">more_vert</span>
                        </button>
                        <DropdownMenu
                            options={[
                                { label: 'View Full Log', icon: 'list' },
                                { label: 'Filter Activity', icon: 'filter_list' },
                                { label: 'Export Log', icon: 'download' },
                            ]}
                            isOpen={openMenu === 'activity'}
                            onClose={() => setOpenMenu(null)}
                            menuRef={menuRef}
                        />
                    </div>
                    <div className="divide-y divide-slate-50">
                        {[
                            { name: 'Sarah Johnson', action: 'New membership sign-up', time: '2 min ago', icon: 'person_add', color: 'text-[#00d09c] bg-emerald-50' },
                            { name: 'Mike Thompson', action: 'Renewed Premium plan', time: '15 min ago', icon: 'autorenew', color: 'text-blue-500 bg-blue-50' },
                            { name: 'James Doe', action: 'Completed equipment check', time: '1 hr ago', icon: 'task_alt', color: 'text-emerald-500 bg-emerald-50' },
                            { name: 'Anna Williams', action: 'Booked PT session with Coach Lee', time: '2 hrs ago', icon: 'event', color: 'text-violet-500 bg-violet-50' },
                            { name: 'System', action: 'Daily backup completed', time: '3 hrs ago', icon: 'cloud_done', color: 'text-slate-400 bg-slate-50' },
                        ].map((row, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${row.color}`}>
                                    <span className="material-symbols-outlined text-base">{row.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-950 truncate">{row.name}</p>
                                    <p className="text-xs text-slate-800 font-medium">{row.action}</p>
                                </div>
                                <span className="text-xs text-slate-700 font-medium whitespace-nowrap">{row.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* ── Footer ── */}
            <motion.footer variants={fadeUp} className="py-8 border-t border-slate-100 rounded-xl">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#00d09c]">fitness_center</span>
                        <span className="font-bold text-slate-950">ELITE</span>
                    </div>
                    <div className="flex gap-6 text-xs font-semibold text-slate-700 uppercase tracking-widest">
                        <a className="hover:text-[#00d09c] transition-colors" href="#">Privacy</a>
                        <a className="hover:text-[#00d09c] transition-colors" href="#">Terms</a>
                        <a className="hover:text-[#00d09c] transition-colors" href="#">Support</a>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium">© 2025 ELITE Gym Management. All rights reserved.</p>
                </div>
            </motion.footer>
        </motion.div>
    );
};

export default Dashboard;
