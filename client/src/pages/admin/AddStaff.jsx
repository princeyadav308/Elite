import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Upload, User, Mail, Phone, Briefcase,
    Award, Calendar, Clock, X, Plus, CheckCircle2,
    DollarSign, MapPin, Shield, Lock, AlertCircle
} from 'lucide-react';

export default function AddStaff({ onAddStaff, onClose }) {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        payType: 'Hourly', // Default
        rate: '',
        hours: 40,
        startDate: '',
        systemRole: 'No Access', // Default
        emergencyName: '',
        emergencyPhone: '',
        certs: ['CPR/AED'], // Initial mock data
    });

    const [newCert, setNewCert] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCert = (e) => {
        e.preventDefault();
        if (newCert && !formData.certs.includes(newCert)) {
            setFormData(prev => ({ ...prev, certs: [...prev.certs, newCert] }));
            setNewCert('');
        }
    };

    const handleRemoveCert = (cert) => {
        setFormData(prev => ({ ...prev, certs: prev.certs.filter(c => c !== cert) }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct new staff object
        const newStaffMember = {
            id: Date.now(), // Generate random ID
            name: `${formData.firstName} ${formData.lastName}`,
            role: formData.role,
            dept: formData.department,
            status: 'ACTIVE',
            hours: `${formData.hours} hrs`,
            nextShift: 'Not Scheduled',
            email: formData.email,
            phone: formData.phone,
            avatar: avatarPreview || `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`,
            certs: formData.certs,
            pay: formData.payType === 'Hourly' ? `$${formData.rate}/hr` : `$${formData.rate}/mo`,
            rating: 'New', // Default
            ...formData
        };

        if (onAddStaff) {
            onAddStaff(newStaffMember);
        } else {
            console.log("New Staff Member:", newStaffMember);
            navigate('/admin/staff');
        }

        if (onClose) onClose();
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className={onClose ? "w-full relative" : "p-8 max-w-[1000px] mx-auto min-h-screen relative"}>
            {/* Back Button (Standalone Mode Only) */}
            {!onClose && (
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/admin/staff')}
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#10b981] transition-colors"
                    >
                        <div className="p-1 rounded-lg bg-white/50 group-hover:bg-[#10b981]/10 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        Back to Staff Management
                    </button>
                </div>
            )}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="backdrop-blur-[12px] border border-white/20 bg-white/80 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden"
            >
                {/* Header Bar */}
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start bg-white/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New Staff Member</h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Onboard a new professional to your gym ecosystem</p>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors -mr-2">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                    {/* Profile Picture Section */}
                    <motion.section variants={sectionVariants} className="pt-6">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Profile Identity
                        </h2>
                        <div className="flex items-center gap-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                            <div className="relative group cursor-pointer">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl flex items-center justify-center bg-slate-100 overflow-hidden relative">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-12 h-12 text-slate-300" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                                        <Upload className="w-6 h-6 mb-1" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                                    </div>
                                </div>
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold text-slate-800">Professional Headshot</p>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
                                    Upload a high-resolution image. JPG, PNG or GIF allowed.
                                    <br />Recommended size: 400x400px.
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                                        Choose File
                                    </button>
                                    {avatarPreview && (
                                        <button
                                            type="button"
                                            onClick={() => setAvatarPreview(null)}
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

                    {/* Basic Information */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. Jonathan"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. Wick"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="john.wick@flexhub.com"
                                        type="email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <div className="w-full h-px bg-slate-100"></div>

                    {/* Professional Details */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Professional Role
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Department</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Fitness">Fitness</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Management">Management</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Job Title / Role</label>
                                <div className="relative">
                                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. Senior Personal Trainer"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Certifications (Tag Input) */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Qualifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Certifications</label>
                                <div className="p-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-[#10b981] focus-within:bg-white transition-all min-h-[56px] flex flex-wrap gap-2">
                                    <AnimatePresence>
                                        {formData.certs.map(cert => (
                                            <motion.span
                                                key={cert}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                className="px-2.5 py-1.5 bg-[#10b981]/10 text-[#10b981] text-[11px] font-bold rounded-lg border border-[#10b981]/20 flex items-center gap-1.5"
                                            >
                                                {cert}
                                                <button type="button" onClick={() => handleRemoveCert(cert)} className="hover:bg-[#10b981]/20 rounded-full p-0.5 transition-colors">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                    <input
                                        value={newCert}
                                        onChange={(e) => setNewCert(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddCert(e)}
                                        className="flex-1 bg-transparent border-none text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:ring-0 min-w-[120px]"
                                        placeholder="Type & Press Enter..."
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 pl-1">Press Enter to add a tag</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Start Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <div className="w-full h-px bg-slate-100"></div>

                    {/* Platform Permissions */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            System Access Level
                        </h2>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Platform Permissions</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    name="systemRole"
                                    value={formData.systemRole}
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                >
                                    <option value="No Access">No Access (Janitorial/Maintenance)</option>
                                    <option value="Trainer View">Trainer View (Self & Clients Only)</option>
                                    <option value="Front Desk">Front Desk (Check-ins & POS)</option>
                                    <option value="Manager">Manager (Full Admin Access)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Lock className="w-4 h-4 text-slate-300" />
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 ml-1 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Controls what this user can see and do within the dashboard.
                            </p>
                        </div>
                    </motion.section>

                    <div className="w-full h-px bg-slate-100"></div>

                    {/* Compensation */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Compensation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Pay Structure</label>
                                <div className="flex gap-4">
                                    <div className="relative w-1/2">
                                        <select
                                            name="payType"
                                            value={formData.payType}
                                            onChange={handleInputChange}
                                            className="w-full pl-3 pr-8 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Hourly">Hourly Rate</option>
                                            <option value="Salaried">Annual Salary</option>
                                            <option value="Commission">Commission Only</option>
                                        </select>
                                    </div>
                                    <div className="relative w-1/2">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            name="rate"
                                            type="number"
                                            placeholder={formData.payType === 'Hourly' ? "0.00 /hr" : "0.00 /yr"}
                                            value={formData.rate}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Weekly Hours</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="hours"
                                        type="number"
                                        value={formData.hours}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-16 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">HRS/WEEK</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <div className="w-full h-px bg-slate-100"></div>

                    {/* Emergency Contact */}
                    <motion.section variants={sectionVariants}>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                            Emergency Contact
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Contact Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="emergencyName"
                                        value={formData.emergencyName}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="e.g. Spouse, Parent"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Contact Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        name="emergencyPhone"
                                        value={formData.emergencyPhone}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="+1 (555) 999-9999"
                                        type="tel"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Actions */}
                    <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
                        <button
                            onClick={onClose || (() => navigate('/admin/staff'))}
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
                            Save Staff Member
                        </button>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}
