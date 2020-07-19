import React, { Component } from "react";
import News from "../News/News";
import { Consumer } from "../../context";
import queryString from "query-string";

export default class PoliticsPage extends Component {
  render() {
    localStorage.setItem("tabName", "/politics");
    const tabName = window.location.pathname;
    return (
      <React.Fragment>
        <News />
      </React.Fragment>
    );
  }
}

//----------------------------------------

// import React, { Component } from "react";
// import News from "../News/News";
// import { Consumer } from "../../context";
// import queryString from "query-string";

// export default class PoliticsPage extends Component {
//   render() {
//     localStorage.setItem("tabName", "/politics");
//     const tabName = window.location.pathname;
//     return (
//       <Consumer>
//         {(value) => {
//           const { tabChange } = value;
//           tabChange(tabName);
//           console.log(tabName);
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
