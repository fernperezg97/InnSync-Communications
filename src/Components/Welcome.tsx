import React from 'react';
import { useCurrentTime } from './useCurrentTime';
import { formatTimestamp } from '../utils';

interface WelcomeProps {
    guestName: string;
    hotelName: string;
    roomNumber: number;
    reservationStart: number;
    reservationEnd: number;
}

export const Welcome: React.FC<WelcomeProps> = ({ 
    guestName, 
    hotelName, 
    roomNumber, 
    reservationStart, 
    reservationEnd 
}) => {
    const { timeOfDay } = useCurrentTime();

    return (
        <div>
            <h1>{timeOfDay}, {guestName ? guestName  : '{guestName}'}!</h1>
            <h2>Welcome to {hotelName ? hotelName : '{hotelName}'}!</h2>
            <h3>Room {roomNumber ? roomNumber : '{roomNumber}'} is now ready for you. Enjoy your stay, and please don't hesitate to let us know if there is anything we can do to make your time with us more comfortable.</h3>
            <p>Reservation starts at: {reservationStart ? formatTimestamp(reservationStart) : '{startTime}'}</p>
            <p>Reservation ends at: {reservationEnd ? formatTimestamp(reservationEnd) : '{endTime}'}</p>
        </div>
    );
};