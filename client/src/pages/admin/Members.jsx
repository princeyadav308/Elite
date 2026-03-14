import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, UserPlus, CheckSquare, X, ChevronLeft, ChevronRight, Edit, CreditCard, Lock, Trash2, MoreVertical, LogIn, Calendar, Mail, Phone } from 'lucide-react';
import MemberDetailView from './MemberDetailView';

// Mock Data
const membersData = [
    {
        id: 1,
        name: 'Alex Thompson',
        email: 'alex.t@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHQBiYk9hzoHiULDqxopiBX0DoD2FUg-B1y-L-B-KLBxZ9YVJg8D80jqZPQRj076mnz-CRIE4a4yq4yWfMAYqW-KKhQR5P-ChBc_AlZFQo0vEcNkdK6gdtoUidnqAtTOebwz4K9pasbvkjiT5g1K7h2cCRPw_mXpSuEAqrbZKZGA3YKoydqRtubztY18b2vZupnzAUYV2_66u4jE3NoUrtXNbtfIMaHcFmOgayIydR9QCop0srJYjnpoMdxz43THyKTwjjLzORFYyI',
        status: 'ACTIVE',
        plan: 'Platinum',
        renewalDate: 'Oct 12, 2026',
        lastVisit: '2 hours ago',
        phone: '+1 (555) 012-3456'
    },
    {
        id: 2,
        name: 'Marcus Chen',
        email: 'm.chen@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGCsMnAPX-0SHgN7JGNHQQsejLKtn95-zdds-2786ghkyqRb-WU5zOGKYHK_OhkjhojxuAKurIm1DITPtjA2fBZDlXAgyqrGb1CXAx-wUs8ArR20LRDoPZSIScGqTu4nTw2aPerw-5HQfWV9go-cWzaXElRkNm6kEssCChZZIOUyaPvrI1unz3NeknDbh2BVYPOUTKOyIVIvQw7e72T2PRqcKbgCBNjgh0adNBqHZT_hrq-PdHP15VoK5bG94s7qD_UAps9ZZKbzLY',
        status: 'ACTIVE',
        plan: 'Pro',
        renewalDate: 'Nov 05, 2026',
        lastVisit: 'Today, 09:15 AM',
        phone: '+1 (555) 234-5678'
    },
    {
        id: 3,
        name: 'Sarah Jenkins',
        email: 's.jenkins@example.com',
        initials: 'SJ',
        initialsColor: 'indigo',
        status: 'INACTIVE',
        plan: 'Basic',
        renewalDate: 'Aug 20, 2026',
        lastVisit: '12 days ago',
        phone: '+1 (555) 345-6789'
    },
    {
        id: 4,
        name: 'David Miller',
        email: 'david.m@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdPJ1HenhyfrJ6jl1vMLB0PuggNhpR8SUc1XWnjZwbeNjOJOy01bNdgShimWnQk92t_bo-RmiSmF-Dapre33oe7uXW6UO1L_FmLHPLnP0utw8GuGtNS57TCceMwMz9N91DzfF2Pwo2yZbZ8HwwNJbpGNvxuspk6pnqH724QZcJ8qfmG03S3NUdwR4IDhqEm506mOqoJNG-8X1aATzrT5DSf0Xc-LKL9NXPSM-nKbrsU4EzbQ_ZEXeQBxuty2eU8A2NNPEEEpwC6KuL',
        status: 'ACTIVE',
        plan: 'Platinum',
        renewalDate: 'Jan 15, 2027',
        lastVisit: 'Yesterday',
        phone: '+1 (555) 456-7890'
    },
    {
        id: 5,
        name: 'Elena Rodriguez',
        email: 'elena.rod@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkkWvkiZU-8wECxop_Ngq7FhugqWf69NI4JAJ0JRLxB_AUco_106hTPDbvhpW4AeG26eBLOZZDg-Eib8F9YSWa1awQWjUsZwb0GZF4mhv1XaF3sPS4N-_uGo4a052fkecQ7-6sbGVv5c-sEvmy7HPKet4vaU9solC9e0675sCqlhcwJbJ2aM3e4HAdBQ2hdjEEqY1iEswamjBMHKlsczOMm8SDOVNTdSSckFxaNjshTeb27xuxOwwD7ap2AD5YZHjHfmVxPfZ7XJIe',
        status: 'ACTIVE',
        plan: 'Pro',
        renewalDate: 'Sep 30, 2026',
        lastVisit: '3 days ago',
        phone: '+1 (555) 567-8901'
    },
    {
        id: 6,
        name: 'James Wilson',
        email: 'j.wilson@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9nCv1QSX03jWhJBltoPL3zbFYZUx5KXZ7kezWseJogp4sdw5q6RD6YgFAbdrQir29zQFbm4dpP1zkMsivo8HwMzAcEAC7KSOScozkxV_HyJJPu2HL6xftj9G57HUTTcJ1lJY0xveLJ088JqW8fTX2npuV0Q3B3QRn7bvot2_7qAefJJC1w2h0hqHDPHOcn3kpHhbw9DUtJeV-_YiNMysDF4DqrWIkMDzcCna0WmIxBIcLUkntxtMYtKM0vtKTTVhAAPcPKynkmpFl',
        status: 'ACTIVE',
        plan: 'Basic',
        renewalDate: 'Dec 01, 2026',
        lastVisit: 'Yesterday',
        phone: '+1 (555) 678-9012'
    },
    {
        id: 7,
        name: 'Lisa Huang',
        email: 'l.huang@example.com',
        initials: 'LH',
        initialsColor: 'orange',
        status: 'OVERDUE',
        plan: 'Pro',
        renewalDate: 'Jul 18, 2026',
        lastVisit: '22 days ago',
        phone: '+1 (555) 789-0123'
    },
    {
        id: 8,
        name: 'Ryan Patel',
        email: 'r.patel@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYq8KcCHEn62NdUJsNlqipCDmASW2gFdNMMgB0Kr_bpxhI9x-Eg2DEM_AfEsIeoy4IjtJymn9qphGqgzJXjpHyqMGpW_SP-wu2ue8vqUE2NIMc1yp-JSaD5UuauIz8isbknHy0XD0hf5XFmJ4GTzZNRuLvvM19pGQwCwnj4wAxZSU_SdBa7ThYxQ6CUTtu4e5az_G2c52Iu84-Hp3CUGhyJByF-krNiN5VuR_EEwIo6-NMvWyqwHNo1cX0t-gu_Ju1OTYj9vj6pptC',
        status: 'ACTIVE',
        plan: 'Platinum',
        renewalDate: 'Feb 10, 2027',
        lastVisit: 'Today, 11:30 AM',
        phone: '+1 (555) 890-1234'
    },
    {
        id: 9,
        name: 'Chloe Smith',
        email: 'c.smith@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHQBiYk9hzoHiULDqxopiBX0DoD2FUg-B1y-L-B-KLBxZ9YVJg8D80jqZPQRj076mnz-CRIE4a4yq4yWfMAYqW-KKhQR5P-ChBc_AlZFQo0vEcNkdK6gdtoUidnqAtTOebwz4K9pasbvkjiT5g1K7h2cCRPw_mXpSuEAqrbZKZGA3YKoydqRtubztY18b2vZupnzAUYV2_66u4jE3NoUrtXNbtfIMaHcFmOgayIydR9QCop0srJYjnpoMdxz43THyKTwjjLzORFYyI',
        status: 'ACTIVE',
        plan: 'Basic',
        renewalDate: 'Jan 22, 2027',
        lastVisit: '4 hours ago',
        phone: '+1 (555) 901-2345'
    },
    {
        id: 10,
        name: 'Tyler Garcia',
        email: 't.garcia@example.com',
        initials: 'TG',
        initialsColor: 'blue',
        status: 'INACTIVE',
        plan: 'Pro',
        renewalDate: 'Nov 15, 2026',
        lastVisit: '1 month ago',
        phone: '+1 (555) 012-3456'
    },
];

