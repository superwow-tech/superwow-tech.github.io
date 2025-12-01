"use client";

import { useState, useEffect } from "react";

export function VilniusTime() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Europe/Vilnius",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Prevent hydration mismatch by rendering nothing initially or a placeholder
    // However, since we want to show time immediately if possible, we can use a two-pass approach
    // or just accept a small flicker. For now, let's return null until mounted to be safe,
    // or better, just the time string if we can.
    // Actually, the previous implementation just rendered `time` which starts empty.

    if (!time) return <span className="opacity-0">00:00:00</span>;

    return <span className="font-mono">{time} VILNIUS</span>;
}
