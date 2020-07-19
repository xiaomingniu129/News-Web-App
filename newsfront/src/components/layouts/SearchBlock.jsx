import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import SectionTag from "../News/SectionTag";
import { Link } from "react-router-dom";
import { MdShare } from "react-icons/md";
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
export default class SearchBlock extends Component {
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
    window.location.reload(false);
  };
  render() {
    const {
      id,
      title,
      description,
      subDescription,
      detailUrl,
      date,
      section,
      img,
    } = this.props.searchItem;
    return (
      <Link to={`/article?id=${id}`} className="m-3">
        <div className="justify-content-center">
          <div className="col">
            <Card style={{ width: "22rem" }} className="shadow mx-auto">
              <Card.Body>
                <Card.Title style={linkStyle}>
                  <h6 class="font-italic font-weight-bold">
                    {title}
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
                  </h6>
                  <div>
                    <Modal
                      title={title}
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
                              url={detailUrl}
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
                                url={detailUrl}
                                hashtags={["CSCI_571_NewsApp"]}
                                className="button"
                              >
                                <TwitterIcon size={32} round={true} />
                              </TwitterShareButton>{" "}
                            </div>
                          </div>
                          <div className="col">
                            <EmailShareButton
                              url={detailUrl}
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
                <Card.Img variant="top" src={img} />
                <Card.Text>
                  <div className="d-flex bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                      <div className="p-2 font-italic">
                        <Moment format="MM/DD/YYYY" style={linkStyle}>
                          {date}
                        </Moment>
                        <br />
                      </div>
                    </div>
                    <div className="ml-auto p-2 bd-highlight">
                      <SectionTag sectionName={section} />
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
