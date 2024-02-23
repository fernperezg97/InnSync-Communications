import React, { useState } from 'react';

interface SendButtonProps {
    isDisabled: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ isDisabled }) => {
  const [clickTime, setClickTime] = useState<Date | null>(null);

  const handleClick = () => {
    const currentTime = new Date();
    setClickTime(currentTime);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isDisabled}>Send Message</button>
      {clickTime && (
        <p>Message sent at: {clickTime.toLocaleString()}</p>
      )}
    </div>
  );
};