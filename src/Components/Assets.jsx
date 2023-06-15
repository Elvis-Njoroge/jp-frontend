import React, {useState,useEffect} from 'react'
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';

const Assets =()=>{

    const[name, setName]=useState('')
    const[category, setCategory]=useState('')
    const[location, setLocation]=useState('')
    const[value, setValue]=useState('')
    const[assets,setAssets]=useState([])
    const jwt = localStorage.getItem('jwt');
    let userId = null;
    const categoryOptions = ['land', 'shares', 'bonds','real_estate','other'];

    useEffect(()=>{
    if (jwt) {
      const tokenPayload = jwt.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      userId = decodedPayload.user_id;
      fetchAssets()
    }},[])

    const fetchAssets = ()=>{
      fetch('/api/v1/assets',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((r)=>r.json())
      .then((data)=>{
        setAssets(data)
      })
    }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestBody= {
      asset:{
        name: name,
        category: category, 
        value: value, 
        location: location,
      },
    };

    fetch('/api/v1/assets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchAssets()
      setName('');
      setCategory('');
      setValue('');
      setLocation('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };    


return(
    <>
    
    <div className='page-title'>
        <h1>Assets</h1>
    </div>
      <Container className="d-flex justify-content-center form-container">
        <Form className="my-form">
          <Row className="align-items-end">
            <Col>
              <Form.Group>
                <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
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
                <Form.Control type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control type="number" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
            <Col className="d-flex justify-content-center form-button">
              <Button onClick={handleFormSubmit} variant="dark" type="submit">
                Add Asset
              </Button>
            </Col>
        </Form>
      </Container>

    <Container className="d-flex justify-content-center">
      {assets.length >= 1 ? (
        <Table className="table-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.category}</td>
                <td>{asset.location}</td>
                <td>{asset.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Assets are the way to accrue wealth</p>
      )}
    </Container>  
    </>
)
}
export default Assets;