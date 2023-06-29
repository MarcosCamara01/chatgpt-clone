"use client"

import React, { useState, useEffect } from 'react';
import { PrincipalInput } from './PrincipalInput';
import { useChat } from 'ai/react';
import { Messages } from './Messages';
import { FirstScreen } from './FirstScreen';

export default function HomeScreen() {
  const { messages } = useChat();
  const [messagesReady, setMessagesReady] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      setMessagesReady(true);
    }
  }, [messages]);

  return (
    <div>
      {messagesReady ? <Messages /> : <FirstScreen />}
      <PrincipalInput />
    </div>
  );
}
