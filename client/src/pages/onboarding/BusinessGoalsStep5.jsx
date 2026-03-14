import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingLayout from '../../layouts/OnboardingLayout';

const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:ring-[#00d09c] focus:border-[#00d09c] transition-all placeholder:text-slate-400 outline-none";
const labelClass = "block text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-2";

const BusinessGoalsStep5 = () => {
    return (
        <OnboardingLayout currentStep={5}>
            <div className="mb-8">
                <h1 className="heading-sm text-slate-900 uppercase tracking-tight">Business Goals</h1>
                <p className="text-base text-slate-700 mt-2">Set your growth targets, revenue objectives, and success metrics.</p>
            </div>

            <form className="space-y-12">
                {/* Revenue Targets */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">trending_up</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Revenue Targets</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Monthly Revenue Goal</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="50000" placeholder="e.g. 50000" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Annual Revenue Goal</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="600000" placeholder="e.g. 600000" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Target Profit Margin</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} type="number" defaultValue="25" placeholder="e.g. 25" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Monthly Operating Budget</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="35000" placeholder="e.g. 35000" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Break-Even Members</label>
                            <input className={inputClass} type="number" defaultValue="200" placeholder="e.g. 200" />
                        </div>
                        <div>
                            <label className={labelClass}>Target LTV:CAC Ratio</label>
                            <select className={inputClass}>
                                <option>2:1</option>
                                <option selected>3:1</option>
                                <option>4:1</option>
                                <option>5:1</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Growth Milestones */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">flag</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Growth Milestones</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { period: '3-Month', members: '150', revenue: '15000' },
                            { period: '6-Month', members: '300', revenue: '30000' },
                            { period: '12-Month', members: '500', revenue: '50000' },
                        ].map((milestone) => (
                            <div key={milestone.period} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                    <div>
                                        <label className={labelClass}>{milestone.period} Target</label>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#00d09c] text-lg">calendar_today</span>
                                            <span className="text-sm font-bold text-slate-800">{milestone.period}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Member Count Goal</label>
                                        <input className={inputClass} type="number" defaultValue={milestone.members} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Monthly Revenue Goal</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                            <input className={`${inputClass} pl-8`} type="number" defaultValue={milestone.revenue} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Key Performance Indicators */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">analytics</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Key Performance Indicators</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Target Retention Rate</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} type="number" defaultValue="85" placeholder="e.g. 85" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Target Occupancy Rate</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} type="number" defaultValue="70" placeholder="e.g. 70" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Target Avg Revenue/Member</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="75" placeholder="e.g. 75" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Target NPS Score</label>
                            <input className={inputClass} type="number" defaultValue="50" placeholder="e.g. 50 (out of 100)" />
                        </div>
                        <div>
                            <label className={labelClass}>Max Churn Rate</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} type="number" defaultValue="5" placeholder="e.g. 5" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Trainer Utilization Target</label>
                            <div className="relative">
                                <input className={`${inputClass} pr-8`} type="number" defaultValue="80" placeholder="e.g. 80" />
                                <span className="absolute right-3 top-3 text-slate-400 text-base font-bold">%</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Marketing & Acquisition Strategy */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">campaign</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Marketing &amp; Acquisition Strategy</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Monthly Marketing Budget</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="3000" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Target Customer Acquisition Cost</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-base font-bold">$</span>
                                <input className={`${inputClass} pl-8`} type="number" defaultValue="50" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Primary Acquisition Channels</label>
                            <div className="flex flex-wrap gap-2">
                                {['Social Media Ads', 'Google Ads', 'Referral Program', 'Local Partnerships', 'Walk-ins', 'SEO / Website'].map(channel => (
                                    <button key={channel} className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{channel}</button>
                                ))}
                                {['Influencer Marketing', 'Events / Sponsorships', 'Print Media'].map(channel => (
                                    <button key={channel} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{channel}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Notes */}
                <section>
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
                        <span className="material-symbols-outlined text-[#00d09c] text-xl">note_alt</span>
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Additional Notes</h3>
                    </div>
                    <div>
                        <label className={labelClass}>Business Vision &amp; Notes</label>
                        <textarea className={`${inputClass} h-32 resize-none`} placeholder="Describe your long-term vision, any specific goals, competitive advantages, or anything else that would help us tailor your dashboard and insights..."></textarea>
                    </div>
                </section>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        to="/onboarding/equipment-programs"
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Step 4
                    </Link>
                    <Link
                        to="/onboarding/review-launch"
                        className="w-full sm:w-auto md:px-12 bg-[#00d09c] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                        Save &amp; Continue to Review
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </form>
        </OnboardingLayout>
    );
};

export default BusinessGoalsStep5;
