import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import UpdateModal from "./UpdateModal";

class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favFruitsArr: [],
      showModal: false,
      updateFav: {},
    };
  }

  componentDidMount = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER}/fruiting`)
      .then((results) => {
        this.setState({
          favFruitsArr: results.data,
        });
      });
  };

  deleteHandel = async (_id) => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER}/fruiting/${_id}`)
      .then((deleteData) => {
        const newFruitsArr = this.state.favFruitsArr.filter(
          (item) => item._id !== _id
        );
        this.setState({
          favFruitsArr: newFruitsArr,
        });
      });
  };

  handelDisUpModal = (fruit) => {
    this.setState({
      showModal: !this.state.showModal,
      updateFav: fruit,
    });
  };

  updateHandel = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      price: e.target.price.value,
      image: e.target.image.value,
    };

    await axios
      .put(
        `${process.env.REACT_APP_SERVER}/fruiting/${this.state.updateFav._id}`,
        body
      )
      .then((updateData) => {
        const updatedArr = this.state.favFruitsArr.map((item) => {
          if (this.state.updateFav._id === item._id) {
            item = updateData.data;
            return item;
          }
          return item;
        });
        this.setState({
          favFruitsArr: updatedArr,
        });
      });
    this.handelDisUpModal(this.state.updateFav);
  };

  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        {this.state.favFruitsArr.map((item) => {
          return (
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                  <Button
                    onClick={() => this.deleteHandel(item._id)}
                    variant="primary"
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() => this.handelDisUpModal(item)}
                    variant="primary"
                  >
                    update
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
        {this.state.showModal && (
          <div>
            <UpdateModal
              showModal={this.state.showModal}
              updateFav={this.state.updateFav}
              handelDisUpModal={this.handelDisUpModal}
              updateHandel={this.updateHandel}
            />
          </div>
        )}
      </>
    );
  }
}

export default FavFruit;
