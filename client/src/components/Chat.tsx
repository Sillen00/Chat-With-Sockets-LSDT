import { useState } from 'react';
import { Button } from 'react-bootstrap';

function Chat() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedText(chatText);
    setChatText(''); // Clear the input after submitting
  };
  const [chatText, setChatText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
  };

  return (
    <div style={{ height: '100vh', border: '2px solid black', background: 'green' }}>
      <h1>Chat</h1>
      <p>Chat messages: {submittedText}</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          value={chatText}
          onChange={handleChange}
          placeholder='Type your message here...'
        />
        <Button type='submit'>Send</Button>
      </form>
    </div>
  );
}

export default Chat;
