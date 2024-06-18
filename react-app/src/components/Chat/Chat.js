import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessages([...messages, { role: 'user', content: input }]);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: input }
          ],
          max_tokens: 150
        })
      });

      if (res.status === 429) {
        setError('Too many requests. Please try again later.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessages([...messages, { role: 'assistant', content: data.choices[0].message['content'].trim() }]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setError('Error fetching AI response. Please try again.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h2>AI Assistant</h2>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <p>Loading...</p>}
            {error && <p className="chat-error">{error}</p>}
          </div>
          <div className="chat-footer">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
