import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusCircle,
    MinusCircle,
    TrendingUp,
    ChevronDown,
    Building2,
    Store,
    Users,
    Tag,
    UserCircle2,
    Wand2,
    Trophy,
    ThumbsUp,
    AlertTriangle,
    ArrowRight,
    Loader2
} from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- MOVED OUTSIDE: Helper Components ---
// Moving these outside prevents React from re-rendering the entire DOM node 
// on every state change, fixing the slider drag issue.

const Slider = ({ label, value, min, max, onChange, unit = '' }) => (
    <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
            <label className="text-slate-500 font-medium text-sm">{label}</label>
            <span className="text-2xl font-bold text-emerald-500 tracking-tight">
                {unit}{typeof value === 'number' ? value.toLocaleString() : value}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            // Added w-full to ensure it fills the container
            className="elite-range w-full focus:outline-none cursor-pointer"
        />
    </div>
);

const AccordionItem = ({ title, icon, colorClass, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-600 hover:bg-slate-100/50 transition-colors"
            >
                <span className="flex items-center gap-2">
                    {React.cloneElement(icon, { className: `w-5 h-5 ${colorClass}` })}
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 grid grid-cols-2 gap-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NumberInput = ({ label, value, onChange, prefix }) => (
    <div>
        <label className="block text-slate-400 text-xs font-bold uppercase mb-1">{label}</label>
        <div className="relative">
            {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    {prefix}
                </span>
            )}
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={`w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all ${prefix ? 'pl-7' : ''}`}
            />
        </div>
    </div>
);

// --- MAIN COMPONENT ---
const RevenueCalculator = () => {
    // --- State: Core Metrics ---
    const [members, setMembers] = useState(250);
    const [price, setPrice] = useState(59);
    const [baseExpenses, setBaseExpenses] = useState(4500); // Total Monthly Expenses

    // --- State: Additional Inputs ---
    const [addRev, setAddRev] = useState({ pt: 0, merch: 0, locker: 0, guest: 0 });
    const [addExp, setAddExp] = useState({ rent: 2000, staff: 1500, marketing: 500, maint: 500 });
    const [growth, setGrowth] = useState({ newMembers: 15, churnedMembers: 4 });

    // --- State: Calculated Results ---
    const [results, setResults] = useState({
        grossIncome: 0,
        totalExpenses: 0,
        monthlyProfit: 0,
        profitMargin: 0,
        growthRate: 0,
        chartData: [1, 1]
    });

    // --- State: UI Controls ---
    const [showAI, setShowAI] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const aiSectionRef = useRef(null);

    // --- Handlers: Synchronization Logic ---

    // Scenario A: User drags slider -> Update Total directly
    const handleSliderExpenseChange = (val) => {
        setBaseExpenses(val);
    };

    // Scenario B: User types in Inputs -> Update Detail AND Total
    const handleDetailExpenseChange = (key, val) => {
        const newExp = { ...addExp, [key]: val };
        setAddExp(newExp);
        const newTotal = Object.values(newExp).reduce((a, b) => a + Number(b), 0);
        setBaseExpenses(newTotal); // Sync Slider
    };

    // --- Logic: Real-Time Calculation Engine ---
    useEffect(() => {
        const totalAddRev = Object.values(addRev).reduce((a, b) => a + Number(b), 0);

        const grossIncome = (members * price) + totalAddRev;
        const totalExpenses = baseExpenses;
        const monthlyProfit = grossIncome - totalExpenses;

        // Margin
        let profitMargin = 0;
        if (grossIncome > 0) profitMargin = (monthlyProfit / grossIncome) * 100;

        // Growth
        const netGrowth = growth.newMembers - growth.churnedMembers;
        let growthRate = 0;
        if (members > 0) growthRate = (netGrowth / members) * 100;

        // Chart Data
        let chartValues = [];
        if (monthlyProfit < 0) {
            chartValues = [totalExpenses, 0];
        } else {
            chartValues = [totalExpenses, monthlyProfit];
        }

        setResults({
            grossIncome,
            totalExpenses,
            monthlyProfit,
            profitMargin,
            growthRate,
            chartData: chartValues
        });

    }, [members, price, baseExpenses, addRev, growth]);

    // --- Logic: AI Recommendations ---
    const handleAnalyzeStrategy = () => {
        setIsAnalyzing(true);
        setShowAI(false);

        setTimeout(() => {
            const recs = [];
            const { grossIncome } = results;
            const staffCost = Number(addExp.staff);
            const ancRev = Number(addRev.pt) + Number(addRev.merch);

            // 1. Pricing
            if (price < 45) {
                const potentialRev = members * 10;
                recs.push({
                    title: "Pricing Opportunity",
                    icon: <Tag className="w-5 h-5 text-blue-500" />,
                    color: "bg-blue-50 text-blue-500",
                    desc: `Your average price ($${price}) is below the $55 industry standard.`,
                    action: `Increase by $10 to add $${potentialRev.toLocaleString()}/mo in revenue.`,
                    btn: "Simulate Price Hike"
                });
            }

            // 2. Growth / Capacity
            if (members < 300) {
                recs.push({
                    title: "Capacity Utilization",
                    icon: <Users className="w-5 h-5 text-purple-500" />,
                    color: "bg-purple-50 text-purple-500",
                    desc: "You are likely under 60% capacity (assuming 500 cap).",
                    action: "Launch a referral program (Refer-a-friend gets 1 month free) to fill spots without ad spend.",
                    btn: "Setup Referral Program"
                });
            }

            // 3. Staff Costs
            if (staffCost > 0 && staffCost > (grossIncome * 0.4)) {
                recs.push({
                    title: "High Staff Costs",
                    icon: <UserCircle2 className="w-5 h-5 text-orange-500" />,
                    color: "bg-orange-50 text-orange-500",
                    desc: `Staff costs are ${(staffCost / grossIncome * 100).toFixed(0)}% of revenue (Target: 25-30%).`,
                    action: "Shift trainers to a commission-based hybrid model to lower fixed overhead.",
                    btn: "View Compensation Models"
                });
            }

            // 4. Ancillary Revenue
            if (ancRev < (grossIncome * 0.15)) {
                recs.push({
                    title: "Boost Secondary Revenue",
                    icon: <Store className="w-5 h-5 text-emerald-500" />,
                    color: "bg-emerald-50 text-emerald-500",
                    desc: "Merch & PT make up less than 15% of your income.",
                    action: "Place supplements at the front desk or bundle PT sessions with memberships.",
                    btn: "Inventory Ideas"
                });
            }

            // Default
            if (recs.length === 0) {
                recs.push({
                    title: "Expansion Ready",
                    icon: <Building2 className="w-5 h-5 text-emerald-600" />,
                    color: "bg-emerald-50 text-emerald-600",
                    desc: "Your metrics indicate you are ready to scale.",
                    action: "Consider looking for a second location or franchising.",
                    btn: "Expansion Calculator"
                });
            }

            setRecommendations(recs);
            setIsAnalyzing(false);
            setShowAI(true);

            setTimeout(() => {
                aiSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }, 1500);
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div>
                    <h1 className="heading-sm tracking-tight text-3xl font-bold text-slate-900">Revenue Calculator</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Interactive breakdown & profitability engine</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- LEFT PANEL: INPUTS --- */}
                <div className="lg:col-span-5 space-y-8 bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl shadow-slate-200/50 h-fit">

                    {/* Core Metrics */}
                    <div className="space-y-4">
                        <Slider label="Total Active Members" value={members} min={0} max={1000} onChange={setMembers} />
                        <Slider label="Avg. Plan Price ($)" value={price} min={10} max={200} onChange={setPrice} unit="$" />
                        <Slider label="Monthly Expenses ($)" value={baseExpenses} min={0} max={20000} onChange={handleSliderExpenseChange} unit="$" />
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Advanced Accordions */}
                    <div className="space-y-3">
                        <AccordionItem title="Additional Revenue" icon={<PlusCircle />} colorClass="text-emerald-500">
                            <NumberInput label="Personal Training" value={addRev.pt} onChange={(v) => setAddRev({ ...addRev, pt: v })} prefix="$" />
                            <NumberInput label="Merchandise" value={addRev.merch} onChange={(v) => setAddRev({ ...addRev, merch: v })} prefix="$" />
                            <NumberInput label="Locker Rentals" value={addRev.locker} onChange={(v) => setAddRev({ ...addRev, locker: v })} prefix="$" />
                            <NumberInput label="Guest Passes" value={addRev.guest} onChange={(v) => setAddRev({ ...addRev, guest: v })} prefix="$" />
                        </AccordionItem>

                        <AccordionItem title="Expense Breakdown" icon={<MinusCircle />} colorClass="text-rose-500">
                            <div className="col-span-2 text-xs text-slate-400 italic mb-2">*Updates total expenses automatically</div>
                            <NumberInput label="Rent / Utilities" value={addExp.rent} onChange={(v) => handleDetailExpenseChange('rent', v)} prefix="$" />
                            <NumberInput label="Staff Salaries" value={addExp.staff} onChange={(v) => handleDetailExpenseChange('staff', v)} prefix="$" />
                            <NumberInput label="Marketing" value={addExp.marketing} onChange={(v) => handleDetailExpenseChange('marketing', v)} prefix="$" />
                            <NumberInput label="Maintenance" value={addExp.maint} onChange={(v) => handleDetailExpenseChange('maint', v)} prefix="$" />
                        </AccordionItem>

                        <AccordionItem title="Growth Context" icon={<TrendingUp />} colorClass="text-blue-500">
                            <NumberInput label="New Members (MoM)" value={growth.newMembers} onChange={(v) => setGrowth({ ...growth, newMembers: v })} />
                            <NumberInput label="Churned Members (Count)" value={growth.churnedMembers} onChange={(v) => setGrowth({ ...growth, churnedMembers: v })} />
                        </AccordionItem>
                    </div>
                </div>

                {/* --- RIGHT PANEL: VISUALIZATION --- */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col justify-between min-h-[500px]">

                        {/* Chart Logic */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8 flex-1">
                            <div className="relative w-64 h-64">
                                <Doughnut
                                    data={{
                                        labels: ['Expenses', 'Profit'],
                                        datasets: [{
                                            data: results.chartData,
                                            backgroundColor: results.monthlyProfit < 0 ? ['#f43f5e', '#e2e8f0'] : ['#c7d2fe', '#4f46e5'],
                                            borderWidth: 0,
                                        }]
                                    }}
                                    options={{
                                        cutout: '75%',
                                        plugins: { legend: { display: false }, tooltip: { enabled: true } },
                                        responsive: true,
                                        maintainAspectRatio: false
                                    }}
                                />
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-slate-400 text-sm font-medium">Net Profit</span>
                                    <span className={`text-2xl font-bold ${results.monthlyProfit < 0 ? 'text-rose-500' : 'text-slate-800'}`}>
                                        ${results.monthlyProfit.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Legend & Metrics */}
                            <div className="space-y-6 w-full md:w-auto">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${results.monthlyProfit < 0 ? 'bg-rose-500' : 'bg-indigo-200'}`} />
                                            <span className="text-slate-500 font-medium">Expenses</span>
                                        </div>
                                        <span className="font-bold text-slate-700">${results.totalExpenses.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${results.monthlyProfit < 0 ? 'bg-slate-200' : 'bg-indigo-600'}`} />
                                            <span className="text-slate-500 font-medium">Profit</span>
                                        </div>
                                        <span className={`font-bold ${results.monthlyProfit < 0 ? 'text-rose-500' : 'text-slate-700'}`}>
                                            ${results.monthlyProfit.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                <div className="flex justify-between items-center gap-8">
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Profit Margin</p>
                                        <p className={`text-2xl font-bold ${results.profitMargin >= 20 ? 'text-emerald-500' : (results.profitMargin > 0 ? 'text-amber-500' : 'text-rose-500')}`}>
                                            {results.profitMargin.toFixed(1)}%
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Member Growth</p>
                                        <p className={`text-2xl font-bold ${results.growthRate >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {results.growthRate > 0 ? '+' : ''}{results.growthRate.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Summary Bar */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Gross Income</p>
                                <p className="text-xl md:text-2xl font-bold text-slate-800">${results.grossIncome.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Total Expenses</p>
                                <p className="text-xl md:text-2xl font-bold text-slate-800">${results.totalExpenses.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Est. Monthly Profit</p>
                                <p className="text-xl md:text-2xl font-bold text-slate-800">${results.monthlyProfit.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* AI Trigger */}
                        <button
                            onClick={handleAnalyzeStrategy}
                            disabled={isAnalyzing}
                            className={`w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 ${isAnalyzing ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Analyzing business model...
                                </>
                            ) : (
                                <>
                                    <Wand2 size={20} />Analyze & Generate Strategy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- AI RECOMMENDATIONS SECTION --- */}
            <AnimatePresence>
                {showAI && (
                    <motion.div
                        ref={aiSectionRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="max-w-7xl mx-auto pb-20 pt-8"
                    >
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Wand2 className="text-indigo-500" /> AI Analysis & Recommendations
                        </h2>

                        {/* Banner */}
                        <div className={`p-6 rounded-2xl mb-8 flex items-center gap-4 text-white font-medium shadow-lg
                            ${results.profitMargin > 30 ? 'bg-emerald-500 shadow-emerald-500/20' :
                                results.profitMargin > 15 ? 'bg-amber-500 shadow-amber-500/20' :
                                    'bg-rose-500 shadow-rose-500/20'}`
                        }>
                            {results.profitMargin > 30 ? (
                                <>
                                    <Trophy size={32} />
                                    <div>
                                        <p className="font-bold text-lg">Excellent Health!</p>
                                        <p className="text-sm opacity-90">Your gym is performing in the top tier of profitability.</p>
                                    </div>
                                </>
                            ) : results.profitMargin > 15 ? (
                                <>
                                    <ThumbsUp size={32} />
                                    <div>
                                        <p className="font-bold text-lg">Good Stability</p>
                                        <p className="text-sm opacity-90">Profitable, but there is room for optimization.</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle size={32} />
                                    <div>
                                        <p className="font-bold text-lg">Optimization Needed</p>
                                        <p className="text-sm opacity-90">Profit margins are critically low. Action required.</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendations.map((rec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rec.color.split(' ')[0]}`}>
                                            {rec.icon}
                                        </div>
                                        <h3 className="font-bold text-slate-800">{rec.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4 h-10">{rec.desc}</p>
                                    <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-lg mb-4 border-l-4 border-emerald-400 font-medium">
                                        <span dangerouslySetInnerHTML={{ __html: rec.action }}></span>
                                    </p>
                                    <button className="text-xs font-bold text-emerald-500 uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                                        {rec.btn} <ArrowRight size={12} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RevenueCalculator;