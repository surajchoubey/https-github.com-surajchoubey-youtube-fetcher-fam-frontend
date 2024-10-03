import React, { useState } from 'react';
import TriggerButton from './TriggerButton';
import VideoList from './VideoList';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';


const App = () => {

  const [clickFetch, setClickFetch] = useState(0);

  const handleTriggerClick = async () => {
    try {
      await axios.post('/trigger');
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
      <TriggerButton onClick={handleTriggerClick} />
      <VideoList clickFetch={clickFetch}/>
    </Container>
  );
};

export default App;
