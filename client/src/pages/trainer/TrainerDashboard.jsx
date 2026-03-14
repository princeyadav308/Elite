import React from 'react';

export default function TrainerDashboard() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e293b]">Trainer Insights</h1>
          <p className="text-slate-500 text-sm">Welcome back, Sarah. Here's your performance overview.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg text-slate-500">calendar_today</span>
            Today: Oct 24, 2024
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Clients</span>
            <div className="p-2 bg-emerald-50 text-[#00d09c] rounded-lg">
              <span className="material-symbols-outlined text-xl">groups</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1e293b]">28</span>
            <span className="text-xs font-bold text-emerald-500">+12%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sessions Today</span>
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
              <span className="material-symbols-outlined text-xl">event_available</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1e293b]">6</span>
            <span className="text-xs font-bold text-slate-500">2 completed</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Revenue</span>
            <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
              <span className="material-symbols-outlined text-xl">payments</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1e293b]">$2,450</span>
            <span className="text-xs font-bold text-emerald-500">+$180</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Client Progress</span>
            <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
              <span className="material-symbols-outlined text-xl">trending_up</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1e293b]">74%</span>
            <span className="text-xs font-bold text-emerald-500">Good</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Daily Schedule */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-[#1e293b]">Daily Schedule</h3>
              <button className="text-sm font-bold text-[#00d09c] hover:underline">Full Calendar</button>
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {/* Event 1 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-[#00d09c] rounded-full border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold text-[#00d09c] w-16">08:00 AM</div>
                      <div>
                        <p className="font-bold text-[#1e293b]">Marcus Reid</p>
                        <p className="text-xs text-slate-500">Strength Training • 60 min</p>
                      </div>
                    </div>
                    <span className="mt-2 sm:mt-0 text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded">In Progress</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-slate-200 rounded-full border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold text-slate-500 w-16">10:30 AM</div>
                      <div>
                        <p className="font-bold text-[#1e293b]">Elena Rodriguez</p>
                        <p className="text-xs text-slate-500">HIIT Shred • 45 min</p>
                      </div>
                    </div>
                    <button className="mt-2 sm:mt-0 text-xs font-bold text-[#00d09c] border border-[#00d09c] px-3 py-1 rounded hover:bg-emerald-50 transition-colors">Details</button>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-slate-200 rounded-full border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold text-slate-500 w-16">02:00 PM</div>
                      <div>
                        <p className="font-bold text-[#1e293b]">Sarah Miller</p>
                        <p className="text-xs text-slate-500">Mobility & Flex • 30 min</p>
                      </div>
                    </div>
                    <button className="mt-2 sm:mt-0 text-xs font-bold text-[#00d09c] border border-[#00d09c] px-3 py-1 rounded hover:bg-emerald-50 transition-colors">Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Engagement */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-[#1e293b]">Client Engagement</h3>
                <p className="text-xs text-slate-500">Active vs. Inactive over the last 7 days</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#00d09c]"></span>
                  <span className="text-xs font-bold text-slate-500">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                  <span className="text-xs font-bold text-slate-500">Inactive</span>
                </div>
              </div>
            </div>
            {/* Chart Graphic Placeholder */}
            <div className="h-48 w-full flex items-end gap-2 px-2 border-b border-slate-100">
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[60%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[80%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[75%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[85%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[90%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[92%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[85%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[88%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[70%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[82%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[95%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[95%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
              <div className="flex-1 bg-emerald-100 rounded-t-sm relative group h-[100%]">
                <div className="absolute bottom-0 w-full bg-[#00d09c] h-[98%] rounded-t-sm transition-all group-hover:opacity-80"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Workout Library */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[#1e293b]">Workout Library</h3>
              <span className="material-symbols-outlined text-slate-400">library_books</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Most Used Templates</p>
            <div className="space-y-4">
              <div className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:border-[#00d09c] border border-transparent transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                    <span className="material-symbols-outlined text-emerald-500">bolt</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b]">Full Body Blast</p>
                    <p className="text-[10px] text-slate-500">Used by 14 clients</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-[#00d09c]">chevron_right</span>
              </div>
              <div className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:border-[#00d09c] border border-transparent transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                    <span className="material-symbols-outlined text-orange-500">timer</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b]">HIIT Shred</p>
                    <p className="text-[10px] text-slate-500">Used by 9 clients</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-[#00d09c]">chevron_right</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 text-sm font-bold bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm">
              Browse All Templates
            </button>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-[#1e293b] mb-6">Pending Tasks</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-1 w-5 h-5 rounded border-2 border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:border-[#00d09c] transition-colors"></div>
                <div>
                  <p className="text-sm font-semibold text-[#1e293b]">Review Marcus's Nutrition Log</p>
                  <p className="text-[11px] text-red-500 font-bold">Due Today</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-1 w-5 h-5 rounded border-2 border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:border-[#00d09c] transition-colors"></div>
                <div>
                  <p className="text-sm font-semibold text-[#1e293b]">Renew Plan for Sarah Jenkins</p>
                  <p className="text-[11px] text-slate-500">Expires in 2 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-1 w-5 h-5 rounded border-2 border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:border-[#00d09c] transition-colors"></div>
                <div>
                  <p className="text-sm font-semibold text-[#1e293b]">Assign Mobility drills to Elena</p>
                  <p className="text-[11px] text-slate-500">Requested via chat</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group opacity-50 pt-2 border-t border-slate-100">
                <div className="mt-1 w-5 h-5 rounded border-2 border-[#00d09c] bg-[#00d09c] flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e293b] line-through">Confirm Monday PT Sessions</p>
                  <p className="text-[11px] text-slate-500">Completed 2h ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
