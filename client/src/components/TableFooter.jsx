import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TableFooter({
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    label = "items"
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Don't render pagination if there's no data
    if (totalItems === 0) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="px-6 py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 mt-auto">
            <p className="text-sm font-medium text-slate-500">
                Showing <span className="text-slate-800 font-bold">{startItem}</span> - <span className="text-slate-800 font-bold">{endItem}</span> of <span className="text-slate-800 font-bold">{totalItems}</span> {label}
            </p>

            <div className="flex items-center gap-2">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-[#10b981] transition-all disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <motion.button
                            key={page}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${currentPage === page
                                    ? 'bg-[#10b981] text-white shadow-md shadow-emerald-500/20'
                                    : 'hover:bg-slate-100 text-slate-600'
                                }`}
                        >
                            {page}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#10b981] transition-all disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
