import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import SectionTag from "../News/SectionTag";
import { Link } from "react-router-dom";
import { MdShare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import {
  FacebookIcon,
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import { ToastContainer, toast, Zoom } from "react-toastify";

export default class FavoritesBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2Visible: false,
    };
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  removeFav = (e) => {
    localStorage.removeItem(JSON.stringify(this.props.favoritesItem.detailId));
    e.preventDefault();
    e.stopPropagation();
    toast(`Removing - ${this.props.favoritesItem.detailTitle}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    window.location.reload(false);
  };
  render() {
    const {
      detailId,
      detailTitle,
      description,
      subDescription,
      detailUrl,
      detailDate,
      detailSection,
      detailImg,
    } = this.props.favoritesItem;
    // console.log(this.props.favoritesItem);
    // console.log(detailSection);
    console.log(detailId.slice(0, 5));
    return (
      <Link
        to={
          // localStorage.getItem("guardianChecked") === "true"
          //   ? `/article?id=${detailId}`
          //   : `/article?id=${detailId}`
          `/article?id=${detailId}`
        }
        style={linkStyle}
        className="m-3"
      >
        <div className="justify-content-center">
          <div className="col">
            <Card style={{ width: "22rem" }} className="shadow mx-auto">
              <Card.Body>
                <Card.Title class="font-italic ">
                  <h6 className="font-weight-bold">
                    {detailTitle}
                    <Button
                      type="link"
                      onClick={(e) => {
                        this.setModal2Visible(true);
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MdShare className="mb-1" style={linkStyle} />
                    </Button>
                    <Button type="link" onClick={this.removeFav}>
                      <FaTrashAlt className="mb-1" style={linkStyle} />
                    </Button>
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
                  </h6>

                  <div>
                    <Modal
                      title={this.props.title}
                      centered
                      width="300px"
                      footer=" "
                      visible={this.state.modal2Visible}
                      onOk={(e) => {
                        this.setModal2Visible(false);
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onCancel={(e) => {
                        this.setModal2Visible(false);
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <h5 className="text-center">Share via</h5>
                      {/* -------------------------------------share----------------------------------------- */}
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <FacebookShareButton
                              url={this.props.detailUrl}
                              hashtag="#CSCI_571_NewsApp"
                              className="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Facebook"
                            >
                              <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>{" "}
                          </div>
                          <div className="col">
                            <div
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Twitter"
                            >
                              <TwitterShareButton
                                url={this.props.detailUrl}
                                hashtags={["CSCI_571_NewsApp"]}
                                className="button"
                              >
                                <TwitterIcon size={32} round={true} />
                              </TwitterShareButton>{" "}
                            </div>
                          </div>
                          <div className="col">
                            <EmailShareButton
                              url={this.props.detailUrl}
                              subject="#CSCI_571_NewsApp"
                              body=""
                              separator=""
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Email"
                            >
                              <EmailIcon size={32} round={true} />
                            </EmailShareButton>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </Card.Title>

                <Card.Img variant="top" src={detailImg} />
                <Card.Text>
                  <div className="d-flex bd-highlight mb-3">
                    <div className="p-2 font-italic">
                      <Moment format="MM/DD/YYYY">{detailDate}</Moment>
                      <br />
                    </div>
                    <div className="ml-auto p-2 bd-highlight text-body">
                      <SectionTag sectionName={detailSection} />
                    </div>
                    <div className="ml-auto p-2 bd-highlight text-body">
                      <SectionTag
                        sectionName={
                          detailId.slice(0, 5) === "https"
                            ? "NYTIMES"
                            : "GUARDIAN"
                        }
                      />
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Link>
    );
  }
}

const linkStyle = {
  color: "#000000",
};
