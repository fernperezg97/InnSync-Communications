import React, { useState } from 'react';
import { SendButton } from './Components/SendButton';
import { Message, MessageType } from './Components/Message';
import logo from './assets/logo.png';
import './main.css';
import guestsData from './Data/Guests.json';
import companiesData from './Data/Companies.json';
import { formatTimestamp } from './Components/useCurrentTime';

// interface Guest {
//     id: number;
//     firstName: string;
//     lastName: string;
//     reservation: {
//         roomNumber: number;
//         startTimestamp: number;
//         endTimestamp: number;
//     };
// }

interface Companies {
    id: number;
    company: string;
    city: string;
    timezone: string;
}

interface MessageContainerProps {
    // Define props as needed
}

export const MessageContainer: React.FC<MessageContainerProps> = () => {
    const [guestNameInput, setGuestNameInput] = useState<string>('{guestName}');
    const [selectedMessageType, setSelectedMessageType] = useState<MessageType | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<Companies | null>(null);
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState<boolean>(true);
    const [customMessageFieldsVisible, setCustomMessageFieldsVisible] = useState<boolean>(false); // State to toggle custom message fields visibility

    // State for dynamic input fields
    const [greeting, setGreeting] = useState<string>('');
    const [mainMessage, setMainMessage] = useState<string>('');
    const [closingRemarks, setClosingRemarks] = useState<string>('');

    const handleMessageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue !== '--select a message option--') {
            const messageType = selectedValue as MessageType;
            setSelectedMessageType(messageType);
            checkSendButtonStatus(messageType, guestNameInput, selectedHotel);

            // Toggle custom message fields visibility
            setCustomMessageFieldsVisible(messageType === MessageType.Custom);
        } else {
            setSelectedMessageType(null);
            setIsSendButtonDisabled(true);
            setCustomMessageFieldsVisible(false); // hide custom message fields if another option selected
        }
    };

    const handleNameInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        setGuestNameInput(selectedName);

        if (selectedName !== '--select a guest--') {
            checkSendButtonStatus(selectedMessageType, selectedName, selectedHotel);
        } else {
            setIsSendButtonDisabled(true);
        }
    };

    const handleHotelSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedHotelId = parseInt(e.target.value, 10);
        const hotel = companiesData.find(company => company.id === selectedHotelId);
        
        if (hotel) {
            setSelectedHotel(hotel);
            checkSendButtonStatus(selectedMessageType, guestNameInput, hotel);
        } else {
            setSelectedHotel(null);
            checkSendButtonStatus(selectedMessageType, guestNameInput, null);
        }
    };

    const handleCustomInputChange = (field: string, value: string) => {
        switch (field) {
            case 'greeting':
                setGreeting(value);
                break;
            case 'mainMessage':
                setMainMessage(value);
                break;
            case 'closingRemarks':
                setClosingRemarks(value);
                break;
            default:
                break;
        }
    };

    const checkSendButtonStatus = (messageType: MessageType | null, guestName: string, hotel: Companies | null) => {
        setIsSendButtonDisabled(!messageType || guestName === '--select a guest--' || !hotel);
    };

    // Prepare custom data based on selected message type and input fields
    const prepareCustomData = () => {
        switch (selectedMessageType) {
            case MessageType.Reminder:
                return { reminderDate: 'Tomorrow' };
            case MessageType.Welcome:
            case MessageType.Custom: // Handle custom message
                const companyName = selectedHotel?.company ? selectedHotel.company : "--select a hotel--";
                return {
                    greeting: greeting + guestNameInput + ",",
                    mainMessage,
                    closingRemarks,
                    reminderDate: '', // Ensure all keys defined,
                    selectedHotel: companyName
                };
            default:
                return undefined; // Ensure default return is undefined if no custom data
        }
    };

    const selectedGuest = guestsData.find(guest => `${guest.firstName} ${guest.lastName}` === guestNameInput);
    const roomNumber = selectedGuest ? selectedGuest.reservation.roomNumber : '{roomNumber}';
    const reservationStart = selectedGuest
        ? formatTimestamp(parseInt(selectedGuest.reservation.startTimestamp.toString()))
        : '{reservationStart}';

    const reservationEnd = selectedGuest
        ? formatTimestamp(parseInt(selectedGuest.reservation.endTimestamp.toString()))
        : '{reservationEnd}';

    const messageProps = {
        messageType: selectedMessageType || MessageType.Welcome,
        guestName: guestNameInput,
        hotelName: selectedHotel ? selectedHotel.company : '',
        roomNumber: roomNumber,
        reservationStart: reservationStart,
        reservationEnd: reservationEnd,
        timezone: selectedHotel ? selectedHotel.timezone : '',
        customData: prepareCustomData() as { [key: string]: string },
    };
    
    return (
        <div className='container'>
            <img src={logo} alt="Logo" />
            <h1>InnSync Messaging Center</h1>
            
            <div className='dropdowns-and-email'>
                <div className='dropdowns'>
                    <h3>* Choose email type:</h3>
                    <select onChange={handleMessageTypeChange}>
                        <option>--select a message option--</option>
                        <option value={MessageType.Welcome}>Welcome Message</option>
                        <option value={MessageType.Fee}>Fee Message</option>
                        <option value={MessageType.Reminder}>Reminder Message</option>
                        <option value={MessageType.Custom}>Custom Message</option> {/* custom message option */}
                        {/* can add other options as needed */}
                    </select>

                    <h3>* Select guest name:</h3>
                    <select onChange={handleNameInputChange}>
                        <option>--select a guest--</option>
                        {guestsData.map(guest => (
                            <option key={guest.id} value={`${guest.firstName} ${guest.lastName}`}>
                                {`${guest.firstName} ${guest.lastName}`}
                            </option>
                        ))}
                    </select>

                    <h3>* Select hotel:</h3>
                    <select onChange={handleHotelSelectionChange}>
                        <option>--select a hotel--</option>
                        {companiesData.map(company => (
                            <option key={company.id} value={company.id}>
                                {company.company}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Input fields for dynamic message content */}
                {customMessageFieldsVisible && (
                    <div className='dynamic-fields'>
                        <input
                            type='text'
                            placeholder='Greeting'
                            value={greeting}
                            onChange={(e) => handleCustomInputChange('greeting', e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Main Message'
                            value={mainMessage}
                            onChange={(e) => handleCustomInputChange('mainMessage', e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Closing Remarks'
                            value={closingRemarks}
                            onChange={(e) => handleCustomInputChange('closingRemarks', e.target.value)}
                        />
                    </div>
                )}

                <div className='email'>
                    {selectedMessageType && (
                        <Message {...messageProps} />
                    )}
                </div>
            </div>

            <SendButton 
                isDisabled={isSendButtonDisabled} 
                guestName={guestNameInput} 
                messageType={selectedMessageType} 
            />
        </div>
    );
};