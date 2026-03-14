import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingLayout from '../../layouts/OnboardingLayout';

const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:ring-[#00d09c] focus:border-[#00d09c] transition-all placeholder:text-slate-400 outline-none";
const labelClass = "block text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-2";

const StaffOperationsStep3 = () => {
    return (
        <OnboardingLayout currentStep={3}>
            <div className="mb-8">
                <h1 className="heading-sm text-slate-900 uppercase tracking-tight">Staff &amp; Operations</h1>
                <p className="text-base text-slate-700 mt-2">Add your team members and configure operational workflows.</p>
            </div>

            <form className="space-y-12">
                {/* Staff Roles */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">badge</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Staff Roles &amp; Permissions</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { role: 'Manager', count: '2', permissions: ['Member Management', 'Billing', 'Reports', 'Staff Scheduling'] },
                            { role: 'Trainer', count: '5', permissions: ['Client Profiles', 'Schedule', 'Progress Tracking'] },
                            { role: 'Front Desk', count: '3', permissions: ['Check-in', 'Guest Passes', 'Inquiries'] },
                        ].map((staff) => (
                            <div key={staff.role} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                    <div className="md:col-span-3">
                                        <label className={labelClass}>Role Title</label>
                                        <input className={inputClass} type="text" defaultValue={staff.role} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Headcount</label>
                                        <input className={inputClass} type="number" defaultValue={staff.count} />
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className={labelClass}>Permissions</label>
                                        <div className="flex flex-wrap gap-2">
                                            {staff.permissions.map(perm => (
                                                <button key={perm} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{perm}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="flex items-center gap-2 text-sm font-bold text-[#00d09c] hover:text-emerald-600 transition-colors" type="button">
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Add Another Role
                        </button>
                    </div>
                </section>

                {/* Shift Scheduling */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">calendar_month</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Shift Scheduling</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Morning Shift</label>
                                <div className="flex items-center gap-3">
                                    <input className={inputClass} type="time" defaultValue="06:00" />
                                    <span className="text-slate-600 text-xs font-bold">TO</span>
                                    <input className={inputClass} type="time" defaultValue="14:00" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Evening Shift</label>
                                <div className="flex items-center gap-3">
                                    <input className={inputClass} type="time" defaultValue="14:00" />
                                    <span className="text-slate-600 text-xs font-bold">TO</span>
                                    <input className={inputClass} type="time" defaultValue="22:00" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Minimum Staff per Shift</label>
                                <input className={inputClass} type="number" defaultValue="2" placeholder="e.g. 2" />
                            </div>
                            <div>
                                <label className={labelClass}>Shift Rotation</label>
                                <select className={inputClass}>
                                    <option selected>Weekly Rotation</option>
                                    <option>Bi-weekly Rotation</option>
                                    <option>Fixed Schedule</option>
                                    <option>Custom</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Check-in System */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">qr_code_scanner</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Check-in System</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Check-in Method</label>
                            <div className="flex flex-wrap gap-2">
                                {['QR Code Scan', 'RFID Card Tap', 'Fingerprint'].map(method => (
                                    <button key={method} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{method}</button>
                                ))}
                                {['Facial Recognition', 'Manual Entry'].map(method => (
                                    <button key={method} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{method}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Guest Check-in Policy</label>
                            <select className={inputClass}>
                                <option>No Guests Allowed</option>
                                <option selected>1 Guest Pass per Member/Month</option>
                                <option>2 Guest Passes per Member/Month</option>
                                <option>Unlimited (Premium/VIP Only)</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Auto-checkout After (hours)</label>
                            <input className={inputClass} type="number" defaultValue="3" placeholder="e.g. 3" />
                        </div>
                        <div>
                            <label className={labelClass}>Capacity Alert Threshold (%)</label>
                            <input className={inputClass} type="number" defaultValue="80" placeholder="e.g. 80" />
                        </div>
                    </div>
                </section>

                {/* Communication Preferences */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">notifications_active</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Communication Preferences</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Member Notifications</label>
                            <div className="flex flex-wrap gap-2">
                                {['Email', 'SMS', 'Push Notifications', 'WhatsApp'].map(channel => (
                                    <button key={channel} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{channel}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Staff Notifications</label>
                            <div className="flex flex-wrap gap-2">
                                {['Email', 'In-App', 'WhatsApp'].map(channel => (
                                    <button key={channel} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{channel}</button>
                                ))}
                                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">SMS</button>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Automated Reminders</label>
                            <div className="flex flex-wrap gap-2">
                                {['Payment Due', 'Class Reminder', 'Membership Expiry', 'Birthday Wishes', 'Inactive Member Follow-up'].map(reminder => (
                                    <button key={reminder} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{reminder}</button>
                                ))}
                                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">Progress Milestones</button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        to="/onboarding/membership-pricing"
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Step 2
                    </Link>
                    <Link
                        to="/onboarding/equipment-programs"
                        className="w-full sm:w-auto md:px-12 bg-[#00d09c] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                        Save &amp; Continue to Step 4
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </form>
        </OnboardingLayout>
    );
};

export default StaffOperationsStep3;
