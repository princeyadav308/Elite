import React from 'react';

export default function TrainerSchedule() {
  return (
    <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">My Schedule</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your training sessions and availability.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
            <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:bg-slate-50 transition-colors">Day</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:bg-slate-50 transition-colors">Week</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-[#00d09c] text-white shadow-sm">Month</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Calendar Area */}
        <div className="col-span-12 lg:col-span-9 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {/* Calendar Header */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="px-4 py-1.5 hover:bg-slate-100 rounded-lg text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors">Today</button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
              <h2 className="text-lg font-bold text-[#1e293b]">October 2024</h2>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-700">PT Sessions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-indigo-700">Classes</span>
              </div>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 flex-1">
            {/* Empty prefix cells for previous month */}
            {[24, 25, 26, 27, 28, 29, 30].map(day => (
              <div key={`prev-${day}`} className={`min-h-[120px] transition-colors hover:bg-slate-50 border-b border-slate-200 p-2 bg-slate-50/50 text-slate-400 ${day !== 30 ? 'border-r' : ''}`}>
                <span className="text-xs font-bold opacity-50">{day}</span>
              </div>
            ))}

            {/* Current month days (partial mock for visual) */}
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2">
              <span className="text-xs font-bold">1</span>
            </div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2">
              <span className="text-xs font-bold">2</span>
              <div className="mt-1 space-y-1">
                <span className="block text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold truncate">09:00 PT - Sarah M.</span>
                <span className="block text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold truncate">11:00 Yoga Flow</span>
              </div>
            </div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2">
              <span className="text-xs font-bold">3</span>
              <div className="mt-1 space-y-1">
                <span className="block text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold truncate">10:00 PT - Mike R.</span>
              </div>
            </div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2"><span className="text-xs font-bold">4</span></div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2">
              <span className="text-xs font-bold">5</span>
              <div className="mt-1 space-y-1">
                <span className="block text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-semibold truncate">12:00 Consult</span>
              </div>
            </div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2"><span className="text-xs font-bold">6</span></div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-b border-slate-200 p-2"><span className="text-xs font-bold">7</span></div>
            
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2"><span className="text-xs font-bold">8</span></div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2">
              <span className="text-xs font-bold">9</span>
              <div className="mt-1 space-y-1">
                <span className="block text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold truncate">08:30 PT - Emma L.</span>
              </div>
            </div>
            {/* Active Day */}
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2 bg-emerald-50/30">
              <span className="text-xs font-bold text-[#00d09c]">10</span>
              <div className="mt-1 space-y-1">
                <span className="block text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold truncate">09:00 Marcus H.</span>
                <span className="block text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold truncate">17:00 HIIT Blast</span>
              </div>
            </div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2"><span className="text-xs font-bold">11</span></div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2">
              <span className="text-xs font-bold">12</span>
              <div className="mt-1 space-y-1">
                <span className="block text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold truncate">09:00 PT - Sarah M.</span>
                <button className="text-[9px] text-[#00d09c] font-bold mt-1 block hover:underline w-full text-left">+ 3 more</button>
              </div>
            </div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-r border-b border-slate-200 p-2"><span className="text-xs font-bold">13</span></div>
            <div className="min-h-[120px] transition-colors hover:bg-slate-50 border-b border-slate-200 p-2"><span className="text-xs font-bold">14</span></div>

             {/* Filler to make Grid look complete */}
             {[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day, idx) => (
               <div key={`d-${day}`} className={`min-h-[120px] transition-colors hover:bg-slate-50 border-slate-200 p-2 ${idx % 7 !== 6 ? 'border-r' : ''} ${day <= 24 ? 'border-b' : ''}`}>
                 <span className="text-xs font-bold">{day}</span>
               </div>
             ))}
             <div className="min-h-[120px] transition-colors hover:bg-slate-50 p-2 bg-slate-50/50 text-slate-400">
               <span className="text-xs font-bold opacity-50">1</span>
             </div>
             <div className="min-h-[120px] transition-colors hover:bg-slate-50 p-2 bg-slate-50/50 text-slate-400">
               <span className="text-xs font-bold opacity-50">2</span>
             </div>
             <div className="min-h-[120px] transition-colors hover:bg-slate-50 p-2 bg-slate-50/50 text-slate-400">
               <span className="text-xs font-bold opacity-50">3</span>
             </div>
             <div className="min-h-[120px] transition-colors hover:bg-slate-50 p-2 bg-slate-50/50 text-slate-400">
               <span className="text-xs font-bold opacity-50">4</span>
             </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <button className="w-full text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2 uppercase tracking-widest bg-gradient-to-br from-[#00d09c] to-[#00b8ff] hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">add_circle</span>
            Add to Schedule
          </button>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-2">
            <div className="flex flex-col">
              <button className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-[#1e293b]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#00d09c]">calendar_month</span>
                  <span>Calendar Sync</span>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>
              <button className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-[#1e293b]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#00d09c]">settings</span>
                  <span>Availability</span>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-[#1e293b] flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">pending_actions</span>
                Requests
              </h3>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">3 NEW</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="border border-slate-200 rounded-lg p-3 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs ring-2 ring-white">EL</div>
                  <div>
                    <p className="text-xs font-bold text-[#1e293b]">Emma L.</p>
                    <p className="text-[10px] text-slate-500">PT • Today, 14:00</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#00d09c] hover:bg-[#00bf8f] text-white py-1.5 rounded text-[10px] font-bold transition-colors">Accept</button>
                  <button className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 py-1.5 rounded text-[10px] font-bold transition-colors">Decline</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-[#1e293b] mb-4 text-xs uppercase tracking-wider">Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Monthly Bookings</span>
                <span className="text-xs font-bold text-[#1e293b]">112</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00d09c] h-full w-[85%] rounded-full"></div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">Projected Revenue</span>
                <span className="text-xs font-bold text-emerald-600">$8,420</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
