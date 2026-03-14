import React from 'react';

const plans = [
    {
        name: 'Starter',
        desc: 'For individual trainers',
        price: '$49',
        features: [
            { text: 'Up to 50 members', included: true },
            { text: '2 Staff accounts', included: true },
            { text: 'Basic Analytics', included: true },
            { text: 'Custom branding', included: false },
        ],
        active: false,
        buttonText: 'Switch to Starter',
    },
    {
        name: 'Business Pro',
        desc: 'Perfect for growing gyms',
        price: '$149',
        features: [
            { text: 'Up to 500 members', included: true },
            { text: '10 Staff accounts', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Mobile App Access', included: true },
        ],
        active: true,
        buttonText: 'Current Active Plan',
    },
    {
        name: 'Enterprise',
        desc: 'Full facility automation',
        price: '$299',
        features: [
            { text: 'Unlimited members', included: true },
            { text: 'Unlimited staff', included: true },
            { text: 'Real-time reports', included: true },
            { text: 'Custom Branding', included: true },
        ],
        active: false,
        buttonText: 'Upgrade to Enterprise',
    },
];

const billingHistory = [
    { date: 'Nov 15, 2024', amount: '$149.00', plan: 'Business Pro', status: 'Paid' },
    { date: 'Oct 15, 2024', amount: '$149.00', plan: 'Business Pro', status: 'Paid' },
    { date: 'Sep 15, 2024', amount: '$49.00', plan: 'Starter', status: 'Paid' },
    { date: 'Aug 15, 2024', amount: '$49.00', plan: 'Starter', status: 'Pending' },
];

const Subscriptions = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="heading-xs text-slate-800">Subscription &amp; Billing</h1>
                    <p className="text-slate-500">Manage your plan, billing cycle, and payment methods.</p>
                </div>
                <div className="bg-slate-200/50 p-1.5 rounded-xl flex items-center w-fit">
                    <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-white text-slate-800 shadow-sm transition-all">Monthly</button>
                    <button className="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700 transition-all">Yearly (Save 20%)</button>
                </div>
            </div>

            {/* Current Plan Banner */}
            <div className="bg-slate-900 text-white rounded-[20px] overflow-hidden relative shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]">
                <div className="p-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Current Plan</span>
                                <h3 className="text-2xl font-bold">Business Pro</h3>
                            </div>
                            <p className="text-slate-400 text-sm">Next renewal: <span className="text-slate-100 font-semibold">Dec 15, 2024</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-black">$149.00<span className="text-sm font-normal text-slate-400">/mo</span></p>
                            <a className="text-xs text-slate-400 hover:text-red-400 underline underline-offset-4 mt-2 inline-block transition-colors" href="#">Cancel Subscription</a>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full ${plan.active
                            ? 'border-[#00d09c] ring-4 ring-emerald-50 bg-white relative overflow-hidden'
                            : 'border-slate-100 bg-white hover:border-slate-300'
                            }`}
                    >
                        {plan.active && (
                            <div className="absolute top-4 right-4">
                                <span className="bg-emerald-100 text-[#00d09c] text-[10px] font-black px-3 py-1 rounded-full uppercase">Current</span>
                            </div>
                        )}
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-slate-800">{plan.name}</h4>
                            <p className="text-sm text-slate-500">{plan.desc}</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-3xl font-black text-slate-800">{plan.price}</span>
                            <span className="text-slate-400">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((f, fi) => (
                                <li key={fi} className={`flex items-center gap-3 text-sm ${f.included ? 'text-slate-600' : 'text-slate-400 line-through'}`}>
                                    <span className={`material-symbols-outlined text-lg ${f.included ? 'text-emerald-500' : 'text-slate-300'}`}>
                                        {f.included ? 'check_circle' : 'cancel'}
                                    </span>
                                    {f.text}
                                </li>
                            ))}
                        </ul>
                        {plan.active ? (
                            <button className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-400 font-semibold text-sm cursor-default">
                                {plan.buttonText}
                            </button>
                        ) : (
                            <button className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-[#00d09c] hover:text-[#00d09c] transition-all">
                                {plan.buttonText}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-slate-800">Payment Method</h3>
                        <p className="text-sm text-slate-500">Your primary card for monthly billing.</p>
                    </div>
                    <button className="px-5 py-2 rounded-xl bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-100 transition-all">Update Card</button>
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 max-w-md">
                        <div className="w-14 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-blue-600 tracking-widest">VISA</span>
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold text-slate-800">Visa ending in 4242</p>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Expiry: 12/26</p>
                        </div>
                        <div className="text-[#00d09c]">
                            <span className="material-symbols-outlined text-2xl">verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)] overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <h3 className="text-lg font-medium text-slate-800">Billing History</h3>
                    <p className="text-sm text-slate-500">Download and view your previous transactions.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Plan</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {billingHistory.map((b, i) => (
                                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-5 text-sm font-medium text-slate-700">{b.date}</td>
                                    <td className="px-6 py-5 text-sm font-bold text-slate-800">{b.amount}</td>
                                    <td className="px-6 py-5 text-sm text-slate-600">{b.plan}</td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${b.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${b.status === 'Paid' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <a className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#00d09c] transition-colors group" href="#">
                                            <span className="text-xs font-bold">Download PDF</span>
                                            <span className="material-symbols-outlined text-lg">download_for_offline</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-slate-50/30 border-t border-slate-50 text-center">
                    <button className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">View All Transactions</button>
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;
