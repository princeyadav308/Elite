import React, { useState, useRef, useEffect } from 'react';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, isSameDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { motion, AnimatePresence } from 'framer-motion';

const DateRangePicker = ({ dateRange, setDateRange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(dateRange || { from: new Date(), to: new Date() });
    const popoverRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePreset = (preset) => {
        const now = new Date();
        let range = { from: now, to: now };

        switch (preset) {
            case 'This Week':
                range = { from: startOfWeek(now), to: endOfWeek(now) };
                break;
            case 'Last Week':
                const lastWeek = subDays(now, 7);
                range = { from: startOfWeek(lastWeek), to: endOfWeek(lastWeek) };
                break;
            case 'This Month':
                range = { from: startOfMonth(now), to: endOfMonth(now) };
                break;
            case 'Year to Date':
                range = { from: startOfYear(now), to: now };
                break;
            default:
                break;
        }
        setSelectedRange(range);
        setDateRange(range);
        setIsOpen(false);
    };

    const handleSelect = (range) => {
        setSelectedRange(range);
        if (range?.from && range?.to) {
            setDateRange(range);
            // Optional: Close on selection complete if desired, currently keeping open for refinement
        }
    };

    const formatDateRange = (range) => {
        if (!range?.from) return 'Select Date Range';
        if (!range.to || isSameDay(range.from, range.to)) return format(range.from, 'MMM d, yyyy');
        return `${format(range.from, 'MMM d')} - ${format(range.to, 'MMM d, yyyy')}`;
    };

    return (
        <div className="relative" ref={popoverRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-2 h-10 px-4 rounded-xl border transition-all duration-200 hover:border-emerald-400 hover:ring-2 hover:ring-emerald-100 text-xs font-bold ${isOpen ? 'border-emerald-500 ring-1 ring-emerald-500 text-slate-900 bg-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-slate-500">calendar_month</span>
                    <span>{formatDateRange(selectedRange)}</span>
                </div>
                <span className={`material-symbols-outlined text-lg text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 flex overflow-hidden ring-1 ring-black/5"
                    >
                        {/* Sidebar Presets */}
                        <div className="w-40 bg-slate-50 border-r border-slate-100 p-2 space-y-2">
                            {['This Week', 'Last Week', 'This Month', 'Year to Date'].map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => handlePreset(preset)}
                                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-white hover:shadow-sm hover:text-[#10b981] transition-all"
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>

                        {/* Calendar */}
                        <div className="p-4">
                            <style>{`
                                .rdp { 
                                    --rdp-cell-size: 40px; 
                                    --rdp-accent-color: #10b981; 
                                    --rdp-background-color: #ecfdf5; 
                                    margin: 0; 
                                }
                                .rdp-day { width: var(--rdp-cell-size); height: var(--rdp-cell-size); }
                                .rdp-button { border-radius: 100%; }
                                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #ecfdf5; color: #10b981; font-weight: 600; }
                                .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { 
                                    background-color: #10b981; 
                                    color: white; 
                                    font-weight: 500; /* Consistent weight to prevent shift */
                                }
                                .rdp-day_range_start {
                                    border-top-left-radius: 50%;
                                    border-bottom-left-radius: 50%;
                                    border-top-right-radius: 0;
                                    border-bottom-right-radius: 0;
                                }
                                .rdp-day_range_end {
                                    border-top-left-radius: 0;
                                    border-bottom-left-radius: 0;
                                    border-top-right-radius: 50%;
                                    border-bottom-right-radius: 50%;
                                }
                                .rdp-day_range_middle { 
                                    background-color: #ecfdf5 !important; 
                                    color: #059669 !important; 
                                    border-radius: 0 !important;
                                    width: 100% !important;
                                }
                                .rdp-day_range_start.rdp-day_range_end {
                                    border-radius: 50%; /* Circle if single day range */
                                }
                            `}</style>
                            <DayPicker
                                mode="range"
                                defaultMonth={selectedRange?.from}
                                selected={selectedRange}
                                onSelect={handleSelect}
                                modifiersClassNames={{
                                    selected: 'rdp-day_selected',
                                    range_start: 'rdp-day_range_start',
                                    range_end: 'rdp-day_range_end',
                                    range_middle: 'rdp-day_range_middle'
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DateRangePicker;
