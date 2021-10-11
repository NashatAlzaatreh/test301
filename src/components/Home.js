import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitsArray: [],
    };
  }

  componentDidMount = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER}/fruits`)
      .then((results) => {
        console.log(results.data);
        this.setState({
          fruitsArray: results.data,
        });
      });
  };

  addToFav = async (name, price, image) => {
    const body = {
      name: name,
      price: price,
      image: image,
    };
    await axios.post(`${process.env.REACT_APP_SERVER}/fruiting`, body);
  };

  render() {
    console.log(this.state.fruitsArray);
    return (
      <>
        <h1>API Fruits</h1>
        {this.state.fruitsArray.map((item) => {
          return (
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                  <Button
                    onClick={() =>
                      this.addToFav(item.name, item.price, item.image)
                    }
                    variant="primary"
                  >
                    add to favorite
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </>
    );
  }
}

export default Home;
