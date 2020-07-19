import React, { Component } from "react";
import { Form, FormControl, Nav, Button, Navbar } from "react-bootstrap";
import Toggle from "./Toggle";
import Bookmark from "./Bookmark";
// import Search from "./Search";
import SearchSelect from "./SearchSelect";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import InBookMark from "./InBookMark";
import OutBookMark from "./OutBookMark";
import ReactTooltip from "react-tooltip";

export default class Navbars extends Component {
  componentDidMount() {
    const tab = localStorage.getItem("tabName");
  }

  render() {
    let tab = window.location.pathname;
    console.log(tab);
    return (
      <Navbar bg="dark" variant="dark" expand="lg" style={gradientStyle}>
        {/* <Search /> */}
        <SearchSelect />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* {localStorage.getItem("tabName") === "/home" ? ( */}
            <Nav.Link
              href="home"
              style={tab === "/home" ? hightlightColor : nonHighlightColor}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="world"
              style={tab === "/world" ? hightlightColor : nonHighlightColor}
            >
              World
            </Nav.Link>
            <Nav.Link
              href="politics"
              style={tab === "/politics" ? hightlightColor : nonHighlightColor}
            >
              Politics
            </Nav.Link>
            <Nav.Link
              href="business"
              style={tab === "/business" ? hightlightColor : nonHighlightColor}
            >
              Business
            </Nav.Link>
            <Nav.Link
              href="technology"
              style={
                tab === "/technology" ? hightlightColor : nonHighlightColor
              }
            >
              Technology
            </Nav.Link>
            <Nav.Link
              href="sports"
              style={tab === "/sports" ? hightlightColor : nonHighlightColor}
            >
              Sports
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {/* <Nav.Link href="favorites">
              <Bookmark />
            </Nav.Link> */}
            {tab !== "/favorites" && tab !== "/article" && tab !== "/search" ? (
              <div>
                <div className="row">
                  <div className="col-6 col-md-2 mt-2 ml-2">
                    <a data-tip="Bookmark">
                      <ReactTooltip effect="solid" style={extraClass} />
                      <Nav.Link href="favorites">
                        <OutBookMark />
                      </Nav.Link>
                    </a>
                  </div>
                  <div className="col-6 col-md-2 mt-3 ml-2">
                    <span style={navbarSelectedColor}>NYTimes</span>
                  </div>
                  <div className="col-6 col-md-2 mt-2">
                    <Nav.Link className="mt-1">
                      <Toggle />
                    </Nav.Link>
                    {/* {localStorage.getItem("guardianChecked") === "true" ? (
                      <Nav.Link className="mt-1" href='/home'>
                        <Toggle />
                      </Nav.Link>
                    ) : (
                      <Nav.Link className="mt-1">
                        <Toggle />
                      </Nav.Link>
                    )} */}
                  </div>
                  <div className="col-6 col-md-2 mt-3 ml-2">
                    <span style={navbarSelectedColor}>Guardian</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <a data-tip="Bookmark">
                  <ReactTooltip effect="solid" style={extraClass} />
                  <Nav.Link href="favorites">
                    <InBookMark />
                  </Nav.Link>
                </a>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const gradientStyle = {
  background: "red",
  background: "linear-gradient(to right, #152444 , #3d61b5)",
};

const navbarSelectedColor = {
  color: "white",
};

const extraClass = {
  font: "20px !important",
};

const hightlightColor = {
  color: "white",
};

const nonHighlightColor = {
  "& a": {
    textDecoration: "none",
    color: "#0000ee",
  },
  "& a:hover": {
    textDecoration: "underline",
  },
};
