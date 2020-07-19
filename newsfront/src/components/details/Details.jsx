import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";
import queryString from "query-string";
import Moment from "react-moment";
import {
  FacebookIcon,
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
} from "react-share";
// import Bookmark from "../Navbars/Bookmark";
import ReadMore from "@jamespotz/react-simple-readmore";
import truncate from "lodash/truncate";
import Comment from "./Comment";
// import { Spinner, Container } from "react-bootstrap";
import IsBookMarkDetail from "./IsBookMarkDetail";
import NotBookMarkDetail from "./NotBookMarkDetai";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../News/Spinner";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookMarked: false,
      detailNews: {},
      detailDescription: "",
      detailId: "",
      hidden: false,
    };
  }

  AddToBookMark = () => {
    if (localStorage.getItem(JSON.stringify(this.state.detailId)) === null) {
      localStorage.setItem(
        JSON.stringify(this.state.detailId),
        JSON.stringify(this.state.detailNews)
      );
      this.setState({
        isBookMarked: true,
      });
      toast(`Saving ${this.state.detailNews.detailTitle}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      localStorage.removeItem(JSON.stringify(this.state.detailId));
      this.setState({
        isBookMarked: false,
      });
      toast(`Removing - ${this.state.detailNews.detailTitle}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    // localStorage.getItem(JSON.stringify(this.state.detailId)) === null
    //   ? this.setState({
    //       isBookMarked: false,
    //     })
    //   : this.setState({
    //       isBookMarked: true,
    //     });
  };
  // toastAdd = () =>
  //   toast("🦄 Wow so easy!", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // 父组件是一个页面，子组件是这个页面里面的评论区。在父组件里面先获取这个页面的url的参数，然后用把这个参数传给子组件。
  componentDidMount() {
    // const value = queryString.parse(this.props.location.search);
    // const id = value.id;
    const param = window.location.search.slice(4, 9);
    if (param === "https") {
      localStorage.setItem("guardianChecked", false);
    } else {
      localStorage.setItem("guardianChecked", true);
    }
    console.log(param);
    if (localStorage.getItem("guardianChecked") === "true") {
      const value = queryString.parse(this.props.location.search);
      const id = value.id;
      axios
        .get(
          `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/article?id=${id}`,
          {
            // http://localhost:5000/
            // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
            // 18.205.29.119
            // ec2-18-205-29-119.compute-1.amazonaws.com
            headers: {
              guardianChecked: 1,
            },
          }
        )
        .then((res) => {
          this.setState({
            detailNews: res.data,
            detailDescription: res.data.detailDescription,
            detailId: res.data.detailId,
            hidden: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      const value = queryString.parse(this.props.location.search);
      const id = value.id;
      axios
        .get(
          `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/article?id=${id}`,
          {
            // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
            headers: {
              guardianChecked: 2,
            },
          }
        )
        .then((res) => {
          console.log("res.data");
          console.log(res.data);
          this.setState({
            detailNews: res.data,
            detailDescription: res.data.detailDescription,
            detailId: res.data.detailId,
            hidden: true,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { detailId } = this.state;
    if (detailId.length != 0) {
      return (
        <div>
          <div className="card m-3">
            <h4 className="card-title mt-2 ml-2 font-italic">
              {this.state.detailNews.detailTitle}
            </h4>
            <div className="d-flex bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <Moment className="font-italic" format="MM/DD/YYYY">
                  {this.state.detailNews.detailDate}
                </Moment>
                <br />
              </div>
              <div className="ml-auto p-2 bd-highlight">
                {/* -------------------------------------share----------------------------------------- */}
                <div className="container px-lg-5 border-0">
                  <div className="row mx-lg-n5">
                    <div className="col py-3 px-lg-3 border border-0">
                      <a data-tip="Facebook">
                        <ReactTooltip effect="solid" style={extraClass} />
                        <FacebookShareButton
                          url={this.state.detailNews.detailUrl}
                          hashtag="#CSCI_571_NewsApp"
                          className="button"
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                      </a>
                    </div>
                    <div
                      className="col py-3 px-lg-3 border  border-0"
                      // data-toggle="tooltip"
                      // data-placement="top"
                      // title="Twitter"
                    >
                      <a data-tip="Twitter">
                        <ReactTooltip effect="solid" style={extraClass} />
                        <TwitterShareButton
                          url={this.state.detailNews.detailUrl}
                          hashtags={["CSCI_571_NewsApp"]}
                          className="button"
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>{" "}
                      </a>
                    </div>
                    <div className="col py-3 px-lg-3 border  border-0">
                      <a data-tip="Email">
                        <ReactTooltip effect="solid" style={extraClass} />
                        <EmailShareButton
                          url={this.state.detailNews.detailUrl}
                          subject="#CSCI_571_NewsApp"
                          body=""
                          separator=""
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Email"
                        >
                          <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                      </a>
                    </div>
                    <div className="col py-3 px-lg-5 border  border-0">
                      <a data-tip="Bookmark">
                        <ReactTooltip effect="solid" style={extraClass} />
                        <button
                          style={bookMarkButtonStyle}
                          onClick={this.AddToBookMark}
                        >
                          {localStorage.getItem(
                            JSON.stringify(this.state.detailId)
                          ) === null ? (
                            <NotBookMarkDetail />
                          ) : (
                            <IsBookMarkDetail />
                          )}
                        </button>
                        <ToastContainer
                          transition={Zoom}
                          position="top-center"
                          autoClose={500}
                          hideProgressBar
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnVisibilityChange
                          draggable
                          pauseOnHover
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ml-3 mr-3">
              <img
                src={this.state.detailNews.detailImg}
                className="card-img-top rounded "
                alt="..."
              />
            </div>

            <div className="card-body">
              {/* https://www.npmjs.com/package/@jamespotz/react-simple-readmore */}
              <div>
                <ReadMore
                  btnStyles={{
                    border: "none",
                    background: "#ffffff",
                    float: "right",
                    fontSize: "x-large",
                  }}
                  minHeight={50}
                  defaultShownOnLess={
                    <p
                      dangerouslySetInnerHTML={{
                        __html: truncate(`${this.state.detailDescription}`, {
                          length: 900,
                        }),
                      }}
                    />
                  }
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${this.state.detailDescription}`,
                    }}
                  />
                </ReadMore>
              </div>
            </div>
          </div>
          <Comment commentId={this.state.detailId} />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const bookMarkButtonStyle = {
  background: "none",
  border: "none",
};

const extraClass = {
  font: "20px !important",
};
