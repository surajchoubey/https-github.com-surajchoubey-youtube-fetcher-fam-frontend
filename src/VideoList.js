import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
}

const VideoList = ({ clickFetch }) => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [beforeDate, setBeforeDate] = useState('');
  const [afterDate, setAfterDate] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, [page, searchText, beforeDate, afterDate, clickFetch]);

  const fetchVideos = async () => {
    try {
        setVideos([]);
        const response = await axios.get('/', {
            params: {
                page: page,
                search_text: searchText,
                before_date: beforeDate,
                after_date: afterDate,
            },
        });
        setVideos(response.data.videos);
        setTotalPages(response.data.total_pages);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
  }

  return (
    <div>
      <Form className="mb-3">
        <Row className="mb-3 align-items-center">
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => { setPage(1); setSearchText(e.target.value); }}
            />
          </Col>
          <Col xs={1}>
            AFTER
          </Col>
          <Col xs={2}>
            <Form.Group controlId="formBasicDate">
              <Form.Control
                type="date"
                value={afterDate}
                onChange={(e) => { setPage(1); setAfterDate(e.target.value) }}
              />
            </Form.Group>
          </Col>
          <Col xs={1}>
            BEFORE
          </Col>
          <Col xs={2}>
            <Form.Group controlId="formBasicDate">
              <Form.Control
                type="date"
                value={beforeDate}
                onChange={(e) => { setPage(1); setBeforeDate(e.target.value) }}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={() => { setAfterDate(''); setBeforeDate(''); setSearchText(''); }} className='my-2'>
                Restore Defaults
            </Button>
          </Col>
        </Row>
        <Row className='mb-3'>
            <Col xs={12} className='d-flex justify-content-center'>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === page}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                    ))}
                </Pagination>
            </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Channel</th>
            <th>Published At</th>
          </tr>
        </thead>
        <tbody>
          {videos && videos.length > 0 && videos.map((video) => (
            <tr key={video.videoId}>
              <td>
                <img src={video.thumbnail} alt={video.title} width="100" />
              </td>
              <td>{video.title}</td>
              <td>{video.channelTitle}</td>
              <td>{formatDate(video.publishedAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VideoList;
