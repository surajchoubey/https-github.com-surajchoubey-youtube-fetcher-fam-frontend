import React from 'react';
import { Button } from 'react-bootstrap';

const TriggerButton = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick} className='my-2'>
      <h1><b> Fetch YouTube </b></h1>
    </Button>
  );
};

export default TriggerButton;
