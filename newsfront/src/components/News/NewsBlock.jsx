import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import { Nav, Toast, Button, Container, Row, Col } from "react-bootstrap";
import ToastShare from "./ToastShare";
import { MdShare } from "react-icons/md";
import ModalShare from "./ModalShare";
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
import SectionTag from "./SectionTag";

export default class NewsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2Visible: false,
    };
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  render() {
    return (
      <div className="div ml-5 mr-5 mt-5 shadow rounded">
        <Link
          style={linkStyle}
          className="mb-3 ml-3 text-decoration-none"
          to={
            localStorage.getItem("guardianChecked") === "true"
              ? `/article?id=${this.props.id}`
              : `article?id=${this.props.detailUrl}`
          }
        >
          <div className="card mb-3 border-0 rounded">
            <div className="row no-gutters">
              <div className="col-md-4 ">
                <div className=" ml-3 mr-3">
                  <img src={this.props.img} className="card-img" alt="..." />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5>
                    {this.props.title}
                    {/* <div><ToastShare /></div> */}
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
                    <div>
                      <Modal
                        mask="true"
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
                  </h5>
                  <p className="card-text">{this.props.subDescription}</p>
                  <div className="d-flex bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                      <Moment format="MM/DD/YYYY">{this.props.date}</Moment>
                      <br />
                    </div>
                    <div className="ml-auto p-2 bd-highlight">
                      <SectionTag sectionName={this.props.section} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

const linkStyle = {
  color: "#000000",
};
