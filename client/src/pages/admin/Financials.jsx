import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { startOfMonth, endOfMonth, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    Activity,
    Calendar,
    Download,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    PieChart,
    BarChart3,
    ArrowRight,
    Search,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronDown,
    FileText
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import TableFooter from '../../components/TableFooter';
import DateRangePicker from '../../components/dashboard/DateRangePicker';
import BankingTab from '../../components/dashboard/BankingTab';

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

import { generateBankStatement } from '../../utils/pdfGenerator';

export default function Financials() {
    const [activeTab, setActiveTab] = useState('overview');
    const [dateRange, setDateRange] = useState({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) });




    // --- Transactions State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [transactionTab, setTransactionTab] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');



    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };


    // --- Mock Data ---
    const stats = [
        { label: 'Total Revenue', value: '$124,500', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'emerald' },
        { label: 'Total Expenses', value: '$45,200', change: '-2.4%', trend: 'down', icon: Wallet, color: 'blue' },
        { label: 'Net Profit', value: '$79,300', change: '+8.1%', trend: 'up', icon: Activity, color: 'indigo' },
        {
            label: 'Outstanding Dues',
            value: '$3,120',
            change: 'Alert',
            trend: 'down',
            icon: CheckCircle2,
            color: 'amber',
            action: () => {
                setActiveTab('transactions');
                setSearchQuery('Pending');
                setTransactionTab('Income'); // Assuming dues are income
            }
        },
    ];

    const allTransactions = [
        { id: 1, name: 'Jane Dawson', type: 'Membership', date: '2026-02-14', amount: 120.00, status: 'Completed', method: 'Visa •••• 4210' },
        { id: 2, name: 'Marcus King', type: 'PT Session', date: '2026-02-13', amount: 350.00, status: 'Completed', method: 'Apple Pay' },
        { id: 3, name: 'Sarah Lopez', type: 'Class Bundle', date: '2026-02-13', amount: 85.00, status: 'Pending', method: 'Mastercard •••• 9921' },
        { id: 4, name: 'Tom Redford', type: 'Cafe/Retail', date: '2026-02-12', amount: 14.50, status: 'Completed', method: 'RFID Band' },
        { id: 5, name: 'Equipment Maintenance', type: 'Expense', date: '2026-02-10', amount: -450.00, status: 'Completed', method: 'Bank Transfer' },
        { id: 6, name: 'Utility Bill - Electricity', type: 'Expense', date: '2026-02-09', amount: -320.00, status: 'Completed', method: 'Auto-Debit' },
        { id: 7, name: 'Mike Ross', type: 'Membership', date: '2026-02-08', amount: 120.00, status: 'Failed', method: 'Visa •••• 1234' },
        { id: 8, name: 'Jennifer Aniston', type: 'Supplement', date: '2026-02-08', amount: 45.00, status: 'Completed', method: 'Cash' },
        { id: 9, name: 'New Treadmill x2', type: 'Asset Purchase', date: '2026-02-05', amount: -6500.00, status: 'Completed', method: 'Wire Transfer' },
        { id: 10, name: 'Cleaning Services', type: 'Expense', date: '2026-02-04', amount: -200.00, status: 'Pending', method: 'Check' },
        { id: 11, name: 'Harvey Specter', type: 'PT Session', date: '2026-02-03', amount: 150.00, status: 'Completed', method: 'Amex •••• 9999' },
        { id: 12, name: 'Donna Paulsen', type: 'Membership', date: '2026-02-01', amount: 120.00, status: 'Completed', method: 'Visa •••• 5555' },
        { id: 13, name: 'Rent - Feb', type: 'Expense', date: '2026-02-01', amount: -2500.00, status: 'Completed', method: 'Bank Transfer' },
        { id: 14, name: 'Internet Service', type: 'Expense', date: '2026-02-01', amount: -85.00, status: 'Completed', method: 'Auto-Debit' },
        { id: 15, name: 'Jessica Pearson', type: 'Membership', date: '2026-01-28', amount: 120.00, status: 'Completed', method: 'Visa •••• 1111' },
        { id: 16, name: 'Louis Litt', type: 'PT Session', date: '2026-01-25', amount: 150.00, status: 'Failed', method: 'Mastercard •••• 2222' },
        { id: 17, name: 'Rachel Zane', type: 'Class Bundle', date: '2026-01-22', amount: 85.00, status: 'Completed', method: 'Apple Pay' },
        { id: 18, name: 'Gym Floor Mats', type: 'Asset Purchase', date: '2026-01-15', amount: -1200.00, status: 'Completed', method: 'Fidelity Check' },
        { id: 19, name: 'Water Delivery', type: 'Expense', date: '2026-01-10', amount: -45.00, status: 'Completed', method: 'Auto-Debit' },
        { id: 20, name: 'Alex Williams', type: 'Membership', date: '2026-01-05', amount: 120.00, status: 'Completed', method: 'Visa •••• 3333' }
    ];


    // --- Filtering Logic ---
    const filteredTransactions = allTransactions.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.status.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesType = true;
        if (transactionTab === 'Income') matchesType = t.amount > 0;
        if (transactionTab === 'Expenses') matchesType = t.amount < 0;

        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;

        let matchesDate = true;
        if (dateRange?.from && dateRange?.to) {
            const txDate = parseISO(t.date);
            matchesDate = isWithinInterval(txDate, {
                start: startOfDay(dateRange.from),
                end: endOfDay(dateRange.to)
            });
        }

        let matchesCategory = true;
        if (categoryFilter !== 'All') {
            if (categoryFilter === 'Membership') matchesCategory = t.type === 'Membership';
            if (categoryFilter === 'PT') matchesCategory = ['PT Session', 'Class Bundle'].includes(t.type);
            if (categoryFilter === 'Retail') matchesCategory = ['Cafe/Retail', 'Supplement'].includes(t.type);
            if (categoryFilter === 'Operations') matchesCategory = ['Expense', 'Asset Purchase'].includes(t.type);
        }

        return matchesSearch && matchesType && matchesStatus && matchesCategory && matchesDate;
    });

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // --- Chart Data ---
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: [65000, 72000, 68000, 85000, 92000, 105000, 98000, 115000, 125000, 110000, 135000, 145000],
                borderColor: '#10b981', // Emerald 500
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
                    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: 'Expenses',
                data: [45000, 48000, 46000, 52000, 55000, 58000, 56000, 62000, 65000, 60000, 68000, 70000],
                borderColor: '#3b82f6', // Blue 500
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { family: 'Inter', size: 12 }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1e293b',
                bodyColor: '#64748b',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: (context) => ` ${context.dataset.label}: $${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                grid: { color: '#f1f5f9', borderDash: [4, 4] },
                ticks: {
                    callback: (value) => `$${value / 1000}k`,
                    font: { family: 'Inter', size: 11 },
                    color: '#94a3b8'
                },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { family: 'Inter', size: 11 },
                    color: '#94a3b8'
                },
                border: { display: false }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };


    // --- Render Helpers ---

    const renderOverview = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={stat.action}
                        className={`bg-white/70 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl shadow-slate-200/50 relative overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${stat.action ? 'cursor-pointer hover:border-emerald-200/50' : ''}`}
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${stat.color}-500`}>
                            <stat.icon size={60} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 bg-${stat.color}-50 rounded-xl text-${stat.color}-600`}>
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl shadow-slate-200/50">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Revenue Analytics</h3>
                            <p className="text-sm text-slate-500">Income vs Expenses over time</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-bold text-slate-600">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-xs font-bold text-slate-600">Expenses</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* Insights Column */}
                <div className="space-y-6">
                    {/* Expense Breakdown */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-bold text-slate-800 self-start mb-2">Expense Breakdown</h3>
                        <div className="relative h-[180px] w-[180px]">
                            <Doughnut
                                data={{
                                    labels: ['Payroll', 'Rent', 'Equipment', 'Marketing', 'Misc'],
                                    datasets: [{
                                        data: [40, 30, 15, 10, 5],
                                        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#64748b'],
                                        borderWidth: 0,
                                        hoverOffset: 4
                                    }]
                                }}
                                options={{
                                    cutout: '75%',
                                    plugins: { legend: { display: false }, tooltip: { enabled: true } }
                                }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xs text-slate-400 font-bold uppercase">Total</span>
                                <span className="text-xl font-bold text-slate-800">$45.2k</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                            {['Payroll', 'Rent', 'Equipment', 'Marketing', 'Misc'].map((label, i) => (
                                <div key={label} className="flex items-center gap-1 text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded-md">
                                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#64748b'][i] }}></div>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Composition */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Revenue Composition</h3>
                            <p className="text-xs text-slate-500 font-medium">Recurring vs Variable</p>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-emerald-600">Stable (75%)</span>
                                <span className="text-amber-500">Variable (25%)</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                <div className="h-full bg-emerald-500 w-[75%]"></div>
                                <div className="h-full bg-amber-400 w-[25%] bottom-0"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                                <span>Memberships</span>
                                <span>PT / Retail</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // Status Badge Helper
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1 w-fit"><CheckCircle2 size={10} /> Completed</span>;
            case 'Pending': return <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-amber-100 text-amber-700 flex items-center gap-1 w-fit"><Clock size={10} /> Pending</span>;
            case 'Failed': return <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-red-100 text-red-700 flex items-center gap-1 w-fit"><XCircle size={10} /> Failed</span>;
            default: return <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700">{status}</span>;
        }
    };

    const renderTransactions = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col h-[calc(100vh-140px)]"
        >
            <div className="p-8 pb-4 border-b border-slate-100 flex justify-between items-end bg-white/50">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">Transactions</h3>
                    <p className="text-slate-500 text-sm mt-1">Detailed history of all financial movements</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Transaction Tabs */}
                    <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200/50 self-start">
                        {['All', 'Income', 'Expenses'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setTransactionTab(tab)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ease-out transform-gpu ${transactionTab === tab
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        {/* Date Range Picker */}
                        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2 pr-8 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:ring-2 hover:ring-emerald-100"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none w-3 h-3" />
                        </div>

                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2 pr-8 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:ring-2 hover:ring-emerald-100"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Membership">Membership</option>
                                <option value="PT">PT & Classes</option>
                                <option value="Retail">Retail</option>
                                <option value="Operations">Operations</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none w-3 h-3" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search transactions..."
                                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-48 lg:w-64 shadow-sm"
                            />
                            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                        </div>
                        <button
                            onClick={() => generateBankStatement(filteredTransactions)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200 ease-out active:scale-95 transition-transform duration-100 shadow-sm text-xs uppercase tracking-wide"
                        >
                            <FileText size={14} /> Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr] gap-4 px-8 py-4 bg-slate-50/50 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Method</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</div>
            </div>

            {/* Table Body */}
            <div className="overflow-y-auto overflow-x-hidden flex-1">
                <AnimatePresence mode="wait">
                    {paginatedTransactions.length > 0 ? (
                        <motion.div
                            key={`tx-list-${transactionTab}-${statusFilter}-${categoryFilter}-${searchQuery}-${JSON.stringify(dateRange)}-${paginatedTransactions.length}-${currentPage}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="divide-y divide-slate-100"
                        >
                            {paginatedTransactions.map((t) => (
                                <motion.div
                                    key={t.id}
                                    variants={itemVariants}
                                    className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr] gap-4 px-8 py-4 items-center border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 group cursor-default"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${t.amount < 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {t.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200 ease-out">{t.name}</span>
                                    </div>
                                    <div className="text-sm text-slate-600">{t.type}</div>
                                    <div className="text-sm text-slate-500 font-mono">{t.date}</div>
                                    <div className={`text-sm font-bold ${t.status === 'Failed' ? 'text-slate-400 line-through decoration-slate-400' :
                                        t.status === 'Pending' ? 'text-amber-500' :
                                            t.amount < 0 ? 'text-red-500' : 'text-emerald-600'
                                        }`}>
                                        {t.status === 'Failed' || t.status === 'Pending'
                                            ? `$${Math.abs(t.amount).toFixed(2)}`
                                            : t.amount < 0
                                                ? `-$${Math.abs(t.amount).toFixed(2)}`
                                                : `+$${Math.abs(t.amount).toFixed(2)}`
                                        }
                                    </div>
                                    <div className="text-sm text-slate-600 flex items-center gap-1">
                                        <CreditCard size={12} className="text-slate-400" /> {t.method}
                                    </div>
                                    <div className="flex justify-end">
                                        {getStatusBadge(t.status)}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full text-slate-400"
                        >
                            <Filter size={48} className="mb-4 opacity-20" />
                            <p>No transactions found matching your search.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer with Pagination */}
            <TableFooter
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredTransactions.length}
                onPageChange={setCurrentPage}
            />
        </motion.div>
    );



    return (
        <main className="p-8 max-w-[1600px] mx-auto space-y-8 min-h-screen bg-slate-50/50 relative overflow-hidden">
            {/* Background Gradients for Atmosphere */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl" />
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10">
                <div>
                    <h1 className="heading-sm tracking-tight text-3xl font-bold text-slate-900">Financial Overview</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Track revenue, manage expenses, and forecast growth.</p>
                </div>

                <div className="flex items-center bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-200/60">
                    {['Overview', 'Transactions', 'Banking'].map((tab) => {
                        const isActive = activeTab === tab.toLowerCase();
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-slate-900 rounded-xl shadow-lg shadow-slate-900/10 -z-10"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {tab === 'Banking' ? 'Banking & Payouts' : tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderOverview()}
                        </motion.div>
                    )}
                    {activeTab === 'transactions' && (
                        <motion.div
                            key="transactions"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderTransactions()}
                        </motion.div>
                    )}
                    {activeTab === 'banking' && (
                        <motion.div
                            key="banking"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <BankingTab />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
