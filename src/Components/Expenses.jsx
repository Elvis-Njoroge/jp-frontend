import React, {useState, useEffect}  from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';

const Expenses = () => {
    const[description, setDescription]=useState('')
    const[category, setCategory]=useState('')
    const[amount, setAmount]=useState('')
    const[date, setDate]=useState('')
    const[expenses,setExpenses] =useState([])
    const jwt = localStorage.getItem('jwt');
    let userId = null;
    const categoryOptions = ['food', 'transport', 'entertainment','housing','other'];

    useEffect(()=>{
    if (jwt) {
      const tokenPayload = jwt.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      userId = decodedPayload.user_id;
      fetchExpenses()
    }     
    },[])

    const fetchExpenses = () =>{
      fetch('/api/v1/expenses',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((r)=>r.json())
      .then((data)=>{
        setExpenses(data)
      })
    }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestBody= {
      expense:{
        description: description,
        category: category, 
        amount: amount, 
        date: date,
      },
    };

    fetch('/api/v1/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,    
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchExpenses()
      setAmount('')
      setCategory('');
      setDescription('')
      setDate('')     
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };  


  return (
    <>
      <div className='page-title'>
        <h1>Expenses</h1>
      </div>
      <Container className="d-flex justify-content-center form-container">
        <Form className="my-form">
          <Row className="align-items-end">
            <Col>
              <Form.Group>
                <Form.Control  onChange={(e) => setDescription(e.target.value)} type="text" value={description} placeholder="Description" />
              </Form.Group>
            </Col>
          <Col>
            <Form.Group>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Category</option>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
            <Col>
              <Form.Group>
                <Form.Control type="number"  onChange={(e) => setAmount(e.target.value)} placeholder="Amount" value={amount}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control type="date"  onChange={(e) => setDate(e.target.value)} placeholder="Date" value={date}/>
              </Form.Group>
            </Col>
          </Row>
            <Col className="d-flex justify-content-center form-button">
              <Button onClick={handleFormSubmit} variant="dark" type="submit">
                Add Expense
              </Button>
            </Col>
        </Form>
      </Container>
      <Container className="d-flex justify-content-center">
        <Table className="table-width">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Expenses;