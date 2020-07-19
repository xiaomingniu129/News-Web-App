import React, { Component } from "react";
import News from "../News/News";
import { Consumer } from "../../context";

export default class WorldPage extends Component {
  render() {
    localStorage.setItem("tabName", "/world");
    const tabName = window.location.pathname;
    return (
      <React.Fragment>
        <News />
      </React.Fragment>
    );
  }
}
// ------------------------------------------------
// import React, { Component } from "react";
// import News from "../News/News";
// import { Consumer } from "../../context";

// export default class WorldPage extends Component {
//   render() {
//     localStorage.setItem("tabName", "/world");
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
