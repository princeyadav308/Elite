import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const steps = [
    { number: 1, label: 'Gym Identity', path: '/onboarding/gym-identity' },
    { number: 2, label: 'Membership & Pricing', path: '/onboarding/membership-pricing' },
    { number: 3, label: 'Staff & Operations', path: '/onboarding/staff-operations' },
    { number: 4, label: 'Equipment & Programs', path: '/onboarding/equipment-programs' },
    { number: 5, label: 'Business Goals', path: '/onboarding/business-goals' },
    { number: 6, label: 'Review & Launch', path: '/onboarding/review-launch' },
];

const OnboardingLayout = ({ children, currentStep = 1 }) => {
    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, #c7d2fe 0%, #a7f3d0 50%, #bae6fd 100%)', backgroundAttachment: 'fixed', color: '#0f172a' }}>
            {/* Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-6 h-18 flex items-center justify-between py-4">
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#00d09c] rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                <span className="material-symbols-outlined text-2xl">fitness_center</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-800">FlexHub</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-slate-600">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-800">Alex Sterling</p>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Portfolio Owner</p>
                            </div>
                            <img
                                alt="User profile"
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo4wG0rvN3SUOFMUUtemnIkRi7-wsWwjGx8QtdYX6qs3pfU6_Gs9Gdwz5SWwDkstJXw5O0WtlwqgmN2U4XlWb3IPI7V7WAxzsZBApEbEBylbEkcJPG-gZ0_qQ5U__snPwLH1l-4yUAtId0GKg1WdgdHn9sE7ppSJoDieMGtt01yVlgmEkpbRz75oPSJC2bppuNZzBQL0Ij0ygfL-QQjVPYMDmJTLIybRUIZkKGgdwctqIn_sKH3JdDm83MXoP7JER2YJy2OxPG9tRX"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow flex items-start justify-center p-6 lg:p-10">
                <div className="w-full" style={{ maxWidth: '120rem' }}>
                    <div className="overflow-hidden" style={{ background: '#f8fafc', borderRadius: '24px', boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12), 0 8px 20px -8px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.9)' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Sidebar */}
                            <div className="lg:col-span-3 bg-slate-100/60 p-8 border-r border-slate-200">
                                <div className="mb-10">
                                    <h2 className="heading-xs text-slate-900">Add New Gym</h2>
                                    <p className="text-base text-slate-600 mt-1 leading-relaxed">Let's get your new location set up in minutes.</p>
                                </div>

                                <div className="space-y-6">
                                    {steps.map((step) => (
                                        <div
                                            key={step.number}
                                            className={clsx(
                                                "flex items-center gap-3 text-sm transition-all",
                                                step.number === currentStep ? "text-[#00d09c]" : "text-slate-500"
                                            )}
                                        >
                                            <div className={clsx(
                                                "w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold",
                                                step.number === currentStep
                                                    ? "border-[#00d09c] bg-emerald-50 text-slate-800"
                                                    : step.number < currentStep
                                                        ? "border-[#00d09c] bg-[#00d09c] text-white"
                                                        : "border-slate-300 bg-white text-slate-600"
                                            )}>
                                                {step.number < currentStep ? <span className="material-symbols-outlined text-sm">check</span> : step.number}
                                            </div>
                                            <span className="text-sm uppercase tracking-wider font-semibold">{step.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Setup Progress</p>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#00d09c] h-full transition-all duration-500 ease-out"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2 font-medium">Step {currentStep} of {steps.length} completed</p>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-9 p-8 lg:p-12">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-10">
                <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00d09c]">fitness_center</span>
                        <span className="font-bold text-slate-800">FlexHub</span>
                    </div>
                    <div className="flex gap-8 text-xs font-semibold text-slate-500">
                        <a className="hover:text-[#00d09c] transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-[#00d09c] transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-[#00d09c] transition-colors" href="#">System Status</a>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-400 mt-2 uppercase tracking-[0.2em]">© 2024 FlexHub Inc. Global Administrative Suite.</p>
                </div>
            </footer>
        </div>
    );
};

export default OnboardingLayout;
