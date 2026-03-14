import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, UserPlus, MoreVertical, Edit, Mail, Calendar,
    Trash2, Shield, Wrench, Eye, EyeOff, CheckCircle2, AlertCircle,
    Dumbbell, Clock, Briefcase, ChevronLeft, ChevronRight, Ban,
    Activity, History, FileText, Phone
} from 'lucide-react';
import AddStaff from './AddStaff';
import AddEquipment from './AddEquipment';
import TableFooter from '../../components/TableFooter';

// Mock Data - Expanded for Stress Testing (Phase 6.4)
const initialStaffData = [
    {
        id: 1,
        name: 'Marcus Sterling',
        role: 'Senior Personal Trainer',
        dept: 'Fitness',
        status: 'ACTIVE',
        hours: '38 hrs',
        nextShift: 'Today, 02:00 PM',
        email: 'marcus.s@example.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9nCv1QSX03jWhJBltoPL3zbFYzUx5KXZ7kezWseJogp4sdw5q6RD6YgFAbdrQir29zQFbm4dpP1zkMsivo8HwMzAcEAC7KSOScozkxV_HyJJPu2HL6xftj9G57HUTTcJ1lJY0xveLJ088JqW8fTX2npuV0Q3B3QRn7bvot2_7qAefJJC1w2h0hqHDPHOcn3kpHhbw9DUtJeV-_YiNMysDF4DqrWIkMDzcCna0WmIxBIcLUkntxtMYtKM0vtKTTVhAAPcPKynkmpFl',
        certs: ['NASM-CPT', 'CrossFit L2', 'CPR/AED'],
        classes: [
            { name: 'HIIT Blast', schedule: 'Mon, Wed • 08:00 AM', icon: 'fitness_center', color: 'emerald', capacity: '12/15' },
            { name: 'Strength Basics', schedule: 'Tue, Thu • 05:30 PM', icon: 'exercise', color: 'indigo', capacity: '8/10' }
        ],
        pay: '$1,250.00',
        rating: '4.9/5'
    },
    {
        id: 2,
        name: 'Sophia Reynolds',
        role: 'Front Desk Lead',
        dept: 'Admin',
        status: 'ACTIVE',
        hours: '40 hrs',
        nextShift: 'Tomorrow, 09:00 AM',
        email: 'sophia.r@example.com',
        phone: '+1 (555) 987-6543',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHQBiYk9hzoHiULDqxopiBX0DoD2FUg-B1y-L-B-KLBxZ9YVJg8D80jqZPQRj076mnz-CRIE4a4yq4yWfMAYqW-KKhQR5P-ChBc_AlZFQo0vEcNkdK6gdtoUidnqAtTOebwz4K9pasbvkjiT5g1K7h2cCRPw_mXpSuEAqrbZKZGA3YKoydqRtubztY18b2vZupnzAUYV2_66u4jE3NoUrtXNbtfIMaHcFmOgayIydR9QCop0srJYjnpoMdxz43THyKTwjjLzORFYyI',
        certs: ['First Aid', 'Customer Service Pro'],
        classes: [],
        pay: '$980.00',
        rating: '4.7/5'
    },
    {
        id: 3,
        name: 'Jordan Rivera',
        role: 'Maintenance Supervisor',
        dept: 'Maintenance',
        status: 'ON LEAVE',
        hours: '0 hrs',
        nextShift: 'Returning Oct 20',
        email: 'jordan.r@example.com',
        phone: '+1 (555) 456-7890',
        initials: 'JR',
        initialsColor: 'orange',
        certs: ['Facility Management', 'OSHA'],
        classes: [],
        pay: '$1,100.00',
        rating: '4.5/5'
    },
    {
        id: 4,
        name: 'Sarah Jenkins',
        role: 'Yoga Specialist',
        dept: 'Fitness',
        status: 'ACTIVE',
        hours: '24 hrs',
        nextShift: 'Today, 04:00 PM',
        email: 'sarah.j@example.com',
        initials: 'SJ',
        initialsColor: 'purple',
        certs: ['RYT-200', 'Meditation'],
        classes: [{ name: 'Sunset Yoga', schedule: 'Mon, Fri • 06:00 PM', icon: 'self_improvement', color: 'purple', capacity: '15/15' }],
        pay: '$850.00',
        rating: '4.8/5'
    },
    {
        id: 5,
        name: 'Mike Ross',
        role: 'Strength Coach',
        dept: 'Fitness',
        status: 'ACTIVE',
        hours: '30 hrs',
        nextShift: 'Tomorrow, 06:00 AM',
        email: 'mike.r@example.com',
        avatar: 'https://i.pravatar.cc/150?u=mike',
        certs: ['CSCS', 'Powerlifting'],
        classes: [],
        pay: '$1,050.00',
        rating: '4.9/5'
    },
    {
        id: 6,
        name: 'Jessica Pearson',
        role: 'Front Desk Associate',
        dept: 'Admin',
        status: 'ACTIVE',
        hours: '20 hrs',
        nextShift: 'Tomorrow, 02:00 PM',
        email: 'jessica.p@example.com',
        initials: 'JP',
        initialsColor: 'blue',
        certs: ['First Aid'],
        classes: [],
        pay: '$400.00',
        rating: '4.6/5'
    },
    {
        id: 7,
        name: 'Tom Wambsgans',
        role: 'Front Desk Associate',
        dept: 'Admin',
        status: 'ACTIVE',
        hours: '25 hrs',
        nextShift: 'Sat, 08:00 AM',
        email: 'tom.w@example.com',
        initials: 'TW',
        initialsColor: 'cyan',
        certs: [],
        classes: [],
        pay: '$500.00',
        rating: '4.4/5'
    },
    {
        id: 8,
        name: 'Carlos Rodriguez',
        role: 'Maintenance Technician',
        dept: 'Maintenance',
        status: 'ACTIVE',
        hours: '40 hrs',
        nextShift: 'Today, 01:00 PM',
        email: 'carlos.r@example.com',
        initials: 'CR',
        initialsColor: 'slate',
        certs: ['HVAC', 'Electrical'],
        classes: [],
        pay: '$950.00',
        rating: '4.8/5'
    },
    {
        id: 9,
        name: 'David Wallace',
        role: 'Gym Manager',
        dept: 'Management',
        status: 'ACTIVE',
        hours: '45 hrs',
        nextShift: 'Mon, 09:00 AM',
        email: 'david.w@example.com',
        avatar: 'https://i.pravatar.cc/150?u=david',
        certs: ['MBA'],
        classes: [],
        pay: '$2,500.00',
        rating: '5.0/5'
    },
    {
        id: 10,
        name: 'Emily Blunt',
        role: 'Pilates Instructor',
        dept: 'Fitness',
        status: 'ACTIVE',
        hours: '12 hrs',
        nextShift: 'Tue, 10:00 AM',
        email: 'emily.b@example.com',
        initials: 'EB',
        initialsColor: 'pink',
        certs: ['Stott Pilates'],
        classes: [],
        pay: '$600.00',
        rating: '4.9/5'
    },
    {
        id: 11,
        name: 'John Wick',
        role: 'Security Lead',
        dept: 'Operations',
        status: 'ACTIVE',
        hours: '40 hrs',
        nextShift: 'Tonight, 10:00 PM',
        email: 'john.w@example.com',
        avatar: 'https://i.pravatar.cc/150?u=john',
        certs: ['Security', 'K9 Handling'],
        classes: [],
        pay: '$1,200.00',
        rating: '5.0/5'
    },
    {
        id: 12,
        name: 'Robert California',
        role: 'Sales Manager',
        dept: 'Sales',
        status: 'ACTIVE',
        hours: '35 hrs',
        nextShift: 'Mon, 11:00 AM',
        email: 'robert.c@example.com',
        initials: 'RC',
        initialsColor: 'indigo',
        certs: ['Salesforce'],
        classes: [],
        pay: '$2,000.00',
        rating: '4.3/5'
    },
];

