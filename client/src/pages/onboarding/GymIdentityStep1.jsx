import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingLayout from '../../layouts/OnboardingLayout';

const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:ring-[#00d09c] focus:border-[#00d09c] transition-all placeholder:text-slate-400 outline-none";
const labelClass = "block text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-2";

const GymIdentityStep1 = () => {
    return (
        <OnboardingLayout currentStep={1}>
            <div className="mb-8">
                <h1 className="heading-sm text-slate-900 uppercase tracking-tight">Gym Profile &amp; Basic Information</h1>
                <p className="text-base text-slate-700 mt-2">Provide the foundational details for your new gym location.</p>
            </div>

            <form className="space-y-12">
                {/* Brand Presence */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">badge</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Brand Presence</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <label className={labelClass}>Official Gym Name</label>
                            <input className={inputClass} placeholder="e.g. FlexHub Elite Downtown" type="text" />
                        </div>
                        <div className="md:col-span-1">
                            <label className={labelClass}>Tagline (Optional)</label>
                            <input className={inputClass} placeholder="e.g. Elevate Your Performance" type="text" />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Logo Upload (Drag &amp; Drop)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="space-y-1 text-center">
                                    <span className="material-symbols-outlined text-slate-400 text-3xl">cloud_upload</span>
                                    <div className="flex text-sm text-slate-700 justify-center">
                                        <label className="relative cursor-pointer rounded-md font-bold text-[#00d09c] hover:text-emerald-600">
                                            <span>Upload a file</span>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500 tracking-tight">PNG, JPG, SVG up to 5MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Physical Location */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">location_on</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Physical Location</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className={labelClass}>Street Address</label>
                            <input className={inputClass} placeholder="Building name, Street number" type="text" />
                        </div>
                        <div className="md:col-span-1">
                            <label className={labelClass}>Landmark</label>
                            <input className={inputClass} placeholder="e.g. Near Central Park" type="text" />
                        </div>
                        <div>
                            <label className={labelClass}>City</label>
                            <input className={inputClass} placeholder="Enter City" type="text" />
                        </div>
                        <div>
                            <label className={labelClass}>State</label>
                            <select className={inputClass}>
                                <option value="">Select State</option>
                                <option>New York</option>
                                <option>California</option>
                                <option>Texas</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>PIN Code</label>
                            <input className={inputClass} placeholder="6-digit PIN" type="text" />
                        </div>
                        <div className="md:col-span-3">
                            <label className={labelClass}>Google Maps Link</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-lg">link</span>
                                <input className={`${inputClass} pl-10`} placeholder="https://goo.gl/maps/..." type="url" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact & Social Presence */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">contact_support</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Contact &amp; Social Presence</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Primary Phone</label>
                            <input className={inputClass} placeholder="+1 (000) 000-0000" type="tel" />
                        </div>
                        <div>
                            <label className={labelClass}>Alternate Phone</label>
                            <input className={inputClass} placeholder="+1 (000) 000-0000" type="tel" />
                        </div>
                        <div>
                            <label className={labelClass}>Official Email</label>
                            <input className={inputClass} placeholder="contact@gymname.com" type="email" />
                        </div>
                        <div>
                            <label className={labelClass}>Website URL</label>
                            <input className={inputClass} placeholder="www.gymname.com" type="url" />
                        </div>
                        <div className="md:col-span-1">
                            <label className={labelClass}>Instagram Handle</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 text-sm font-semibold">@</span>
                                <input className={`${inputClass} rounded-l-none`} placeholder="instagram_handle" type="text" />
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <label className={labelClass}>Facebook Page</label>
                            <input className={inputClass} placeholder="facebook.com/gymname" type="text" />
                        </div>
                    </div>
                </section>

                {/* Operating Hours */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">schedule</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Operating Hours</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input className="rounded text-[#00d09c] focus:ring-[#00d09c] border-slate-300" type="checkbox" />
                                <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Same hours for all days</span>
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-[12px] font-bold text-slate-700 uppercase mb-3">Weekdays (Mon - Fri)</p>
                                <div className="flex items-center gap-3">
                                    <input className={inputClass} type="time" defaultValue="06:00" />
                                    <span className="text-slate-600 text-xs font-bold">TO</span>
                                    <input className={inputClass} type="time" defaultValue="22:00" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-slate-700 uppercase mb-3">Weekends (Sat - Sun)</p>
                                <div className="flex items-center gap-3">
                                    <input className={inputClass} type="time" defaultValue="08:00" />
                                    <span className="text-slate-600 text-xs font-bold">TO</span>
                                    <input className={inputClass} type="time" defaultValue="20:00" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className={labelClass}>Closed Days (Multi-select)</label>
                            <div className="flex flex-wrap gap-2">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                    <button key={day} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{day}</button>
                                ))}
                                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all bg-white" type="button">Saturday</button>
                                <button className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">Sunday</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Facility Details */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">straighten</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Facility Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Facility Size (sq ft)</label>
                            <input className={inputClass} placeholder="e.g. 5000" type="number" />
                        </div>
                        <div>
                            <label className={labelClass}>Maximum Capacity</label>
                            <input className={inputClass} placeholder="Max people" type="number" />
                        </div>
                        <div>
                            <label className={labelClass}>Year Established</label>
                            <input className={inputClass} placeholder="YYYY" type="text" />
                        </div>
                    </div>
                </section>

                <div className="pt-8 flex flex-col items-center">
                    <Link
                        to="/onboarding/membership-pricing"
                        className="w-full md:w-auto md:px-12 bg-[#00d09c] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                        Save &amp; Continue to Step 2
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                    <p className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest mt-6">All information can be edited later from the gym settings panel</p>
                </div>
            </form>
        </OnboardingLayout>
    );
};

export default GymIdentityStep1;
