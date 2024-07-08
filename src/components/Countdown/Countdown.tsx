"use client"
import { useEffect, useState } from "react";

interface CountdownProps {
    targetDate: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [isClient, setIsClient] = useState(false);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isClient) {
        return null;    
    }

    return (
        <div>
            {Object.keys(timeLeft).map((interval) => (
                <span key={interval} className="text-red-800">
                    {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
                </span>
            ))}
        </div>
    );
};