import React, {useState} from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import FeatureCard from './FeatureCard';
import Login from './Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartPie, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faChartPie, faBullseye);



const Landingpage = () => {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };


  const features = [
    {
      title: 'Expense Tracking',
      description: 'Track your expenses and manage your budget with ease.',
      icon: <FontAwesomeIcon icon="chart-pie" />,
    },
    {
      title: 'Goal Setting',
      description: 'Set financial goals and monitor your progress towards achieving them.',
      icon: <FontAwesomeIcon icon="bullseye" />,
    },
    {
      title: 'Asset Management',
      description: 'Manage and keep track of the assets in your portfolio efficiently.',
      icon: <FontAwesomeIcon icon="chart-pie" />,
    }
  ];

  return (
    <>
      <div className="landing-page">
        <div className="hero-section">
          <Container>
            <div className='main-title'>
                <h2 style={{fontSize:'60px'}}>Jipange</h2>
            </div>
            <Row>
              <Col md={6}>
                <h1>Take Control of Your Finances</h1>
                <p>Start managing your personal budget and achieving your financial goals with our powerful web app.</p>
                <p>Already a member? <Button onClick={handleOpenLoginModal} variant="primary">Log in</Button> </p>
                {/*  */}
              </Col>
              <Col md={6}>
                <img src="https://discovertemplate.com/wp-content/uploads/2020/09/DT_G33_Finance-Animated-GIF-Icon-pack.gif" alt="Hero" style={{width:'450px', marginBottom:'10px'}} />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="features-section">
          <Container>
            <h2>Key Features</h2>
            <Row>
              {features.map((feature, index) => (
                <Col key={index} md={4}>
                  <FeatureCard feature={feature} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <div className="cta-section">
          <Container>
            <h2>Ready to Get Started?</h2>
            <p>Create your account today and experience the benefits of our personal finance web app.</p>
            <Button onClick={handleOpenLoginModal} variant="primary">Sign Up</Button>
          </Container>
        </div>
      </div>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Landingpage;