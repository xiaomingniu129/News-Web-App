import React, { useState } from "react";
import { Nav, Row, Col, Toast, Button } from "react-bootstrap";
import { MdShare } from "react-icons/md";

export default function ToastShare() {
  const [show, setShow] = useState(false);
  return (
    <Row>
      <Col xs={6}>
        <div>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </div>
      </Col>
      <Col xs={6}>
        <div>
          <MdShare
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShow(true);
            }}
          />
        </div>
      </Col>
    </Row>
  );
}
