// src/components/PlaceCard.jsx
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function PlaceCard({ field }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={field.image}
          alt={field.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{field.name}</Card.Title>
          <Card.Text className="text-muted small">{field.location}</Card.Text>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <Badge bg="success">{field.sport}</Badge>
            <span className="text-warning">Star {field.rating}</span>
          </div>

          <div className="mt-auto">
            <p className="h5 text-primary mb-2">AED {field.price}/hour</p>
            <Button
              variant={field.available ? "primary" : "secondary"}
              disabled={!field.available}
              onClick={() => setShow(true)}
              className="w-100"
            >
              {field.available ? "Book Now" : "Unavailable"}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Booking Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book: {field.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Sport:</strong> {field.sport}
          </p>
          <p>
            <strong>Price:</strong> AED {field.price}/hour
          </p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Select defaultValue="1">
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success">Confirm Booking</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaceCard;
