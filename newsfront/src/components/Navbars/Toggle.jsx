// import React, { Component } from "react";
// import Switch from "react-switch";

// export default class BasicExample extends Component {
//   constructor() {
//     super();
//     this.state = { checked: true };
//     // this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange = (checked) => {
//     this.setState({ checked: !this.state.checked });
//   };

//   render() {
//     console.log(this.state.checked);
//     return (
//       <label htmlFor="material-switch">
//         <Switch
//           checked={this.state.checked}
//           onChange={this.handleChange}
//           onColor="#86d3ff"
//           onHandleColor="#2693e6"
//           handleDiameter={16}
//           uncheckedIcon={false}
//           checkedIcon={false}
//           boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//           activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//           height={20}
//           width={48}
//           className="react-switch"
//           id="material-switch"
//         />
//       </label>
//     );
//   }
// }

/* styles.css */

// {
//   /* <Consumer>
//   {(value) => {
//     const { tab, tabChange } = value;
//     tabChange(tabName);

//     return (
//       <React.Fragment>
//         <News />
//       </React.Fragment>
//     );
//   }}
// </Consumer>; */
// }

import React, { Component } from "react";
import Switch from "react-switch";
import { Consumer } from "../../context";

export default class BasicExample extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (checked) => {
    this.setState({
      checked: !this.state.checked,
    });
    if (localStorage.getItem("guardianChecked") === "true") {
      localStorage.setItem("guardianChecked", false);
      window.location.pathname = "/home";
    } else {
      localStorage.setItem("guardianChecked", true);
      window.location.pathname = "/home";
    }
    // this.setState({ checked: !this.state.checked }, () => {
    // localStorage.setItem("guardianChecked", this.state.checked);
    // });
  };

  componentDidMount() {
    if (localStorage.getItem("guardianChecked") === null) {
      localStorage.setItem("guardianChecked", true);
    } else if (localStorage.getItem("guardianChecked") === "false") {
      this.setState({
        checked: false,
      });
    } else {
      this.setState({
        checked: true,
      });
    }
    // if (this.state.checked) {
    //   localStorage.setItem("guardianChecked", true);
    // } else {
    //   localStorage.setItem("guardianChecked", false);
    // }
  }

  render() {
    console.log(this.state.checked);
    return (
      <label htmlFor="material-switch">
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={16}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </label>
    );
  }
}

/* styles.css */
