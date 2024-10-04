import React, { useState } from 'react';
import TriggerButton from './TriggerButton';
import VideoList from './VideoList';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';


const App = () => {

  const [clickFetch, setClickFetch] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTriggerClick = async () => {
    try {
      setLoading(true);
      await axios.post('/trigger');
      setLoading(false);
      alert('YouTube fetch triggered!');
      setClickFetch(clickFetch + 1);
    } catch (e) {
      alert("ERROR: " + e)
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-2 bg-dark text-light rounded">
        <h1 className="text-center">YouTube Video Fetcher</h1>
      </Row>
      <TriggerButton onClick={handleTriggerClick} loading={loading} />
      <VideoList clickFetch={clickFetch} setClickFetch={setClickFetch} />
    </Container>
  );
};

export default App;