const sparklineHeights = ['40%', '60%', '30%', '85%', '55%', '75%', '95%', '45%', '65%', '100%', '80%', '90%'];

const statusClasses = {
    ACTIVE: 'bg-emerald-100 text-emerald-600',
    INACTIVE: 'bg-slate-100 text-slate-500',
    OVERDUE: 'bg-red-100 text-red-700 font-bold',
};

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const panelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
};

const popoverVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 }
};

const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, transformOrigin: "top right" },
    visible: { opacity: 1, scale: 1, transformOrigin: "top right" },
    exit: { opacity: 0, scale: 0.95, transformOrigin: "top right" }
};

export default function Members() {
    const [selectedMember, setSelectedMember] = useState(membersData[0]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail'

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        status: [],
        plan: []
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [activeMenuId, setActiveMenuId] = useState(null);

    // Filter Logic
    const filteredMembers = membersData.filter(m => {
        // Search Query Check
        const matchesSearch =
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase());

        // Active Status Check (OR logic within group)
        const matchesStatus = activeFilters.status.length === 0 || activeFilters.status.map(s => s.toUpperCase()).includes(m.status);

        // Active Plan Check (OR logic within group)
        const matchesPlan = activeFilters.plan.length === 0 || activeFilters.plan.includes(m.plan);

        return matchesSearch && matchesStatus && matchesPlan;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset pagination when search or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilters]);

    // Handlers
    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            // Only select filtered members
            setSelectedItems(filteredMembers.map(m => m.id));
        } else {
            setSelectedItems([]);
        }
    };

    const toggleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleSelectionModeToggle = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedItems([]);
    };

    const handleFilterChange = (category, value) => {
        setActiveFilters(prev => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    const clearFilters = () => {
        setActiveFilters({ status: [], plan: [] });
    };

    // Dynamic Grid Cols based on Selection Mode
    const gridCols = isSelectionMode
        ? "grid-cols-[50px_3fr_1.2fr_1.2fr_1.2fr_1.5fr_80px]"
        : "grid-cols-[3fr_1.2fr_1.2fr_1.2fr_1.5fr_80px]";

    const activeFilterCount = activeFilters.status.length + activeFilters.plan.length;

    if (viewMode === 'detail' && selectedMember) {
        return (
            <div className="p-8 max-w-[1600px] mx-auto min-h-screen relative">
                <MemberDetailView
                    member={selectedMember}
                    onBack={() => setViewMode('list')}
                />
            </div>
        );
    }

    return (
        <motion.main
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="p-8 max-w-[1600px] mx-auto min-h-screen relative"
            onClick={() => {
                if (showFilters) setShowFilters(false);
                if (activeMenuId) setActiveMenuId(null);
            }}
        >
            <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            >
                <div>
                    <h1 className="heading-sm tracking-tight text-3xl font-bold text-slate-900">Members</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage and monitor your gym community</p>
                </div>
                <div className="flex items-center gap-3 relative z-20">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#10b981] transition-colors" />
                        <input
                            className="pl-10 pr-4 py-2.5 bg-white/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#10b981] w-64 md:w-80 transition-all shadow-sm outline-none placeholder:text-slate-400"
                            placeholder="Search members..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowFilters(!showFilters);
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 border rounded-2xl text-sm font-semibold transition-all shadow-sm cursor-pointer ${showFilters || activeFilterCount > 0 ? 'bg-slate-100 border-slate-300' : 'bg-white/50 border-white/20 hover:bg-white'}`}
                    >
                        <Filter className={`w-4 h-4 ${activeFilterCount > 0 ? 'text-[#10b981]' : 'text-slate-500'}`} />
                        <span className="text-slate-700">Filter</span>
                        {activeFilterCount > 0 && (
                            <span className="bg-[#10b981] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
                                {activeFilterCount}
                            </span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                variants={popoverVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-14 right-40 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</h4>
                                        <div className="space-y-2">
                                            {['Active', 'Inactive', 'Overdue'].map(status => (
                                                <label key={status} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-slate-300 text-[#10b981] focus:ring-[#10b981]"
                                                        checked={activeFilters.status.includes(status)}
                                                        onChange={() => handleFilterChange('status', status)}
                                                    />
                                                    {status}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Plan</h4>
                                        <div className="space-y-2">
                                            {['Platinum', 'Pro', 'Basic'].map(plan => (
                                                <label key={plan} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-slate-300 text-[#10b981] focus:ring-[#10b981]"
                                                        checked={activeFilters.plan.includes(plan)}
                                                        onChange={() => handleFilterChange('plan', plan)}
                                                    />
                                                    {plan}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-slate-100 flex gap-2">
                                        <button
                                            onClick={clearFilters}
                                            className="flex-1 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="flex-1 py-2 bg-[#10b981] text-white rounded-xl text-sm font-semibold hover:brightness-105 shadow-lg shadow-emerald-500/20"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSelectionModeToggle}
                        className={`flex items-center gap-2 px-4 py-2.5 border rounded-2xl text-sm font-semibold transition-all shadow-sm cursor-pointer ${isSelectionMode ? 'bg-slate-100 border-slate-300 text-slate-900' : 'bg-white/50 border-white/20 text-slate-700 hover:bg-white'}`}
                    >
                        {isSelectionMode ? <X className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
                        <span>{isSelectionMode ? 'Cancel' : 'Select'}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#10b981] text-white rounded-2xl font-semibold hover:brightness-105 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add Member
                    </motion.button>
                </div>
            </motion.div>

            {/* Active Filters Pills */}
            <AnimatePresence>
                {activeFilterCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap items-center gap-2 mb-6"
                    >
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Active Filters:</span>
                        {activeFilters.status.map(status => (
                            <span key={status} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold flex items-center gap-1">
                                {status}
                                <button onClick={() => handleFilterChange('status', status)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                        {activeFilters.plan.map(plan => (
                            <span key={plan} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold flex items-center gap-1">
                                {plan} Plan
                                <button onClick={() => handleFilterChange('plan', plan)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                        <button onClick={clearFilters} className="text-xs text-[#10b981] font-semibold hover:underline ml-2">Clear All</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bulk Actions Bar */}
            <AnimatePresence>
                {selectedItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 50, x: "-50%" }}
                        className="fixed bottom-8 left-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-4 border border-slate-700/50 backdrop-blur-md"
                    >
                        <span className="font-semibold">{selectedItems.length} selected</span>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <button className="text-sm font-medium hover:text-emerald-400 transition-colors flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Email
                        </button>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <button className="text-sm font-medium hover:text-red-400 transition-colors flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-12 gap-8">
                {/* Members List - Grid Layout */}
                <div className="col-span-12 lg:col-span-8">
                    <motion.div
                        variants={containerVariants}
                        className="backdrop-blur-[12px] border border-white/20 bg-white/80 rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] min-h-[600px] flex flex-col"
                    >
                        {filteredMembers.length > 0 ? (
                            <>
                                <div className="min-w-[800px]">
                                    {/* Grid Header */}
                                    <div className={`grid ${gridCols} gap-4 px-6 py-5 border-b border-slate-100 bg-slate-50/50 items-center transition-all duration-300`}>
                                        <AnimatePresence initial={false}>
                                            {isSelectionMode && (
                                                <motion.div
                                                    initial={{ width: 0, opacity: 0 }}
                                                    animate={{ width: "auto", opacity: 1 }}
                                                    exit={{ width: 0, opacity: 0 }}
                                                    className="flex justify-center overflow-hidden"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded border-slate-300 text-[#10b981] focus:ring-[#10b981] cursor-pointer"
                                                        onChange={toggleSelectAll}
                                                        checked={selectedItems.length === filteredMembers.length && filteredMembers.length > 0}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Type</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Renewal Date</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Visit</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider"></div> {/* Actions Placeholder */}
                                    </div>

                                    {/* Grid Body */}
                                    <motion.div
                                        className="divide-y divide-slate-100"
                                        key={searchQuery + JSON.stringify(activeFilters) + currentPage}
                                        initial="hidden"
                                        animate="show"
                                        variants={containerVariants}
                                    >
                                        {paginatedMembers.map((m) => (
                                            <motion.div
                                                key={m.id}
                                                variants={itemVariants}
                                                onClick={() => setSelectedMember(m)}
                                                whileHover={{
                                                    scale: 1.01,
                                                    y: -2,
                                                    boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)",
                                                    backgroundColor: "rgba(16,185,129,0.05)",
                                                    zIndex: 10
                                                }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className={`grid ${gridCols} gap-4 px-6 py-4 cursor-pointer items-center transition-colors relative bg-white group ${selectedMember.id === m.id ? '!bg-emerald-50/30' : ''}`}
                                            >
                                                <AnimatePresence initial={false}>
                                                    {isSelectionMode && (
                                                        <motion.div
                                                            initial={{ width: 0, opacity: 0 }}
                                                            animate={{ width: "auto", opacity: 1 }}
                                                            exit={{ width: 0, opacity: 0 }}
                                                            className="flex justify-center overflow-hidden"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="w-4 h-4 rounded border-slate-300 text-[#10b981] focus:ring-[#10b981] cursor-pointer"
                                                                checked={selectedItems.includes(m.id)}
                                                                onChange={() => toggleSelectItem(m.id)}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        {m.avatar ? (
                                                            <img alt="Member" className="w-10 h-10 rounded-full object-cover" src={m.avatar} />
                                                        ) : (
                                                            <div className={`w-10 h-10 rounded-full bg-${m.initialsColor}-100 flex items-center justify-center text-${m.initialsColor}-600 font-bold text-xs`}>{m.initials}</div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900 group-hover:text-[#10b981] transition-colors">{m.name}</p>
                                                            <p className="text-[11px] text-slate-500">{m.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${statusClasses[m.status]}`}>{m.status}</span>
                                                </div>
                                                <div><span className="text-sm font-medium text-slate-700">{m.plan}</span></div>
                                                <div><span className="text-sm text-slate-500 font-medium">{m.renewalDate}</span></div>
                                                <div>
                                                    <span className={`text-sm ${m.lastVisit.includes('Today') ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                                                        {m.lastVisit}
                                                    </span>
                                                </div>

                                                {/* Quick Actions & Menu */}
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 text-[#10b981] hover:bg-[#10b981] hover:text-white transition-colors"
                                                        title="Check-in"
                                                    >
                                                        <LogIn className="w-4 h-4" />
                                                    </motion.button>
                                                    <div className="relative">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveMenuId(activeMenuId === m.id ? null : m.id);
                                                            }}
                                                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${activeMenuId === m.id ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </motion.button>

                                                        <AnimatePresence>
                                                            {activeMenuId === m.id && (
                                                                <motion.div
                                                                    variants={menuVariants}
                                                                    initial="hidden"
                                                                    animate="visible"
                                                                    exit="exit"
                                                                    className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 overflow-hidden"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                        <Edit className="w-4 h-4 text-slate-400" /> Edit Profile
                                                                    </button>
                                                                    <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                        <CreditCard className="w-4 h-4 text-slate-400" /> Renew Membership
                                                                    </button>
                                                                    <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                        <Lock className="w-4 h-4 text-slate-400" /> Freeze Account
                                                                    </button>
                                                                    <div className="h-px bg-slate-100 my-1"></div>
                                                                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                                        <Trash2 className="w-4 h-4 text-red-500" /> Delete Member
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Pagination */}
                                <div className="px-6 py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 mt-auto">
                                    <p className="text-sm font-medium text-slate-500">
                                        Showing <span className="text-slate-800 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="text-slate-800 font-bold">{Math.min(currentPage * itemsPerPage, filteredMembers.length)}</span> of <span className="text-slate-800 font-bold">{filteredMembers.length}</span> members
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-[#10b981] transition-all disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </motion.button>
                                        <div className="flex items-center gap-1.5">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <motion.button
                                                    key={page}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${currentPage === page ? 'bg-[#10b981] text-white shadow-md shadow-emerald-500/20' : 'hover:bg-slate-100 text-slate-600'}`}
                                                >
                                                    {page}
                                                </motion.button>
                                            ))}
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#10b981] transition-all disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <Search className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">No members found</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any members matching your search or filters.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); clearFilters(); }}
                                    className="mt-6 px-6 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Member Detail Panel */}
                <div className="col-span-12 lg:col-span-4 translate-y-0">
                    <div className="sticky top-28 perspective-[1000px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedMember.email}
                                variants={panelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="backdrop-blur-[12px] border border-white/20 bg-white/80 p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
                            >
                                <div className="flex flex-col items-center text-center mb-8">
                                    <div className="relative mb-6 group">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#10b981] to-indigo-500"
                                        >
                                            {selectedMember.avatar ? (
                                                <img alt="Selected Member" className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl" src={selectedMember.avatar} />
                                            ) : (
                                                <div className={`w-full h-full rounded-full bg-${selectedMember.initialsColor}-100 flex items-center justify-center text-${selectedMember.initialsColor}-600 font-bold text-3xl border-4 border-white shadow-xl`}>{selectedMember.initials}</div>
                                            )}
                                        </motion.div>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 15 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:text-[#10b981] transition-colors cursor-pointer"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="heading-xs text-xl font-bold text-slate-900"
                                    >
                                        {selectedMember.name}
                                    </motion.h2>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center gap-2 mt-2"
                                    >
                                        <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded-full uppercase tracking-widest">{selectedMember.plan} Member</span>
                                    </motion.div>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <a href={`mailto:${selectedMember.email}`} className="block">
                                            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 p-4 rounded-2xl h-full border border-transparent hover:border-slate-200 transition-colors">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                                                <p className="text-xs font-bold truncate text-slate-700">{selectedMember.email}</p>
                                            </motion.div>
                                        </a>
                                        <a href={`tel:${selectedMember.phone}`} className="block">
                                            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 p-4 rounded-2xl h-full border border-transparent hover:border-slate-200 transition-colors">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                                                <p className="text-xs font-bold text-slate-700">{selectedMember.phone}</p>
                                            </motion.div>
                                        </a>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-4">
                                            <div>
                                                <h4 className="font-semibold text-sm text-slate-800">Workout Consistency</h4>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Last 14 Days</p>
                                            </div>
                                            <span className="text-[#10b981] font-bold text-sm">+24%</span>
                                        </div>
                                        <div className="flex items-end gap-1.5 h-16 px-1">
                                            {sparklineHeights.map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: h, opacity: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.05), duration: 0.5, type: "spring" }}
                                                    className={`w-full rounded-t-lg transition-[height] duration-300 ${[3, 6, 9, 11].includes(i) ? 'bg-[#10b981]' : 'bg-emerald-100'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm mb-4 text-slate-800">Recent Activity</h4>
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="show"
                                            className="space-y-3"
                                        >
                                            <motion.div variants={itemVariants} className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl border border-white/20">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                    <LogIn className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">Checked in</p>
                                                    <p className="text-[10px] text-slate-400">2 hours ago • Main Gym</p>
                                                </div>
                                            </motion.div>
                                            <motion.div variants={itemVariants} className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl border border-white/20">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">Booked Yoga Class</p>
                                                    <p className="text-[10px] text-slate-400">Yesterday, 04:30 PM • Sarah J.</p>
                                                </div>
                                            </motion.div>
                                            <motion.div variants={itemVariants} className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl border border-white/20">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                    <span className="material-symbols-outlined text-sm leading-none">payments</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">Renewal Paid</p>
                                                    <p className="text-[10px] text-slate-400">Oct 12, 2023 • $99.00</p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setViewMode('detail')}
                                        className="w-full py-4 bg-transparent border border-slate-200 text-slate-900 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                        Full History
                                    </motion.button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