// Phase 6.5 - Expanded Equipment Data with Intelligence
const initialEquipmentData = [
    {
        id: 1,
        assetId: 'C-042',
        name: 'Pro-Tread X100',
        zone: 'Cardio Zone',
        icon: 'directions_run',
        iconColor: 'blue',
        qty: '12 Units',
        lastMaint: 'Oct 12, 2023',
        nextService: 'Jan 12, 2024',
        working: true,
        usage: '8.2 Hrs',
        uptime: '99%',
        age: '1.5 Yrs',
        warranty: { status: 'Active', expires: 'Nov 2026', timeText: '8 Months left' },
        vendor: 'Technogym Support (+1-800-555-0199)',
        logs: [
            { type: 'Routine Inspection', date: 'Oct 12, 2023', user: 'Mike Ross', icon: 'check_circle' },
            { type: 'Belt Replacement', date: 'Feb 10, 2023', user: 'Technogym', icon: 'build' }
        ]
    },
    {
        id: 2,
        assetId: 'F-105',
        name: 'Hex Dumbbell Set',
        zone: 'Free Weights',
        icon: 'fitness_center',
        iconColor: 'indigo',
        qty: '24 Pairs',
        lastMaint: 'Jan 05, 2024',
        nextService: 'Jul 05, 2024',
        working: true,
        usage: 'N/A',
        uptime: '100%',
        age: '3.0 Yrs',
        warranty: { status: 'Expired', expires: 'Jan 2023', timeText: 'Expired' },
        vendor: 'Rogue Fitness',
        logs: [
            { type: 'Inventory Check', date: 'Jan 05, 2024', user: 'David Wallace', icon: 'inventory' }
        ]
    },
    {
        id: 3,
        assetId: 'S-201',
        name: 'Lat Pulldown Machine',
        zone: 'Strength Training',
        icon: 'back_hand',
        iconColor: 'orange',
        qty: '4 Units',
        lastMaint: 'Feb 20, 2024',
        nextService: 'Overdue',
        working: false,
        usage: '6.5 Hrs',
        uptime: '92%',
        age: '2.5 Yrs',
        warranty: { status: 'Active', expires: 'Dec 2025', timeText: '22 Months left' },
        vendor: 'LifeFitness Support',
        logs: [
            { type: 'Cable Issue Reported', date: 'Feb 20, 2024', user: 'Member Report', icon: 'report_problem' },
            { type: 'Routine Inspection', date: 'Jan 15, 2024', user: 'Carlos Rodriguez', icon: 'check_circle' }
        ]
    },
    {
        id: 4,
        assetId: 'C-045',
        name: 'Elliptical E500',
        zone: 'Cardio Zone',
        icon: 'directions_run',
        iconColor: 'blue',
        qty: '8 Units',
        lastMaint: 'Nov 15, 2023',
        nextService: 'Feb 15, 2024',
        working: true,
        usage: '5.4 Hrs',
        uptime: '98%',
        age: '1.2 Yrs',
        warranty: { status: 'Active', expires: 'Nov 2026', timeText: '8 Months left' },
        vendor: 'Technogym Support',
        logs: []
    },
    {
        id: 5,
        assetId: 'C-050',
        name: 'Rower R200',
        zone: 'Cardio Zone',
        icon: 'rowing',
        iconColor: 'blue',
        qty: '6 Units',
        lastMaint: 'Dec 01, 2023',
        nextService: 'Mar 01, 2024',
        working: true,
        usage: '4.1 Hrs',
        uptime: '99%',
        age: '1.5 Yrs',
        warranty: { status: 'Active', expires: 'Dec 2025', timeText: '10 Months left' },
        vendor: 'Concept2',
        logs: []
    },
    {
        id: 6,
        assetId: 'S-205',
        name: 'Smith Machine',
        zone: 'Strength Training',
        icon: 'fitness_center',
        iconColor: 'orange',
        qty: '3 Units',
        lastMaint: 'Jan 10, 2024',
        nextService: 'Apr 10, 2024',
        working: true,
        usage: '9.0 Hrs',
        uptime: '95%',
        age: '4.0 Yrs',
        warranty: { status: 'Expired', expires: 'Jan 2022', timeText: 'Expired' },
        vendor: 'Hammer Strength',
        logs: []
    },
    {
        id: 7,
        assetId: 'S-208',
        name: 'Leg Press LP40',
        zone: 'Strength Training',
        icon: 'fitness_center',
        iconColor: 'orange',
        qty: '4 Units',
        lastMaint: 'Jan 12, 2024',
        nextService: 'Apr 12, 2024',
        working: true,
        usage: '7.5 Hrs',
        uptime: '99%',
        age: '3.5 Yrs',
        warranty: { status: 'Expired', expires: 'Jan 2023', timeText: 'Expired' },
        vendor: 'Hammer Strength',
        logs: []
    },
    {
        id: 8,
        assetId: 'S-212',
        name: 'Cable Crossover',
        zone: 'Strength Training',
        icon: 'fitness_center',
        iconColor: 'orange',
        qty: '2 Units',
        lastMaint: 'Feb 01, 2024',
        nextService: 'May 01, 2024',
        working: true,
        usage: '10.5 Hrs',
        uptime: '97%',
        age: '2.0 Yrs',
        warranty: { status: 'Active', expires: 'Feb 2025', timeText: '12 Months left' },
        vendor: 'LifeFitness',
        logs: []
    },
    {
        id: 9,
        assetId: 'F-120',
        name: 'Kettlebell Set',
        zone: 'Functional Area',
        icon: 'fitness_center',
        iconColor: 'indigo',
        qty: '15 Units',
        lastMaint: 'Dec 20, 2023',
        nextService: 'Jun 20, 2024',
        working: true,
        usage: 'N/A',
        uptime: '100%',
        age: '1.0 Yrs',
        warranty: { status: 'Active', expires: 'Dec 2028', timeText: '4 Years left' },
        vendor: 'Rogue Fitness',
        logs: []
    },
    {
        id: 10,
        assetId: 'F-125',
        name: 'Battle Ropes',
        zone: 'Functional Area',
        icon: 'waves',
        iconColor: 'indigo',
        qty: '4 Sets',
        lastMaint: 'Jan 15, 2024',
        nextService: 'Apr 15, 2024',
        working: true,
        usage: '3.2 Hrs',
        uptime: '90%',
        age: '0.8 Yrs',
        warranty: { status: 'Active', expires: 'Jan 2025', timeText: '11 Months left' },
        vendor: 'Onnit',
        logs: []
    },
    {
        id: 11,
        assetId: 'Z-001',
        name: 'Sauna A',
        zone: 'Facilities',
        icon: 'hot_tub',
        iconColor: 'rose',
        qty: '1 Room',
        lastMaint: 'Feb 25, 2024',
        nextService: 'Urgent',
        working: false,
        usage: '14.5 Hrs',
        uptime: '85%',
        age: '5.0 Yrs',
        warranty: { status: 'Expired', expires: 'Jan 2020', timeText: 'Expired' },
        vendor: 'Finnleo Saunas',
        logs: []
    },
    {
        id: 12,
        assetId: 'Z-002',
        name: 'Sauna B',
        zone: 'Facilities',
        icon: 'hot_tub',
        iconColor: 'rose',
        qty: '1 Room',
        lastMaint: 'Jan 20, 2024',
        nextService: 'Apr 20, 2024',
        working: true,
        usage: '13.8 Hrs',
        uptime: '95%',
        age: '5.0 Yrs',
        warranty: { status: 'Expired', expires: 'Jan 2020', timeText: 'Expired' },
        vendor: 'Finnleo Saunas',
        logs: []
    },
];

