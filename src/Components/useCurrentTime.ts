import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

// Utility function to format timestamps
export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleString('en-US', options);
}

interface UseCurrentTimeProps {
    timezone?: string; // Make timezone optional initially
}

export const useCurrentTime = ({ timezone }: UseCurrentTimeProps) => {
    // Define state variables using useState
    const [currentTime, setCurrentTime] = useState<DateTime | null>(null); // Initialize with null
    const [timeOfDay, setTimeOfDay] = useState<string>('{timeOfDayGreeting}');

    // useEffect hook to perform side effects (like fetching data) in function components
    useEffect(() => {
        // Function to update the clock and set the time of day message
        const updateClock = () => {
            try {
                if (timezone) {
                    // Get the current time in the specified timezone using luxon
                    const currentDateTime = DateTime.now().setZone(timezone);

                    // Update currentTime state with the current DateTime object
                    setCurrentTime(currentDateTime);

                    // Extract the current hour
                    const currentHour = currentDateTime.hour;

                    let message = '';

                    // Determine the appropriate greeting message based on the current hour
                    if (currentHour < 12) {
                        message = 'Good morning';
                    } else if (currentHour < 18) {
                        message = 'Good afternoon';
                    } else {
                        message = 'Good evening';
                    }

                    // Update the timeOfDay state with the appropriate greeting message
                    setTimeOfDay(message);
                } else {
                    // Clear current time and time of day when timezone is not defined
                    setCurrentTime(null);
                    setTimeOfDay('');
                }
            } catch (error) {
                // Handle any errors related to invalid time zones
                console.error('Invalid time zone specified:', error);
                // Clear the timeOfDay state if there's an error
                setTimeOfDay('');
            }
        };

        // Set up a timer to update the clock every second if timezone is defined
        const timerID = timezone ? setInterval(updateClock, 1000) : null;

        // Clean up function to clear the interval when the component unmounts or when the timezone changes
        return () => {
            if (timerID) {
                clearInterval(timerID);
            }
        };

    }, [timezone]); // useEffect will run again whenever the timezone changes

    // Return the current time and time of day message as an object
    return { currentTime, timeOfDay };
};