import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import purple from '../assets/purple.png';

interface Message {
  username: string;
  message: string;
}

function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
    className='chat-container'
    style={{
      minHeight: '100vh',
      backgroundImage: `url(${purple})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    }}
    >
      <Container fluid style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <Row  style={{ flexGrow: 1, marginBottom: '1rem', overflowY: 'auto' }}>
          <Col className='msg-window-mobile' >
            <ListGroup  style={{ maxHeight: '90vh'}}className='msg-list-group'>
              {messages.map((msg, index) => (
                <ListGroup.Item
                  key={index}
                  className='message-item'
                  style={{ borderRadius: '0px 10px 10px 10px', marginTop: '1rem' }}
                >
                  <strong>{msg.username}: </strong>
                  <p style={{ display: 'inline' }}>{msg.message}</p>
                </ListGroup.Item>
              ))}
              <div ref={messagesEndRef} />
            </ListGroup>
          </Col>
        </Row>
        <Row className='d-flex align-items-end'>
          <Col className='send-message-mobile'>
            <Form onSubmit={handleSubmit}>
              <InputGroup
                style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
              >
                <Form.Control
                  type='text'
                  value={chatText}
                  onChange={handleChange}
                  placeholder='Type your message here...'
                />
                <Button type='submit' disabled={chatText.trim() === ''}>
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
