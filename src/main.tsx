import React, { useState } from 'react';
import { SendButton } from './Components/SendButton';
import { Welcome } from './Components/Welcome';
import { Fee } from './Components/Fee';
import { useCurrentTime } from './Components';
import { formatTimestamp } from './utils';

import logo from './assets/logo.png';
import './main.css';


interface Guest {
    id: number;
    firstName: string;
    lastName: string;
    reservation: {
        roomNumber: number;
        startTimestamp: number;
        endTimestamp: number;
    };
}

interface Companies {
    id: number;
    company: string;
    city: string;
    timezone: string;
}

const guestsData: Guest[] = require('./Data/Guests.json');
const companiesData: Companies[] = require('./Data/Companies.json');


enum MessageType {
  Welcome = "Welcome",
  Fee = "Fee",
}
  

export const Message: React.FC = () => {
    const [guestNameInput, setGuestNameInput] = useState<string>('');
    const [selectedMessageType, setSelectedMessageType] = useState<MessageType | null>(null);
    const [selectedHotelName, setSelectedHotelName] = useState<string>('');
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState<boolean>(true);

    // handle message type change
    const handleMessageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMessageType = e.target.value as MessageType;
        setSelectedMessageType(selectedMessageType);
        checkSendButtonStatus(selectedMessageType, guestNameInput, selectedHotelName);
    };

    // handle name input change
    const handleNameInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        setGuestNameInput(selectedName);
        checkSendButtonStatus(selectedMessageType, selectedName, selectedHotelName);
    };

    // handle hotel selection change
    const handleHotelSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedHotel = e.target.value;
        setSelectedHotelName(selectedHotel);
        checkSendButtonStatus(selectedMessageType, guestNameInput, selectedHotel);
    };

    const checkSendButtonStatus = (messageType: MessageType | null, guestName: string, hotelName: string) => {
        setIsSendButtonDisabled(!messageType || !guestName || !hotelName);
    };

    // Find the data corresponding to the selected guest name directly from guestsData
    const selectedGuest = guestsData.find((guest: any) => `${guest.firstName} ${guest.lastName}` === guestNameInput);
    const roomNumber = selectedGuest ? selectedGuest.reservation.roomNumber : '';
    const reservationStart = selectedGuest ? selectedGuest.reservation.startTimestamp : 0;
    const reservationEnd = selectedGuest ? selectedGuest.reservation.endTimestamp : 0;

    return (
        <div className='container'>
            <img src={logo} alt="Logo" />
            <h1>
                InnSync Messaging Center
            </h1>
            
            <div className='dropdowns-and-email'>
                <div className='dropdowns'>
                    <h3>* Choose email type:</h3>
                    <select onChange={handleMessageTypeChange}>
                        <option>--select a message option--</option>
                        <option value={MessageType.Welcome}>Welcome Message</option>
                        <option value={MessageType.Fee}>Fee Message</option>
                    </select>

                    <h3>* Select guest name:</h3>
                    <select onChange={handleNameInputChange}>
                        <option>--select a guest--</option>
                        {guestsData.map((guest: any, index: number) => (
                        <option key={index} value={`${guest.firstName} ${guest.lastName}`}>
                            {`${guest.firstName} ${guest.lastName}`}
                        </option>
                        ))}
                    </select>

                    <h3>* Select hotel:</h3>
                    <select onChange={handleHotelSelectionChange}>
                        <option>--select a hotel--</option>
                        {companiesData.map((company: any, index: number) => (
                            <option key={index} value={company.company}>
                                {company.company}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Render the appropriate message based on selectedMessageType */}
                <div className='email'>
                    {selectedMessageType === MessageType.Welcome && (
                        <Welcome 
                            guestName={guestNameInput} 
                            hotelName={selectedHotelName} 
                            roomNumber={Number(roomNumber)} 
                            reservationStart={reservationStart} 
                            reservationEnd={reservationEnd}
                        />
                    )}

                    {selectedMessageType === MessageType.Fee && (
                        <Fee 
                            guestName={guestNameInput} 
                            hotelName={selectedHotelName} 
                            reservationStart={reservationStart} 
                            reservationEnd={reservationEnd}
                        />
                    )}
                </div>
            </div>

            <SendButton isDisabled={isSendButtonDisabled} />
        </div>
    );
};