const statusClasses = {
    ACTIVE: 'bg-emerald-100 text-emerald-600',
    'ON LEAVE': 'bg-blue-100 text-blue-600',
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
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

const ITEMS_PER_PAGE = 10;

export default function StaffManagement() {
    // Data State
    const [staffList, setStaffList] = useState(initialStaffData);
    const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
    const [equipmentList, setEquipmentList] = useState(initialEquipmentData);
    const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);

    // Selection State
    const [selectedType, setSelectedType] = useState('staff'); // 'staff' | 'equipment'
    const [selectedStaff, setSelectedStaff] = useState(initialStaffData[0]);
    const [selectedEquipment, setSelectedEquipment] = useState(initialEquipmentData[0]);

    const navigate = useNavigate();

    // Tab State (Controls the list view)
    const [activeTab, setActiveTab] = useState('staff'); // 'staff' | 'equipment'

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Privacy Toggle
    const [showPay, setShowPay] = useState(false);

    // Interaction State
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Reset pagination when tab or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery]);

    // Handle Tab Switch - Sync sidebar selection
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedType(tab); // Switch sidebar context content as well
    };

    const handleAddStaff = (newStaff) => {
        setStaffList(prev => [newStaff, ...prev]);
        setIsAddStaffOpen(false);
    };

    const handleAddEquipment = (newEquipment) => {
        setEquipmentList(prev => [newEquipment, ...prev]);
        setIsAddEquipmentOpen(false);
    };

    // Filter Logic - State & Computation
    const [staffFilters, setStaffFilters] = useState({
        role: [],
        dept: [],
        status: []
    });

    const [equipmentFilters, setEquipmentFilters] = useState({
        zone: [],
        status: [],
        category: [] // Note: data uses 'category' now? checking data... data has 'zone', 'working' (bool), and 'status' (implied or needing derivation). Let's check data structure. 
        // Staff data: role, dept, status.
        // Equipment data: zone, working (bool). Let's derive status from working for now or add it.
        // Actually, let's look at the data again. Equipment data has 'working: true/false'.
        // I will derive status options from 'working' boolean for now, or just use 'zone'.
        // Wait, the new AddEquipment modal adds 'status' and 'category'. I should check if initialEquipmentData has these fields.
        // Looking at initialEquipmentData in previous turn... it has 'zone', 'working', 'icon'. It might not have 'category' or explicit 'status' string yet.
        // I will stick to 'zone' and 'working' (Status: Working/Maintenance) for now to be safe, or just 'zone'.
        // Let's add 'Status' based on 'working' boolean.
    });

    // Valid Filter Options (Derived from Data)
    const uniqueStaffDepts = [...new Set(staffList.map(item => item.dept))];
    const uniqueStaffRoles = [...new Set(staffList.map(item => item.role))];
    const uniqueStaffStatus = [...new Set(staffList.map(item => item.status))];

    const uniqueEquipmentZones = [...new Set(equipmentList.map(item => item.zone))];
    // Equipment status is boolean 'working' in current data, but new add form uses 'status' string.
    // Let's map boolean to string for filtering consistency if needed, or just use specific logic.
    // We'll filter by 'working' status.
    const equipmentStatusOptions = ['Working', 'Maintenance', 'Out of Order'];

    // Filter Helpers
    const toggleFilter = (type, category, value) => {
        if (type === 'staff') {
            setStaffFilters(prev => {
                const current = prev[category];
                const updated = current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value];
                return { ...prev, [category]: updated };
            });
        } else {
            setEquipmentFilters(prev => {
                const current = prev[category];
                const updated = current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value];
                return { ...prev, [category]: updated };
            });
        }
    };

    const clearFilters = () => {
        setStaffFilters({ role: [], dept: [], status: [] });
        setEquipmentFilters({ zone: [], status: [], category: [] });
        setShowFilters(false);
    };

    const activeFilterCount =
        activeTab === 'staff'
            ? Object.values(staffFilters).flat().length
            : Object.values(equipmentFilters).flat().length;


    // Universal Search & Filter Logic
    const filteredStaff = staffList.filter(s => {
        const matchesSearch =
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.dept.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = staffFilters.role.length === 0 || staffFilters.role.includes(s.role);
        const matchesDept = staffFilters.dept.length === 0 || staffFilters.dept.includes(s.dept);
        const matchesStatus = staffFilters.status.length === 0 || staffFilters.status.includes(s.status);

        return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });

    const filteredEquipment = equipmentList.filter(e => {
        const matchesSearch =
            e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.zone.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesZone = equipmentFilters.zone.length === 0 || equipmentFilters.zone.includes(e.zone);

        // Handle Equipment Status (Boolean/String hybrid compatibility)
        // If data has 'status' string, use it. If 'working' boolean, derive it.
        // Current initialData has working:boolean. New items might have status:string.
        let itemStatus = e.status || (e.working ? 'Working' : 'Maintenance');
        // Normalize for comparison
        if (itemStatus === 'working') itemStatus = 'Working';
        if (itemStatus === 'maintenance') itemStatus = 'Maintenance';
        if (itemStatus === 'out-of-order') itemStatus = 'Out of Order';

        const matchesStatus = equipmentFilters.status.length === 0 || equipmentFilters.status.includes(itemStatus);

        return matchesSearch && matchesZone && matchesStatus;
    });

    // Pagination Logic
    const currentList = activeTab === 'staff' ? filteredStaff : filteredEquipment;
    const paginatedItems = currentList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleRowClick = (item, type) => {
        if (type === 'staff') {
            setSelectedStaff(item);
            setSelectedType('staff');
        } else {
            setSelectedEquipment(item);
            setSelectedType('equipment');
        }
    };

    // Grid Columns
    const staffGridCols = "grid-cols-[2.5fr_1.5fr_1.2fr_1.5fr_1.5fr_50px]";
    const equipmentGridCols = "grid-cols-[2.5fr_1fr_1.2fr_1.2fr_1.2fr_50px]";

    return (
        <main
            className="p-8 max-w-[1600px] mx-auto min-h-screen relative"
            onClick={() => {
                if (showFilters) setShowFilters(false);
                if (activeMenuId) setActiveMenuId(null);
            }}
        >
            {/* Add Staff Modal Overlay */}
            <AnimatePresence>
                {isAddStaffOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setIsAddStaffOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1000px] my-auto"
                        >
                            <AddStaff onAddStaff={handleAddStaff} onClose={() => setIsAddStaffOpen(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Equipment Modal Overlay */}
            <AnimatePresence>
                {isAddEquipmentOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setIsAddEquipmentOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1000px] my-auto"
                        >
                            <AddEquipment onAddEquipment={handleAddEquipment} onClose={() => setIsAddEquipmentOpen(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="heading-sm tracking-tight text-3xl font-bold text-slate-900">Staff &amp; Equipment</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage your team and facilities in one place</p>
                </div>
                <div className="flex items-center gap-3 relative z-20">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#10b981] transition-colors" />
                        <input
                            className="pl-10 pr-4 py-2.5 bg-white/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#10b981] w-64 md:w-80 transition-all shadow-sm outline-none placeholder:text-slate-400"
                            placeholder="Search resources..."
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
                            <span className="w-5 h-5 flex items-center justify-center bg-[#10b981] text-white text-[10px] font-bold rounded-full ml-1">
                                {activeFilterCount}
                            </span>
                        )}
                    </motion.button>

                    {/* Filter Popover */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                variants={popoverVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-14 right-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 z-50 max-h-[600px] overflow-y-auto custom-scrollbar"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-900">Filters</h3>
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {activeTab === 'staff' ? (
                                        <>
                                            {/* Staff Filters */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</h4>
                                                <div className="space-y-2">
                                                    {uniqueStaffDepts.map(dept => (
                                                        <label key={dept} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className="relative flex items-center justify-center w-4 h-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={staffFilters.dept.includes(dept)}
                                                                    onChange={() => toggleFilter('staff', 'dept', dept)}
                                                                    className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded checked:border-[#10b981] checked:bg-[#10b981] transition-all"
                                                                />
                                                                <CheckCircle2 className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                            </div>
                                                            <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{dept}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full h-px bg-slate-50"></div>

                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</h4>
                                                <div className="space-y-2">
                                                    {uniqueStaffStatus.map(status => (
                                                        <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className="relative flex items-center justify-center w-4 h-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={staffFilters.status.includes(status)}
                                                                    onChange={() => toggleFilter('staff', 'status', status)}
                                                                    className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded checked:border-[#10b981] checked:bg-[#10b981] transition-all"
                                                                />
                                                                <CheckCircle2 className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                            </div>
                                                            <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Equipment Filters */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Zone</h4>
                                                <div className="space-y-2">
                                                    {uniqueEquipmentZones.map(zone => (
                                                        <label key={zone} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className="relative flex items-center justify-center w-4 h-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={equipmentFilters.zone.includes(zone)}
                                                                    onChange={() => toggleFilter('equipment', 'zone', zone)}
                                                                    className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded checked:border-[#10b981] checked:bg-[#10b981] transition-all"
                                                                />
                                                                <CheckCircle2 className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                            </div>
                                                            <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{zone}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full h-px bg-slate-50"></div>

                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</h4>
                                                <div className="space-y-2">
                                                    {equipmentStatusOptions.map(status => (
                                                        <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className="relative flex items-center justify-center w-4 h-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={equipmentFilters.status.includes(status)}
                                                                    onChange={() => toggleFilter('equipment', 'status', status)}
                                                                    className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded checked:border-[#10b981] checked:bg-[#10b981] transition-all"
                                                                />
                                                                <CheckCircle2 className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                            </div>
                                                            <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => handleTabChange('staff')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'staff' ? 'bg-[#10b981] text-white shadow-lg shadow-emerald-500/20' : 'bg-white/50 text-slate-500 hover:bg-white'}`}
                >
                    Staff Members
                </button>
                <button
                    onClick={() => handleTabChange('equipment')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'equipment' ? 'bg-[#10b981] text-white shadow-lg shadow-emerald-500/20' : 'bg-white/50 text-slate-500 hover:bg-white'}`}
                >
                    Equipment
                </button>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">

                    <motion.div
                        className="backdrop-blur-[12px] border border-white/20 bg-white/80 rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] min-h-[600px]"
                        layout
                    >
                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'staff' ? (
                                <motion.div
                                    key="staff-list"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Staff Header */}
                                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Staff Management</h2>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsAddStaffOpen(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl font-semibold hover:brightness-105 transition-all shadow-md shadow-emerald-500/20 text-xs"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            Add Staff
                                        </motion.button>
                                    </div>

                                    {/* Staff Grid Header */}
                                    <div className={`grid ${staffGridCols} gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/30 items-center`}>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staff Member</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Shift</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Hours</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider"></div>
                                    </div>

                                    {/* Staff Grid Body */}
                                    <motion.div
                                        className="divide-y divide-slate-100"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="show"
                                        key={'staff-list-' + searchQuery + JSON.stringify(staffFilters) + filteredStaff.length + currentPage}
                                    >
                                        {paginatedItems.map((s) => (
                                            <motion.div
                                                key={s.id}
                                                variants={itemVariants}
                                                onClick={() => handleRowClick(s, 'staff')}
                                                whileHover={{
                                                    scale: 1.01,
                                                    y: -2,
                                                    boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)",
                                                    backgroundColor: "rgba(16,185,129,0.05)",
                                                    zIndex: 10
                                                }}
                                                className={`grid ${staffGridCols} gap-4 px-6 py-4 cursor-pointer items-center transition-colors relative bg-white group ${selectedStaff.id === s.id && selectedType === 'staff' ? '!bg-emerald-50/30' : ''}`}
                                            >
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        {s.avatar ? (
                                                            <img alt="Staff" className="w-10 h-10 rounded-full object-cover" src={s.avatar} />
                                                        ) : (
                                                            <div className={`w-10 h-10 rounded-full bg-${s.initialsColor}-100 flex items-center justify-center text-${s.initialsColor}-600 font-bold text-xs`}>{s.initials}</div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900 group-hover:text-[#10b981] transition-colors">{s.name}</p>
                                                            <p className="text-[11px] text-slate-500 font-medium">{s.role}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div><span className="text-sm font-medium text-slate-700">{s.dept}</span></div>
                                                <div><span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${statusClasses[s.status]}`}>{s.status}</span></div>
                                                <div><span className="text-sm text-slate-600 font-medium flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {s.nextShift}</span></div>
                                                <div><span className="text-sm text-slate-500 font-semibold">{s.hours}</span></div>

                                                {/* Actions */}
                                                <div className="relative flex justify-end">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveMenuId(activeMenuId === s.id ? null : s.id);
                                                        }}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${activeMenuId === s.id ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </motion.button>
                                                    <AnimatePresence>
                                                        {activeMenuId === s.id && (
                                                            <motion.div
                                                                variants={menuVariants}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                                className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 overflow-hidden"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                    <Edit className="w-4 h-4 text-slate-400" /> Edit Profile
                                                                </button>
                                                                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-slate-400" /> View Schedule
                                                                </button>
                                                                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                    <Mail className="w-4 h-4 text-slate-400" /> Message Staff
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="equipment-list"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Equipment Header */}
                                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Equipment Management</h2>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsAddEquipmentOpen(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl font-semibold hover:brightness-105 transition-all shadow-md shadow-emerald-500/20 text-xs"
                                        >
                                            <Dumbbell className="w-4 h-4" />
                                            Add Equipment
                                        </motion.button>
                                    </div>

                                    {/* Equipment Grid Header */}
                                    <div className={`grid ${equipmentGridCols} gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/30 items-center`}>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equipment Name</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Maintained</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Service</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider"></div>
                                    </div>

                                    {/* Equipment Grid Body */}
                                    <motion.div
                                        className="divide-y divide-slate-100"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="show"
                                        key={'equip-list-' + searchQuery + JSON.stringify(equipmentFilters) + filteredEquipment.length + currentPage}
                                    >
                                        {paginatedItems.map((e) => (
                                            <motion.div
                                                key={e.id}
                                                variants={itemVariants}
                                                onClick={() => handleRowClick(e, 'equipment')}
                                                whileHover={{
                                                    scale: 1.01,
                                                    y: -2,
                                                    boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)",
                                                    backgroundColor: "rgba(16,185,129,0.05)",
                                                    zIndex: 10
                                                }}
                                                className={`grid grid-cols-[2.5fr_1fr_1.2fr_1.2fr_1.2fr_50px] gap-4 px-6 py-4 cursor-pointer items-center transition-colors relative bg-white group ${selectedEquipment.id === e.id && selectedType === 'equipment' ? '!bg-emerald-50/30' : ''}`}
                                            >
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl bg-${e.iconColor}-50 flex items-center justify-center text-${e.iconColor}-600`}>
                                                            <span className="material-symbols-outlined">{e.icon}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900 group-hover:text-[#10b981] transition-colors">{e.name}</p>
                                                            <p className="text-[11px] text-slate-500 font-medium">{e.zone}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div><span className="text-sm font-bold text-slate-600">{e.qty}</span></div>
                                                <div><span className="text-sm text-slate-500 font-medium">{e.lastMaint}</span></div>
                                                <div><span className="text-sm text-slate-500 font-medium">{e.nextService}</span></div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        {e.working ? (
                                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                                                                <CheckCircle2 className="w-3 h-3" /> Working
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wide">
                                                                <AlertCircle className="w-3 h-3" /> Maint. Req.
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="relative flex justify-end">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={(ev) => {
                                                            ev.stopPropagation();
                                                            setActiveMenuId(activeMenuId === e.id ? null : e.id);
                                                        }}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${activeMenuId === e.id ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </motion.button>
                                                    <AnimatePresence>
                                                        {activeMenuId === e.id && (
                                                            <motion.div
                                                                variants={menuVariants}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                                className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 overflow-hidden"
                                                                onClick={(ev) => ev.stopPropagation()}
                                                            >
                                                                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                    <AlertCircle className="w-4 h-4 text-slate-400" /> Report Issue
                                                                </button>
                                                                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                    <Wrench className="w-4 h-4 text-slate-400" /> Log Maintenance
                                                                </button>
                                                                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-slate-400" /> View History
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination Footer */}
                        <TableFooter
                            totalItems={currentList.length}
                            currentPage={currentPage}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onPageChange={setCurrentPage}
                            label={activeTab === 'staff' ? 'staff members' : 'equipment items'}
                        />

                        {/* Empty State */}
                        {currentList.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <Ban className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg">No Results Found</h3>
                                <p className="text-slate-500 text-sm max-w-xs text-center mt-2">
                                    We couldn't find any {activeTab === 'staff' ? 'staff members' : 'equipment'} matching "{searchQuery}".
                                </p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-6 text-[#10b981] text-sm font-bold hover:underline"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Detail Panel Area */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="backdrop-blur-[12px] border border-white/20 bg-white/80 p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] sticky top-28 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {selectedType === 'staff' ? (
                                <motion.div
                                    key={`staff-detail-${selectedStaff.id}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="relative mb-6">
                                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#10b981] to-indigo-500">
                                                {selectedStaff.avatar ? (
                                                    <img alt="Selected Staff" className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl" src={selectedStaff.avatar} />
                                                ) : (
                                                    <div className={`w-full h-full rounded-full bg-${selectedStaff.initialsColor}-100 flex items-center justify-center text-${selectedStaff.initialsColor}-600 font-bold text-3xl border-4 border-white shadow-xl`}>{selectedStaff.initials}</div>
                                                )}
                                            </div>
                                            <button className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:text-[#10b981] transition-colors">
                                                <Edit className="w-4 h-4 text-slate-600" />
                                            </button>
                                        </div>
                                        <h2 className="heading-xs">{selectedStaff.name}</h2>
                                        <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded-full uppercase tracking-widest mt-2">{selectedStaff.role} • {selectedStaff.dept}</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-sm mb-3 text-slate-800">Professional Certifications</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedStaff.certs.length > 0 ? selectedStaff.certs.map((c, i) => (
                                                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200">{c}</span>
                                                )) : (
                                                    <span className="text-xs text-slate-400 italic">No certifications listed</span>
                                                )}
                                            </div>
                                        </div>
                                        {selectedStaff.classes.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-sm mb-4 text-slate-800">Assigned Classes (This Week)</h4>
                                                <div className="space-y-3">
                                                    {selectedStaff.classes.map((cl, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 bg-white/40 rounded-2xl border border-white/20">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full bg-${cl.color}-100 flex items-center justify-center text-${cl.color}-600`}>
                                                                    <span className="material-symbols-outlined text-sm">{cl.icon}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold text-slate-800">{cl.name}</p>
                                                                    <p className="text-[10px] text-slate-400 font-medium">{cl.schedule}</p>
                                                                </div>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-slate-400">{cl.capacity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-slate-50 p-4 rounded-2xl relative group cursor-pointer" onClick={() => setShowPay(!showPay)}>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                                                    Total Pay
                                                    {showPay ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                </p>
                                                <p className="text-xs font-bold text-slate-800">
                                                    {showPay ? selectedStaff.pay : '****.**'}
                                                    {showPay && <span className="text-[10px] text-emerald-500 font-medium ml-1">(Net)</span>}
                                                </p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Satisfaction</p>
                                                <div className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <p className="text-xs font-bold text-slate-800">{selectedStaff.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            View Full Schedule
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`equipment-detail-${selectedEquipment.id}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Asset Header */}
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="relative mb-6">
                                            <div className={`w-32 h-32 rounded-full p-6 bg-${selectedEquipment.iconColor}-50 flex items-center justify-center text-${selectedEquipment.iconColor}-600 shadow-xl border-4 border-white`}>
                                                <span className="material-symbols-outlined text-6xl">{selectedEquipment.icon}</span>
                                            </div>
                                            <button className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:text-[#10b981] transition-colors">
                                                <Edit className="w-4 h-4 text-slate-600" />
                                            </button>
                                        </div>
                                        <h2 className="heading-xs">{selectedEquipment.name}</h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-slate-500 text-xs font-medium">{selectedEquipment.zone} • {selectedEquipment.assetId}</span>
                                        </div>
                                        <div className={`mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${selectedEquipment.working ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {selectedEquipment.working ? '🟢 Operational' : '🔴 Maintenance'}
                                        </div>
                                    </div>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Usage</p>
                                            <p className="text-xs font-bold text-slate-800">{selectedEquipment.usage}</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Uptime</p>
                                            <p className="text-xs font-bold text-emerald-600">{selectedEquipment.uptime}</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age</p>
                                            <p className="text-xs font-bold text-slate-800">{selectedEquipment.age}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Warranty Section */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-sm text-slate-800">Warranty Status</h4>
                                                <span className={`text-[10px] font-bold ${selectedEquipment.warranty.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {selectedEquipment.warranty.status}
                                                </span>
                                            </div>
                                            <div className="bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${selectedEquipment.warranty.status === 'Active' ? 'bg-emerald-500' : 'bg-red-300'}`}
                                                    style={{ width: selectedEquipment.warranty.status === 'Active' ? '70%' : '100%' }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="text-slate-500 font-medium">Expires {selectedEquipment.warranty.expires} ({selectedEquipment.warranty.timeText})</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <Phone className="w-3 h-3 text-slate-400" />
                                                <span className="text-xs font-medium text-slate-600">{selectedEquipment.vendor}</span>
                                            </div>
                                        </div>

                                        {/* Maintenance Timeline */}
                                        <div>
                                            <h4 className="font-semibold text-sm mb-4 text-slate-800 flex items-center gap-2">
                                                <History className="w-4 h-4 text-slate-400" /> Recent Service Log
                                            </h4>
                                            <div className="space-y-0 relative">
                                                {/* Vertical Line */}
                                                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100"></div>

                                                {selectedEquipment.logs.length > 0 ? selectedEquipment.logs.map((log, i) => (
                                                    <div key={i} className="relative flex items-start gap-4 pb-4 last:pb-0">
                                                        <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-800">{log.type}</p>
                                                            <p className="text-[10px] text-slate-500 font-medium">{log.date} • {log.user}</p>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="relative flex items-start gap-4 pb-4">
                                                        <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center">
                                                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                                        </div>
                                                        <p className="text-xs text-slate-400 italic pt-1">No recent maintenance logs</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions Footer */}
                                        <div className="pt-2">
                                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                                                <Wrench className="w-4 h-4" />
                                                Log Maintenance
                                            </button>
                                            <button className="w-full mt-3 py-2 text-red-500 text-xs font-bold hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                Report Issue
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
