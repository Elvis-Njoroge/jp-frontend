import React from 'react';
import { Card } from 'react-bootstrap';
import { FaChartPie, FaBullseye } from 'react-icons/fa';

const FeatureCard = ({ feature }) => {
  return (
    <Card className="feature-card">
      <div className="feature-icon">
        <i className={feature.icon}></i>
      </div>
      <Card.Body>
        <Card.Title>{feature.title}</Card.Title>
        <Card.Text>{feature.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeatureCard;