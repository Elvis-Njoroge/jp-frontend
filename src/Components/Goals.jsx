import React,{useEffect, useState} from 'react'
import { Container, Row, Col, Button, Form, ProgressBar } from 'react-bootstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Goals =()=>{
    const[description, setDescription]=useState('')
    const[duration, setDuration]=useState('')
    const[amount, setAmount]=useState('')
    const[deadline, setDeadline]=useState('')
    const jwt = localStorage.getItem('jwt');
    const[goals,setGoals]=useState([])
    const durationOptions = ['daily', 'weekly', 'monthly','yearly','other'];

  useEffect(()=>{
      fetchGoals()
  },[])

  const fetchGoals =()=>{
    fetch('/api/v1/goals',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
    })
    .then((r)=>r.json())
    .then((data)=>{
      setGoals(data)
    })
  }

  const toggleForm = () => {
      setShowForm(!showForm);
  };

  const [showForm, setShowForm] = useState(false);
  let now = null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody= {
      goal:{
        description: description,
        duration: duration, 
        amount: amount, 
        deadline: deadline,
      },
    };

    fetch('/api/v1/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchGoals()
      setDeadline('')
      setDescription('')
      setAmount('')
      setDuration('')
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };  


return(
    <>
    <div className='page-title'>
        <h1>Goals</h1>
    </div>
    <div className='add-container'>
    <p>Add a new goal
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
                <Form.Control type="text"  onChange={(e) => setDescription (e.target.value)} placeholder=" Description" value={description}/>
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
                <Form.Control type="number"  onChange={(e) => setAmount(e.target.value)} placeholder="Amount" value={amount}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control type="date"  onChange={(e) => setDeadline(e.target.value)} placeholder="Deadline" value={deadline}/>
              </Form.Group>
            </Col>
          </Row>
            <Col className="d-flex justify-content-center form-button">
              <Button onClick={handleFormSubmit} variant="dark" type="submit">
                Add Goal
              </Button>
            </Col>
        </Form>
      </Container>
      )}
      <Container fluid style={{width:'85%'}}>
        <Row>
          {goals.map((goal) => (
            <Col key={goal.id} md={4}>
              <div className="card">
                <h6>{goal.description}</h6>
                <h6>{goal.duration}</h6>
                <h6>{goal.amount}</h6>
                <h6>{goals.deadline}</h6>
                <div>
                </div>
                    <ProgressBar now={goal.progress} label={`${now}%`} visuallyHidden />
                </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
)
}
export default Goals;