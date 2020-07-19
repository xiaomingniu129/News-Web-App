import React, { Component } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default class Bookmark extends Component {
  render() {
    let tab = window.location.pathname;
    if (tab === "/favorites") {
      return (
        <div>
          <FaBookmark color="white" size="1.5em" />
        </div>
      );
    } else {
      return (
        <div>
          <FaRegBookmark color="white" size="1.5em" />
        </div>
      );
    }
  }
}
