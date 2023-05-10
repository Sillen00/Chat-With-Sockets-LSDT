import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import purple from '../assets/purple.png';
import { useSocket } from '../context/SocketContext';

// interface Message {
//   name: string;
//   message: string;
// }

let typingTimeout: ReturnType<typeof setTimeout> | null = null;

function Chat() {
  // const location = useLocation();
  // const { name } = location.state;
  const { messages, sendMessage, isTyping, typingName, stopTyping, name } = useSocket();
  const [message, setMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  // const [chatText, setChatText] = useState('');
  // const [messages, setMessages] = useState<Message[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setChatText(e.target.value);
  // };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (value.trim().length > 0) {
      console.log('Someone is writing more than 0 letters');
      isTyping();
    }

    if (value.length < 1) {
      console.log('Stop Typing');
      stopTyping();
    } else {
      typingTimeout = setTimeout(() => {
        stopTyping();
      }, 10_000);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${purple})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Container fluid style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <Row style={{ flexGrow: 1, marginBottom: '1rem', overflowY: 'auto' }}>
          <Col className='msg-window-mobile'>
            <ListGroup style={{ maxHeight: '90vh' }} className='msg-list-group'>
              {messages.map((msg, index) => (
                <ListGroup.Item
                  key={index}
                  className={`message-item ${
                    msg.name === name ? 'message-item-right' : 'message-item-left other'
                  }`}
                  style={{ borderRadius: '0px 10px 10px 10px', marginTop: '1rem' }}
                >
                  <strong>{msg.name}: </strong>
                  <p style={{ display: 'inline' }}>{msg.message}</p>
                </ListGroup.Item>
              ))}
              <div ref={messagesEndRef} />
            </ListGroup>
          </Col>
        </Row>
        <Row className='d-flex align-items-end'>
          <Col className='send-message-mobile'>
            {/* SHOWS WHO'S TYPING */}
            {typingName ? <div>{typingName} is typing...</div> : null}

            <Form onSubmit={handleSubmit}>
              <InputGroup style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  name='message'
                  placeholder='Write a message...'
                  type='text'
                  value={message}
                  onChange={e => {
                    handleTyping(e);
                    setMessage(e.target.value);
                  }}
                  style={{
                    flex: '1 1 auto',
                    width: '60%',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    borderRadius: '0.25rem 0 0 0.25rem',
                    border: '1px solid #ced4da',
                  }}
                />
                <Button type='submit' style={{ flex: '0 0 auto', minWidth: '6rem', width: '20%' }}>
                  Send
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
