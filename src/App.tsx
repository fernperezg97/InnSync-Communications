import React from 'react';
import logo from './logo.svg';
import { MessageContainer } from './main';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MessageContainer /> {/* Render Message component */}
      </header>
    </div>
  );
}
