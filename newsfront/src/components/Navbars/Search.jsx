import React, { Component } from "react";
import { Form, FormControl, Nav, Button, Navbar } from "react-bootstrap";
import { Consumer } from "../../context";
import axios from "axios";

class Search extends Component {
  state = {
    q: "",
  };

  componentDidMount() {
    axios
      .get(
        `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/search`
      )
      // http://localhost:5000/
      // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
      .then((res) => {
        // console.log(res.data);
        this.setState({
          news_list: res.data,
        });
        // console.log(this.state.news_list);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Form inline action="search">
          <FormControl
            name="q"
            type="text"
            placeholder="Enter keyword .."
            className="mr-sm-2"
          />
        </Form>
        <Button variant="outline-info">Search</Button>
      </div>
    );
  }
}

export default Search;
