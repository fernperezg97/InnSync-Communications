import React from 'react';
import { useCurrentTime } from './useCurrentTime';
import messagesData from '../Data/MessageTemplates.json';

export enum MessageType {
    Welcome = "Welcome",
    Fee = "Fee",
    Reminder = "Reminder",
    Custom = "Custom",
}

interface MessageProps {
    messageType: MessageType;
    customData?: { [key: string]: string }; // customData is object with string keys and values
    guestName: string;
    hotelName: string;
    roomNumber?: string | number;
    reservationStart: string;
    reservationEnd: string;
    timezone: string;
}

export const Message: React.FC<MessageProps> = ({
    messageType,
    customData,
    guestName,
    hotelName,
    roomNumber,
    reservationStart,
    reservationEnd,
    timezone,
}) => {
    const { timeOfDay } = useCurrentTime({ timezone });

    // Retrieve message template based on messageType from messagesData JSON
    const messageTemplate = messageType === MessageType.Custom ? customData : messagesData[messageType]?.template;

    // Render message content dynamically using messageTemplate and current data
    const renderMessageContent = () => {
        if (!messageTemplate) {
            return <p>Message template not found for {messageType}</p>;
        }

        // Replace placeholders in messageTemplate with customer data
        const replacePlaceholders = (text: string) => {
            return text.replace(/\{([^}]+)\}/g, (_, placeholder) => {
                switch (placeholder) {
                    case 'timeOfDayGreeting':
                        return timeOfDay;
                    case 'guestName':
                        return guestName;
                    case 'hotelName':
                        return hotelName || '{hotelName}';
                    case 'roomNumber':
                        return roomNumber?.toString() || '{roomNumber}';
                    case 'reservationStart':
                        return reservationStart;
                    case 'reservationEnd':
                        return reservationEnd;
                    default:
                        return `{${placeholder}}`; // if placeholder not found, return original
                }
            });
        };

        // Dynamically generate message content based on messageTemplate properties
        const messageContent = Object.keys(messageTemplate).map((key) => {
            const templateText = messageTemplate[key as keyof typeof messageTemplate];
            return (
                <p key={key} dangerouslySetInnerHTML={{ __html: replacePlaceholders(templateText) }} />
            );
        });

        return <div>{messageContent}</div>;
    };

    return (
        <div>
            {renderMessageContent()}
        </div>
    );
};