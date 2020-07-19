import React, { Component } from "react";
import News from "../News/News";
import { Consumer } from "../../context";
import queryString from "query-string";

export default class Home extends Component {
  render() {
    const tabName = window.location.pathname;
    localStorage.setItem("tabName", "/home");
    return (
      <React.Fragment>
        <News />
      </React.Fragment>
    );
  }
}

// -----------------------------------
// import React, { Component } from "react";
// import News from "../News/News";
// import { Consumer } from "../../context";
// import queryString from "query-string";

// export default class Home extends Component {
//   render() {
//     const tabName = window.location.pathname;
//     localStorage.setItem("tabName", "/home");
//     return (
//       <Consumer>
//         {(value) => {
//           const { tab, tabChange } = value;
//           tabChange(tabName);

//           return (
//             <React.Fragment>
//               <News />
//             </React.Fragment>
//           );
//         }}
//       </Consumer>
//     );
//   }
// }
