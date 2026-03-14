import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Upload, Dumbbell, Tag,
    Layers, AlertCircle, Calendar, CheckCircle2,
    Activity, X, Hash, MapPin, Phone, Truck, ShieldCheck
} from 'lucide-react';

export default function AddEquipment({ onAddEquipment, onClose }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        assetId: '',
        zone: '',
        quantity: 1,
        price: '',
        ownership: 'new',
        condition: '', // new, good, decent, repair
        status: 'working', // working, maintenance, out-of-order
        lastMaint: '',
        nextService: '',
        vendorName: '',
        supportPhone: '',
        warrantyExpires: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct new equipment object matching the data structure
        const newEquipment = {
            id: Date.now(),
            assetId: formData.assetId || `EQ-${Math.floor(Math.random() * 1000)}`,
            name: formData.name,
            zone: formData.zone,
            icon: formData.category === 'cardio' ? 'directions_run' : 'fitness_center', // Simplified logic
            iconColor: 'emerald', // Default for new items
            qty: `${formData.quantity} Units`,
            lastMaint: formData.lastMaint || 'N/A',
            nextService: formData.nextService || 'N/A',
            working: formData.status === 'working',
            usage: '0 Hrs',
            uptime: '100%',
            age: 'New',
            warranty: {
                status: 'Active',
                expires: formData.warrantyExpires,
                timeText: 'Just Activated'
            },
            vendor: `${formData.vendorName} ${formData.supportPhone ? `(${formData.supportPhone})` : ''}`,
            logs: []
        };

        if (onAddEquipment) {
            onAddEquipment(newEquipment);
        }

        if (onClose) onClose();
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
            opacity: 1,
            scale: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className={onClose ? "w-full relative" : "p-8 max-w-[1000px] mx-auto min-h-screen relative"}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="backdrop-blur-[12px] border border-white/20 bg-white/80 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start bg-white/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New Equipment</h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Register a new asset into your gym inventory</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors -mr-2 text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">

                    {/* Equipment Visual */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Equipment Visual
                        </h2>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                            <div className="relative group w-full md:w-64 h-40 flex-shrink-0">
                                <div className="w-full h-full rounded-2xl border-4 border-white shadow-lg flex flex-col items-center justify-center bg-slate-100 overflow-hidden relative group-hover:border-[#10b981]/50 transition-colors">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <div className="p-3 bg-white rounded-full mb-2 shadow-sm">
                                                <Upload className="w-6 h-6 text-slate-300 group-hover:text-[#10b981] transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Photo</span>
                                        </>
                                    )}
                                </div>
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold text-slate-800">Asset Photo</p>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
                                    Showcase the equipment clearly for easy identification.
                                    <br />Accepted: JPG, PNG. Max: 5MB.
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                                        Select Image
                                    </button>
                                    {imagePreview && (
                                        <button
                                            type="button"
                                            onClick={() => setImagePreview(null)}
                                            className="px-4 py-2 text-red-500 text-xs font-bold hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <div className="w-full h-px bg-slate-100"></div>

                    {/* Identity & Location */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Identity & Location
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Equipment Name</label>
                                <div className="relative">
                                    <Dumbbell className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. Matrix T5x Treadmill"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Asset Tag / Serial</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="assetId"
                                        value={formData.assetId}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. TRD-2026-X1"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="cardio">Cardio</option>
                                        <option value="strength">Strength</option>
                                        <option value="flexibility">Flexibility</option>
                                        <option value="functional">Functional Training</option>
                                        <option value="free-weights">Free Weights</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Gym Zone</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        name="zone"
                                        value={formData.zone}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Zone</option>
                                        <option value="Cardio Zone">Cardio Zone</option>
                                        <option value="Strength Training">Strength Training</option>
                                        <option value="Free Weights">Free Weights</option>
                                        <option value="Functional Area">Functional Area</option>
                                        <option value="Studio A">Studio A</option>
                                        <option value="Studio B">Studio B</option>
                                        <option value="Facilities">Facilities</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Vendor & Support */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Support & Warranty
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Vendor/Supplier</label>
                                <div className="relative">
                                    <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="vendorName"
                                        value={formData.vendorName}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. Technogym"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Support Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="supportPhone"
                                        value={formData.supportPhone}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="+1 (800) ..."
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Warranty Expiration</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="warrantyExpires"
                                        value={formData.warrantyExpires}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
                                        type="date"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Acquisition Data */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Acquisition Data
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Quantity</label>
                                <div className="relative">
                                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="1"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Purchase Price</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span>
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="0.00"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Ownership</label>
                                <div className="flex items-center h-[46px] gap-4 px-1">
                                    {['new', 'pre-owned', 'rented'].map((type) => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative flex items-center justify-center w-5 h-5">
                                                <input
                                                    name="ownership"
                                                    type="radio"
                                                    value={type}
                                                    checked={formData.ownership === type}
                                                    onChange={handleChange}
                                                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-[#10b981] checked:bg-[#10b981] transition-all"
                                                />
                                                <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <div className="w-full h-px bg-slate-100"></div>

                    {/* Status & Maintenance */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Status & Maintenance
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Current Condition</label>
                                <div className="relative">
                                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Condition</option>
                                        <option value="new">Brand New</option>
                                        <option value="good">Good</option>
                                        <option value="decent">Decent</option>
                                        <option value="repair">Needs Repair</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Operational Status</label>
                                <div className="relative">
                                    <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="working">Working</option>
                                        <option value="maintenance">In Maintenance</option>
                                        <option value="out-of-order">Out of Order</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Maintained</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="lastMaint"
                                        value={formData.lastMaint}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Next Service Due</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="nextService"
                                        value={formData.nextService}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
                                        type="date"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Actions */}
                    <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
                        <button
                            onClick={onClose}
                            type="button"
                            className="w-full sm:w-auto px-8 py-3.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-2xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-10 py-3.5 bg-[#10b981] text-white rounded-2xl font-bold text-sm hover:brightness-105 hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95 duration-100"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Save Equipment
                        </button>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}
