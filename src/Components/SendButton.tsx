import React from 'react';

interface SendButtonProps {
    isDisabled: boolean;
    guestName: string;
    messageType: string | null;
}

export const SendButton: React.FC<SendButtonProps> = ({ isDisabled, guestName, messageType }) => {
    const handleClick = () => {
        if (guestName && messageType) {
            alert(`Message of type ${messageType} sent to ${guestName}`);
        }
    };

    return (
        <button onClick={handleClick} disabled={isDisabled}>
            Send Message
        </button>
    );
};
