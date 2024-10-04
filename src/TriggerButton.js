import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const TriggerButton = ({ onClick, loading }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (loading && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (loading === false) {
      clearInterval(timer);
    } else {
      setCountdown(0);
    }

    return () => clearInterval(timer);
  }, [loading, countdown]);

  useEffect(() => {
    if (!loading) {
      setCountdown(60);
    }
  }, [loading]);

  return (
    <Button variant="danger" onClick={onClick} className={`my-2 ${loading ? 'disabled' : ''}`}>
      {loading ? (
        <h1><b> Fetching... Wait ~{countdown}s </b></h1>
      ) : (
        <h1><b> Fetch YouTube </b></h1>
      )}
    </Button>
  );
};

export default TriggerButton;

