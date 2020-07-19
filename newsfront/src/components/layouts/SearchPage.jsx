import React, { Component } from "react";
import SearchBlock from "./SearchBlock";
import queryString from "query-string";
import axios from "axios";
import { CardDeck, CardGroup } from "react-bootstrap";
import Spinner from "../News/Spinner";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchList: [],
    };
  }

  componentDidMount() {
    const value = queryString.parse(this.props.location.search);
    const q = value.q;

    console.log(value);
    axios
      .get(
        `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/search?q=${q}`
      )
      // http://localhost:5000/
      // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
      .then((res) => {
        this.setState({
          searchList: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { searchList } = this.state;
    console.log(searchList);
    if (searchList.length != 0) {
      return (
        <div>
          <h1 className="ml-4">Reuslts</h1>
          <CardDeck>
            {searchList.map((item) => (
              <SearchBlock key={item.id} searchItem={item} />
            ))}
          </CardDeck>
        </div>
      );
    } else {
      return (
        // <div className="text-center">
        //   <div className="spinner-border" role="status">
        //     <span className="sr-only">Loading...</span>
        //   </div>
        // </div>
        <Spinner />
      );
    }
  }
}
