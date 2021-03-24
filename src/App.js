import React from "react";

import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import HomeProductListItem from "./HomeProductListItem";

import Firebase from "./Firebase";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      items: [],
      searchFormValue: '' // 検索フォームの内容
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  componentDidMount() {
    const firebase = new Firebase();

    const results = firebase.fetchAllProductDocuments()
    results.then((results) => {
      this.setState({
        ...this.state,
        isLoaded: true,
        items: results
      })
    })
  }

  handleSearchChange(event) {
    this.setState({ searchFormValue: event.target.value })
  }

  handleSearchSubmit(event) {
    if (this.state.searchFormValue) {
      const url = new URL('https://ec-elasticsearch-1-api.an.r.appspot.com/search')
      url.search = new URLSearchParams({ q: this.state.searchFormValue }).toString()

      this.setState({
        ...this.state,
        isLoaded: false
      })

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({
            ...this.state,
            isLoaded: true,
            items: (data.data && data.data.length > 0) ? (data.data) : [] // 検索結果があるときだけ利用する
          })
        })
    }
    event.preventDefault()
  }

  render() {
    let productsDom = <Col>
      <p>Loading...</p>
    </Col>

    const itemsDom = []
    const { isLoaded, items } = this.state
    if (isLoaded) {
      for (let i = 0; i < items.length; i++) {
        itemsDom.push(<Col key={i} xs={4}>
          <HomeProductListItem name={items[i].name} thumbnailUrl={items[i].thumbnailUrl} price={items[i].price}/>
        </Col>)
      }
      productsDom = itemsDom
    }

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.handleSearchSubmit}>
              <Form.Group>
                <Form.Control type="text" placeholder="Search" onChange={this.handleSearchChange}/>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          {productsDom}
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
    )
  }
}

export default App;
