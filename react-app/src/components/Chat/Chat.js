import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...messages,
            userMessage
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
      const aiMessage = { role: "assistant", content: data.choices[0]?.message?.content?.trim() || 'No response from AI.' };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setError('Error fetching AI response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : <i className="fas fa-robot"></i>}
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h2>AI Assistant</h2>
          </div>
          <div className="chat-body">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <p>{msg.content}</p>
                </div>
              ))}
              {loading && (
                <div className="chat-message assistant">
                  <p>Loading...</p>
                </div>
              )}
              {error && (
                <div className="chat-message error">
                  <p>{error}</p>
                </div>
              )}
            </div>
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
