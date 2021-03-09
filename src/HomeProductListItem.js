import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomeProductListItem = () => (
  <Card>
    <Card.Img variant="top" src="https://via.placeholder.com/150"/>
    <Card.Body>
      <Card.Title>Item name</Card.Title>
      <Button variant="primary">Go item</Button>
    </Card.Body>
  </Card>
)

export default HomeProductListItem
