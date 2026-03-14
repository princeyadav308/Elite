import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const LiveClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span className="text-sm font-medium text-slate-500 tabular-nums">
            {format(time, "EEE, MMM d, yyyy • h:mm:ss a")}
        </span>
    );
};

export default LiveClock;
