import React, { Component } from "react";
import commentBox from "commentbox.io";
import queryString from "query-string";
import { uuidv4 } from "react-uuid";
// Comment-Project-ID: 5746809972457472-proj
// const Comment = (props) => {
// }
export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.commentId);
    this.removeCommentBox = commentBox("5746809972457472-proj", {
      defaultBoxId: `${this.props.commentId}`, // the default ID to associate to the div
    });
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  render() {
    return <div className="commentbox" />;
  }
}
