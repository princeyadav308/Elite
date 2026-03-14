import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingLayout from '../../layouts/OnboardingLayout';

const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:ring-[#00d09c] focus:border-[#00d09c] transition-all placeholder:text-slate-400 outline-none";
const labelClass = "block text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-2";

const EquipmentProgramsStep4 = () => {
    return (
        <OnboardingLayout currentStep={4}>
            <div className="mb-8">
                <h1 className="heading-sm text-slate-900 uppercase tracking-tight">Equipment &amp; Programs</h1>
                <p className="text-base text-slate-700 mt-2">List your gym equipment and configure fitness programs &amp; classes.</p>
            </div>

            <form className="space-y-12">
                {/* Equipment Zones */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">fitness_center</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Equipment Zones</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { zone: 'Cardio Zone', items: ['Treadmill x6', 'Elliptical x4', 'Stationary Bike x5', 'Rowing Machine x3'] },
                            { zone: 'Strength Zone', items: ['Bench Press x3', 'Squat Rack x4', 'Dumbbells (5-100 lbs)', 'Cable Machine x2'] },
                            { zone: 'Functional Training', items: ['Kettlebells Set', 'Battle Ropes x2', 'TRX Station x4', 'Plyo Boxes'] },
                        ].map((zone) => (
                            <div key={zone.zone} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{zone.zone}</h4>
                                    <span className="text-xs font-bold text-slate-500">{zone.items.length} items</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {zone.items.map(item => (
                                        <button key={item} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{item}</button>
                                    ))}
                                    <button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-xs font-bold text-slate-500 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">
                                        + Add Item
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button className="flex items-center gap-2 text-sm font-bold text-[#00d09c] hover:text-emerald-600 transition-colors" type="button">
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Add Another Zone
                        </button>
                    </div>
                </section>

                {/* Group Classes */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">groups</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Group Classes</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Yoga Flow', duration: '60', capacity: '20', schedule: 'Mon, Wed, Fri — 7:00 AM' },
                            { name: 'HIIT Blast', duration: '45', capacity: '15', schedule: 'Tue, Thu — 6:30 PM' },
                            { name: 'Spin Cycling', duration: '40', capacity: '12', schedule: 'Mon, Wed, Sat — 8:00 AM' },
                        ].map((cls) => (
                            <div key={cls.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <label className={labelClass}>Class Name</label>
                                        <input className={inputClass} type="text" defaultValue={cls.name} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Duration (min)</label>
                                        <input className={inputClass} type="number" defaultValue={cls.duration} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Max Capacity</label>
                                        <input className={inputClass} type="number" defaultValue={cls.capacity} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Schedule</label>
                                        <input className={inputClass} type="text" defaultValue={cls.schedule} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="flex items-center gap-2 text-sm font-bold text-[#00d09c] hover:text-emerald-600 transition-colors" type="button">
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Add Another Class
                        </button>
                    </div>
                </section>

                {/* Personal Training Packages */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">sports_martial_arts</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Personal Training Packages</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Single Session Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="50" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>5-Session Pack</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="225" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>10-Session Pack</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="400" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Session Duration (min)</label>
                            <select className={inputClass}>
                                <option>30 Minutes</option>
                                <option>45 Minutes</option>
                                <option selected>60 Minutes</option>
                                <option>90 Minutes</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Max Clients per Trainer</label>
                            <input className={inputClass} type="number" defaultValue="8" placeholder="e.g. 8" />
                        </div>
                        <div>
                            <label className={labelClass}>Cancellation Policy</label>
                            <select className={inputClass}>
                                <option>No Cancellation Fee</option>
                                <option selected>24hr Notice Required (50% fee)</option>
                                <option>48hr Notice Required (full refund)</option>
                                <option>Non-refundable</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Amenities & Extras */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">spa</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Amenities &amp; Extras</h3>
                    </div>
                    <div>
                        <label className={labelClass}>Available Amenities (Select all that apply)</label>
                        <div className="flex flex-wrap gap-2">
                            {['Swimming Pool', 'Sauna', 'Steam Room', 'Juice Bar', 'Pro Shop', 'Towel Service', 'Parking', 'Shower Rooms', 'Childcare', 'Lounge Area'].map(amenity => (
                                <button key={amenity} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{amenity}</button>
                            ))}
                            {['Basketball Court', 'Rock Climbing Wall', 'Boxing Ring'].map(amenity => (
                                <button key={amenity} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{amenity}</button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        to="/onboarding/staff-operations"
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Step 3
                    </Link>
                    <Link
                        to="/onboarding/business-goals"
                        className="w-full sm:w-auto md:px-12 bg-[#00d09c] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                        Save &amp; Continue to Step 5
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </form>
        </OnboardingLayout>
    );
};

export default EquipmentProgramsStep4;
