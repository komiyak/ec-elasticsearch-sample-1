import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import HomeProductListItem from "./HomeProductListItem";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Search"/>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <HomeProductListItem/>
        </Col>
        <Col xs={4}>
          <HomeProductListItem/>
        </Col>
        <Col xs={4}>
          <HomeProductListItem/>
        </Col>
        <Col xs={4}>
          <HomeProductListItem/>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "32px" }}>
          <Pagination>
            <Pagination.Item key={1} active={true}>1</Pagination.Item>
            <Pagination.Item key={2}>2</Pagination.Item>
            <Pagination.Item key={3}>3</Pagination.Item>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
