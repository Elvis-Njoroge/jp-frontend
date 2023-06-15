import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Budget = () => {
    const[description, setDescription]=useState('')
    const[duration, setDuration]=useState('')
    const[amount, setAmount]=useState('')
    const [showForm, setShowForm] = useState(false);
    const [budgets,setBudgets]= useState([])
    const jwt = localStorage.getItem('jwt');
    let userId = null;
    const durationOptions = ['daily', 'weekly', 'monthly','yearly','other'];

    useEffect(()=>{
    if (jwt) {
      const tokenPayload = jwt.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      userId = decodedPayload.user_id;
      fetchBudgets()
    }},[])

    const fetchBudgets=()=>[
      fetch('/api/v1/budgets',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },        
      })
      .then((r)=>r.json())
      .then((data)=>{
        setBudgets(data);
      })
    ]

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody= {
      budget:{
        description: description, 
        duration: duration, 
        amount: amount,
      },
    };

    fetch('/api/v1/budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(requestBody),
      })
      .then((response) => response.json())
      .then((data) => {
        fetchBudgets()
        setDescription('')
        setDuration('')
        setAmount('')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };    


  return (
    <>
      <div className='page-title'>
        <h1>Budget</h1>
      </div>
        <div className='add-container'>
            <p>Create a new Budget
            <Button className="add-button" onClick={toggleForm}>
            <AddCircleIcon />
            </Button>
            </p>
        </div>
      {showForm && (
      <Container className="d-flex justify-content-center form-container">
        <Form className="my-form">
          <Row className="align-items-end">
            <Col>
              <Form.Group>
                <Form.Control type="text" placeholder=" Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </Form.Group>
            </Col>
          <Col>
            <Form.Group>
              <Form.Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="">Duration</option>
                {durationOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
            <Col>
              <Form.Group>
                <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
            <Col className="d-flex justify-content-center form-button">
              <Button onClick={handleFormSubmit} variant="dark" type="submit">
                Create Budget
              </Button>
            </Col>
        </Form>
      </Container>
      )}
      <Container fluid style={{ width: '85%' }}>
        <Row>
          {budgets.map((budget) => (
            <Col key={budget.id} md={4}>
              <div className="card">
                <h5>{budget.description}</h5>
                <h6>{budget.duration}</h6>
                <h6>{budget.amount}</h6>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Budget;