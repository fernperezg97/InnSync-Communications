import React from 'react';
import { useCurrentTime } from './useCurrentTime';
import { formatTimestamp } from '../utils';

interface FeeProps {
    guestName: string;
    hotelName: string;
    reservationStart: number;
    reservationEnd: number;
}

export const Fee: React.FC<FeeProps> = ({
    guestName,
    hotelName,
    reservationStart,
    reservationEnd
}) => {
    const { timeOfDay } = useCurrentTime();

    return (
        <div>
            <h1>Fees Due Notice</h1>
            <h2>{timeOfDay}, {guestName ? guestName : '{guestName}'}!</h2>
            <p>Thank you for staying at {hotelName ? hotelName : '{hotelName}'}. Please be advised that there are outstanding fees due for your stay.</p>
            <p>We have included the details of your stay below for your convenience. Please don't hesitate to contact us if you have any questions or concerns.</p>
            <br />
            <div>
                <h3>{hotelName ? hotelName : '{hotelName}'}</h3>
                <p>Reservation started at: {reservationStart ? formatTimestamp(reservationStart) : '{startTime}'}</p>
                <p>Reservation ended at: {reservationEnd ? formatTimestamp(reservationEnd) : '{endTime}'}</p>
            </div>
        </div>
    );
};