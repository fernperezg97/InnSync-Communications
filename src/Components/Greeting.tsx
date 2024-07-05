import React from 'react';
import { useCurrentTime } from './useCurrentTime';
import { DateTime } from 'luxon';

interface GreetingProps {
    timezone: string;
    guestName: string;
}

export const Greeting: React.FC<GreetingProps> = ({ timezone, guestName }) => {
    const { currentTime, timeOfDay } = useCurrentTime({ timezone });

    return (
        <div>
            {timeOfDay && (
                <p>
                    {timeOfDay}, {guestName}! {currentTime ? currentTime.toLocaleString(DateTime.TIME_SIMPLE) : ''}
                </p>
            )}
        </div>
    );
};