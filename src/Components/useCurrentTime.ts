import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [timeOfDay, setTimeOfDay] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now);
            
            const currentHour = now.getHours();
            let message = '';

            // Define message based on current hour
            if (currentHour < 12) {
                message = 'Good morning';
            } else if (currentHour < 18) {
                message = 'Good afternoon';
            } else {
                message = 'Good evening';
            }

            setTimeOfDay(message);
        };

        // Update current time every second
        const timerID = setInterval(updateClock, 1000);

        // Cleanup function to clear interval when component unmounts
        return () => {
            clearInterval(timerID);
        };
    }, []);

    return { currentTime, timeOfDay };
};