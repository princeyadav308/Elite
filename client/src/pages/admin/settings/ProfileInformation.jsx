import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    User,
    Mail,
    Phone,
    Camera,
    Check,
    Bell,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';

// --- MOVED OUTSIDE: Prevents remounting on parent re-render ---

const ProfileInput = ({ label, defaultValue, type = "text", icon: Icon, placeholder }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Icon size={18} />
            </div>
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
            />
        </div>
    </div>
);

const PasswordInput = ({ label, placeholder }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <Lock size={18} />
                </div>
                <input
                    type={visible ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                />
                <button
                    type="button"
                    onClick={() => setVisible(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
};

const NotificationToggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 group">
        <div className="pr-8">
            <h4 className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{label}</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${checked ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
        >
            <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                animate={{ x: checked ? 20 : 0 }}
            />
        </button>
    </div>
);

// --- MAIN COMPONENT ---

const ProfileInformation = () => {
    // State for Toggles
    const [twoFA, setTwoFA] = useState(false);
    const [preferences, setPreferences] = useState({
        email: true,
        push: true,
        weekly: false
    });

    // State for Toast
    const [showToast, setShowToast] = useState(false);

    // Helpers
    const triggerSave = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleToggle = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
        triggerSave();
    };

    const handle2FA = (val) => {
        setTwoFA(val);
        triggerSave();
    };

    return (
        <div className="space-y-8 relative pb-20">
            {/* --- Profile Card --- */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <User size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Profile Information</h3>
                        <p className="text-sm text-slate-500">Update your personal details and public profile.</p>
                    </div>
                </div>

                <div className="p-8">
                    {/* Avatar Section */}
                    <div className="flex items-start gap-6 mb-10">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-emerald-100 transition-transform group-hover:scale-105">
                                AR
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-100 text-slate-600 group-hover:text-emerald-500 transition-colors">
                                <Camera size={16} />
                            </div>
                        </div>
                        <div className="pt-2">
                            <h4 className="font-bold text-slate-800">Alex Rivera</h4>
                            <p className="text-sm text-slate-500 mb-3">Gym Owner • Member since 2023</p>
                            <div className="flex gap-2">
                                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">JPG, PNG</span>
                                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">Max 5MB</span>
                            </div>
                        </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileInput label="First Name" defaultValue="Alex" icon={User} />
                        <ProfileInput label="Last Name" defaultValue="Rivera" icon={User} />
                        <ProfileInput label="Email Address" defaultValue="alex.rivera@elite.gym" type="email" icon={Mail} />
                        <ProfileInput label="Phone Number" defaultValue="+1 (555) 234-5678" type="tel" icon={Phone} />

                        {/* Role - Read Only */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700">Role & Permissions</label>
                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 w-full">
                                <ShieldCheck size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Gym Owner (Super Admin)</span>
                            </div>
                            <p className="text-xs text-slate-400 pl-1">Based on your subscription plan, this role has full access.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Notifications Card --- */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Bell size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Notification Preferences</h3>
                        <p className="text-sm text-slate-500">Manage how we communicate updates to you.</p>
                    </div>
                </div>
                <div className="p-8">
                    <div className="divide-y divide-slate-50">
                        <NotificationToggle
                            label="Email Notifications"
                            description="Receive daily summaries, billing invoices, and critical system alerts."
                            checked={preferences.email}
                            onChange={() => handleToggle('email')}
                        />
                        <NotificationToggle
                            label="Push Notifications"
                            description="Real-time alerts for member check-ins and new signups on your mobile device."
                            checked={preferences.push}
                            onChange={() => handleToggle('push')}
                        />
                        <NotificationToggle
                            label="Weekly Performance Report"
                            description="Get a comprehensive breakdown of your gym's growth every Monday morning."
                            checked={preferences.weekly}
                            onChange={() => handleToggle('weekly')}
                        />
                    </div>
                </div>
            </div>

            {/* --- Security Card --- */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Security</h3>
                        <p className="text-sm text-slate-500">Manage your password and two-factor authentication.</p>
                    </div>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PasswordInput label="Current Password" placeholder="••••••••" />
                        <PasswordInput label="New Password" placeholder="Enter new password" />
                    </div>
                    <NotificationToggle
                        label="Two-Factor Authentication (2FA)"
                        description="Add an extra layer of security to your account requiring a code at login."
                        checked={twoFA}
                        onChange={handle2FA}
                    />
                    <div className="flex justify-end border-t border-slate-50 pt-6">
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Toast Notification --- */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
                    >
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Preferences Updated</h4>
                            <p className="text-xs text-slate-400">Your changes have been saved automatically.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileInformation;
