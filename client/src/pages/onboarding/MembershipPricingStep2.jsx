import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingLayout from '../../layouts/OnboardingLayout';

const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:ring-[#00d09c] focus:border-[#00d09c] transition-all placeholder:text-slate-400 outline-none";
const labelClass = "block text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-2";

const MembershipPricingStep2 = () => {
    return (
        <OnboardingLayout currentStep={2}>
            <div className="mb-8">
                <h1 className="heading-sm text-slate-900 uppercase tracking-tight">Membership &amp; Pricing</h1>
                <p className="text-base text-slate-700 mt-2">Define your membership tiers, pricing, and billing preferences.</p>
            </div>

            <form className="space-y-12">
                {/* Membership Tiers */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">card_membership</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Membership Tiers</h3>
                    </div>

                    {/* Tier 1 — Basic */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Tier 1 — Basic</h4>
                            <span className="text-xs font-bold text-[#00d09c] bg-emerald-50 px-3 py-1 rounded-full">Active</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClass}>Plan Name</label>
                                <input className={inputClass} placeholder="e.g. Basic Monthly" type="text" defaultValue="Basic Monthly" />
                            </div>
                            <div>
                                <label className={labelClass}>Monthly Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                    <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="29" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Annual Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                    <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="299" />
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelClass}>Included Features</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Gym Floor Access', 'Locker Room', 'Free WiFi', 'Basic Equipment'].map(feature => (
                                        <button key={feature} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{feature}</button>
                                    ))}
                                    {['Pool Access', 'Group Classes', 'Personal Trainer'].map(feature => (
                                        <button key={feature} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{feature}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tier 2 — Premium */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Tier 2 — Premium</h4>
                            <span className="text-xs font-bold text-[#00d09c] bg-emerald-50 px-3 py-1 rounded-full">Active</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClass}>Plan Name</label>
                                <input className={inputClass} placeholder="e.g. Premium Monthly" type="text" defaultValue="Premium Monthly" />
                            </div>
                            <div>
                                <label className={labelClass}>Monthly Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                    <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="59" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Annual Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                    <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="599" />
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelClass}>Included Features</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Gym Floor Access', 'Locker Room', 'Free WiFi', 'All Equipment', 'Pool Access', 'Group Classes', 'Sauna & Steam'].map(feature => (
                                        <button key={feature} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{feature}</button>
                                    ))}
                                    {['Personal Trainer', 'Nutrition Plan'].map(feature => (
                                        <button key={feature} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{feature}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tier 3 — VIP */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Tier 3 — VIP</h4>
                            <span className="text-xs font-bold text-[#00d09c] bg-emerald-50 px-3 py-1 rounded-full">Active</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClass}>Plan Name</label>
                                <input className={inputClass} placeholder="e.g. VIP Unlimited" type="text" defaultValue="VIP Unlimited" />
                            </div>
                            <div>
                                <label className={labelClass}>Monthly Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                    <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="99" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Annual Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                    <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="999" />
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelClass}>Included Features</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Gym Floor Access', 'Locker Room', 'Free WiFi', 'All Equipment', 'Pool Access', 'Group Classes', 'Sauna & Steam', 'Personal Trainer', 'Nutrition Plan', 'Guest Passes', 'Priority Booking'].map(feature => (
                                        <button key={feature} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{feature}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="mt-4 flex items-center gap-2 text-sm font-bold text-[#00d09c] hover:text-emerald-600 transition-colors" type="button">
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Add Another Tier
                    </button>
                </section>

                {/* Enrollment & Trial Settings */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">redeem</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Enrollment &amp; Trial Settings</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Registration Fee</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="50" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Free Trial Duration</label>
                            <select className={inputClass}>
                                <option>No Free Trial</option>
                                <option>3 Days</option>
                                <option selected>7 Days</option>
                                <option>14 Days</option>
                                <option>30 Days</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Freeze Policy</label>
                            <select className={inputClass}>
                                <option>No Freeze Allowed</option>
                                <option selected>1 Freeze per Year (30 days max)</option>
                                <option>2 Freezes per Year (15 days each)</option>
                                <option>Unlimited Freeze</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Payment & Billing */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">payments</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Payment &amp; Billing</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Accepted Payment Methods</label>
                            <div className="flex flex-wrap gap-2">
                                {['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer'].map(method => (
                                    <button key={method} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{method}</button>
                                ))}
                                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">Crypto</button>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Billing Cycle</label>
                            <select className={inputClass}>
                                <option selected>Monthly (1st of each month)</option>
                                <option>Monthly (Membership start date)</option>
                                <option>Bi-weekly</option>
                                <option>Weekly</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Late Payment Grace Period</label>
                            <select className={inputClass}>
                                <option>No Grace Period</option>
                                <option>3 Days</option>
                                <option selected>7 Days</option>
                                <option>14 Days</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Late Fee Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="10" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Invoice Notes (Optional)</label>
                            <textarea className={`${inputClass} h-24 resize-none`} placeholder="Any additional notes to include on member invoices..."></textarea>
                        </div>
                    </div>
                </section>

                {/* Discounts & Promotions */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">local_offer</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Discounts &amp; Promotions</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Annual Plan Discount</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} placeholder="e.g. 15" type="number" defaultValue="15" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Student Discount</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} placeholder="e.g. 10" type="number" defaultValue="10" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Corporate Tie-up Discount</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} placeholder="e.g. 20" type="number" defaultValue="20" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Referral Bonus</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} placeholder="0.00" type="number" defaultValue="25" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Promo Code</label>
                            <input className={inputClass} placeholder="e.g. NEWYEAR2026" type="text" />
                        </div>
                        <div>
                            <label className={labelClass}>Promo Discount</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} placeholder="e.g. 25" type="number" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        to="/onboarding/gym-identity"
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Step 1
                    </Link>
                    <Link
                        to="/onboarding/staff-operations"
                        className="w-full sm:w-auto md:px-12 bg-[#00d09c] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                        Save &amp; Continue to Step 3
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </form>
        </OnboardingLayout>
    );
};

export default MembershipPricingStep2;
