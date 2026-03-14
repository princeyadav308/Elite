import React from 'react';

const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#00d09c] focus:border-transparent outline-none transition-all text-sm";
const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

const GymProfile = () => {
    return (
        <div className="space-y-8">
            {/* Gym Profile Details */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] overflow-hidden">
                <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="text-lg font-medium text-slate-800">Gym Profile Details</h3>
                    <p className="text-sm text-slate-500">Manage your facility information and location settings.</p>
                </div>
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Form Fields */}
                        <div className="space-y-6">
                            <div className="input-group">
                                <label className={labelClass}>Gym Name</label>
                                <input className={inputClass} type="text" defaultValue="Elite Fitness Center" />
                            </div>
                            <div className="input-group">
                                <label className={labelClass}>Street Address</label>
                                <input className={inputClass} type="text" defaultValue="123 Performance Way" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="input-group">
                                    <label className={labelClass}>Pincode</label>
                                    <input className={inputClass} type="text" defaultValue="90210" />
                                </div>
                                <div className="input-group">
                                    <label className={labelClass}>City</label>
                                    <input className={inputClass} type="text" defaultValue="Los Angeles" />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className={labelClass}>Country</label>
                                <select className={inputClass}>
                                    <option selected>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column - Logo Upload */}
                        <div className="space-y-6">
                            <div className="input-group h-full flex flex-col">
                                <label className={labelClass}>Update Gym Logo</label>
                                <div className="flex-grow border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center p-6 text-center hover:border-[#00d09c] hover:bg-emerald-50/30 transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                        <span className="material-symbols-outlined text-slate-400">upload_file</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700">Drag and drop logo here</p>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                                    <button className="mt-4 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">Browse Files</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location Map */}
                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-slate-700">Location Map</label>
                        <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden relative group">
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-slate-400">map</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200">
                                <p className="text-[10px] font-bold text-slate-600 uppercase">34.0522° N, 118.2437° W</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Presence */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] overflow-hidden">
                <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="text-lg font-medium text-slate-800">Social Presence</h3>
                    <p className="text-sm text-slate-500">Connect your gym's digital platforms.</p>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="input-group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <span className="material-symbols-outlined text-blue-500 text-lg">language</span>
                                Website URL
                            </label>
                            <input className={inputClass} type="url" placeholder="https://elitefitness.com" defaultValue="https://elitefitness.com" />
                        </div>
                        <div className="input-group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <span className="material-symbols-outlined text-pink-500 text-lg">photo_camera</span>
                                Instagram Handle
                            </label>
                            <input className={inputClass} type="text" placeholder="@elitefitness_la" defaultValue="@elitefitness_la" />
                        </div>
                        <div className="input-group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <span className="material-symbols-outlined text-emerald-500 text-lg">chat</span>
                                WhatsApp Number
                            </label>
                            <input className={inputClass} type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
                        <button className="bg-[#00d09c] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:opacity-90 shadow-lg shadow-emerald-100 transition-all">
                            Save Profile Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymProfile;
