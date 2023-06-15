import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Home (){

  // useEffect(()=>{
  //   fetch()
  //   .then((r)=>r.json())
  //   .then((data)=>{

  //   })
  // },[])

return(
    <>
    <Container fluid>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <div className="card">Card 1</div>
            </Col>
            <Col md={6}>
              <div className="card">Card 2</div>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <div className="card">Card 3</div>
            </Col>
            <Col md={6}>
              <div className="card">Card 4</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </>
)
}
export default Home; 