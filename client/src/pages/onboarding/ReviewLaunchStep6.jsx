import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OnboardingLayout from '../../layouts/OnboardingLayout';

const ReviewLaunchStep6 = () => {
    const [agreed, setAgreed] = useState(false);
    const [launched, setLaunched] = useState(false);

    const sections = [
        {
            icon: 'storefront',
            title: 'Gym Identity',
            step: 1,
            path: '/onboarding/gym-identity',
            items: [
                { label: 'Gym Name', value: 'FlexHub Fitness Center' },
                { label: 'Tagline', value: 'Where Champions Are Made' },
                { label: 'Address', value: '123 Fitness Avenue, Suite 400, Los Angeles, CA 90001' },
                { label: 'Phone', value: '+1 (310) 555-0199' },
                { label: 'Email', value: 'info@flexhub.com' },
                { label: 'Operating Hours', value: 'Mon–Sat: 5:00 AM – 11:00 PM · Sun: 7:00 AM – 9:00 PM' },
                { label: 'Facility Size', value: '15,000 sq ft' },
            ],
        },
        {
            icon: 'card_membership',
            title: 'Membership & Pricing',
            step: 2,
            path: '/onboarding/membership-pricing',
            items: [
                { label: 'Basic Monthly', value: '$29/mo · $299/yr' },
                { label: 'Premium Monthly', value: '$59/mo · $599/yr' },
                { label: 'VIP Unlimited', value: '$99/mo · $999/yr' },
                { label: 'Registration Fee', value: '$50 one-time' },
                { label: 'Free Trial', value: '7 Days' },
                { label: 'Late Payment Grace', value: '7 Days · $10 late fee' },
            ],
        },
        {
            icon: 'badge',
            title: 'Staff & Operations',
            step: 3,
            path: '/onboarding/staff-operations',
            items: [
                { label: 'Managers', value: '2 staff · Full ops access' },
                { label: 'Trainers', value: '5 staff · Client management access' },
                { label: 'Front Desk', value: '3 staff · Check-in & inquiry access' },
                { label: 'Shifts', value: 'Morning 6 AM–2 PM · Evening 2 PM–10 PM' },
                { label: 'Check-in', value: 'QR Code, RFID Card, Fingerprint' },
                { label: 'Notifications', value: 'Email, SMS, Push, WhatsApp' },
            ],
        },
        {
            icon: 'fitness_center',
            title: 'Equipment & Programs',
            step: 4,
            path: '/onboarding/equipment-programs',
            items: [
                { label: 'Cardio Zone', value: 'Treadmill x6, Elliptical x4, Bike x5, Rower x3' },
                { label: 'Strength Zone', value: 'Bench x3, Squat Rack x4, Dumbbells, Cable Machine x2' },
                { label: 'Group Classes', value: 'Yoga Flow, HIIT Blast, Spin Cycling' },
                { label: 'PT Sessions', value: '$50/session · 5-pack $225 · 10-pack $400' },
                { label: 'Amenities', value: 'Pool, Sauna, Steam Room, Juice Bar, Pro Shop, Parking' },
            ],
        },
        {
            icon: 'trending_up',
            title: 'Business Goals',
            step: 5,
            path: '/onboarding/business-goals',
            items: [
                { label: 'Monthly Revenue Goal', value: '$50,000' },
                { label: 'Annual Revenue Goal', value: '$600,000' },
                { label: 'Target Profit Margin', value: '25%' },
                { label: '12-Month Member Target', value: '500 members' },
                { label: 'Retention Target', value: '85%' },
                { label: 'Marketing Budget', value: '$3,000/mo · CAC target $50' },
            ],
        },
    ];

    return (
        <OnboardingLayout currentStep={6}>
            <div className="mb-8">
                <h1 className="heading-sm text-slate-900 uppercase tracking-tight">Review &amp; Launch</h1>
                <p className="text-base text-slate-700 mt-2">Review your setup details below. Click Edit on any section to make changes.</p>
            </div>

            {launched ? (
                /* Success State */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 bg-[#00d09c] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-200 animate-bounce">
                        <span className="material-symbols-outlined text-white text-5xl">rocket_launch</span>
                    </div>
                    <h2 className="heading-sm text-slate-900 mb-3">You're All Set! 🎉</h2>
                    <p className="text-lg text-slate-600 max-w-md mb-8">
                        FlexHub Fitness Center is now live on ELITE. Your dashboard is ready and packed with powerful tools to run your gym.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-lg">
                        {[
                            { icon: 'dashboard', label: 'Dashboard Ready', color: 'text-blue-500' },
                            { icon: 'people', label: 'Members Portal', color: 'text-purple-500' },
                            { icon: 'analytics', label: 'Analytics Live', color: 'text-orange-500' },
                        ].map(item => (
                            <div key={item.label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                                <span className={`material-symbols-outlined text-2xl ${item.color} mb-1`}>{item.icon}</span>
                                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        className="bg-[#00d09c] text-white py-4 px-12 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        Go to Dashboard
                    </button>
                </div>
            ) : (
                /* Review State */
                <div className="space-y-8">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#00d09c] text-lg">{section.icon}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{section.title}</h3>
                                </div>
                                <Link
                                    to={section.path}
                                    className="flex items-center gap-1.5 text-xs font-bold text-[#00d09c] hover:text-emerald-600 transition-colors uppercase tracking-wider"
                                >
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    Edit
                                </Link>
                            </div>
                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    {section.items.map((item) => (
                                        <div key={item.label} className="flex justify-between items-start py-2 border-b border-slate-50 last:border-0">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-4">{item.label}</span>
                                            <span className="text-sm font-semibold text-slate-800 text-right">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Readiness Checklist */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#00d09c] text-lg">checklist</span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Launch Readiness</h3>
                            </div>
                        </div>
                        <div className="px-6 py-4 space-y-3">
                            {[
                                { label: 'Gym profile complete', done: true },
                                { label: 'Membership tiers configured', done: true },
                                { label: 'Staff roles assigned', done: true },
                                { label: 'Equipment inventory added', done: true },
                                { label: 'Business goals defined', done: true },
                            ].map(check => (
                                <div key={check.label} className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${check.done ? 'bg-[#00d09c]' : 'bg-slate-200'}`}>
                                        <span className="material-symbols-outlined text-white text-sm">check</span>
                                    </div>
                                    <span className={`text-sm font-semibold ${check.done ? 'text-slate-800' : 'text-slate-400'}`}>{check.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Agreement */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100 p-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-0.5 w-5 h-5 text-[#00d09c] border-slate-300 rounded focus:ring-[#00d09c]"
                            />
                            <span className="text-sm text-slate-700 leading-relaxed">
                                I confirm that all the information provided is accurate and I agree to the{' '}
                                <a href="#" className="font-bold text-[#00d09c] hover:underline">Terms of Service</a>{' '}
                                and{' '}
                                <a href="#" className="font-bold text-[#00d09c] hover:underline">Privacy Policy</a>.
                                I understand that this setup will initialize my gym management dashboard.
                            </span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link
                            to="/onboarding/business-goals"
                            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            Back to Step 5
                        </Link>
                        <button
                            type="button"
                            disabled={!agreed}
                            onClick={() => setLaunched(true)}
                            className={`w-full sm:w-auto md:px-12 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${agreed
                                ? 'bg-[#00d09c] text-white shadow-xl shadow-emerald-200 hover:opacity-90'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            <span className="material-symbols-outlined">rocket_launch</span>
                            Launch Your Gym
                        </button>
                    </div>
                </div>
            )}
        </OnboardingLayout>
    );
};

export default ReviewLaunchStep6;
