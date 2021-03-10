import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomeProductListItem = (props) => (
  <Card>
    <Card.Img variant="top" src={props.thumbnailUrl}/>
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>
        ￥{props.price}
      </Card.Text>
      <Button variant="primary">Go item</Button>
    </Card.Body>
  </Card>
)

export default HomeProductListItem
