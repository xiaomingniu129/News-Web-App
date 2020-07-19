// import React, { Component } from "react";
// import axios from "axios";

// export const Context = React.createContext();

// export class Provider extends Component {
//   state = {
//     // guardianCheckd: true,
//     news_list: [],
//     // tab: "/",
//     // tabChange: (tabName) => {
//     //   if (tabName === "/") {
//     //     axios
//     //       .get("/home")
//     //       .then((res) => {
//     //         console.log(res.data);
//     //         this.setState({
//     //           news_list: res.data,
//     //         });
//     //       })
//     //       .catch((err) => console.log(err));
//     //   }
//     //   if (this.state.tab !== tabName) {
//     //     this.setState(
//     //       {
//     //         tab: tabName,
//     //       },
//     //       () => {
//     //         console.log(this.state.tab);
//     //         axios
//     //           .get(this.state.tab)
//     //           .then((res) => {
//     //             console.log(res.data);
//     //             this.setState({
//     //               news_list: res.data,
//     //             });
//     //             // console.log(this.state.news_list);
//     //           })
//     //           .catch((err) => console.log(err));
//     //       }
//     //     );
//     //   }
//     // },
//   };
//   componentDidMount() {
//     // console.log(typeof localStorage.getItem("guardianChecked"));
//     if (localStorage.getItem("guardianChecked") === "true") {
//       // guardian
//       // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
//       // 
//       axios
//         .get(
//           `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com${localStorage.getItem(
//             "tabName"
//           )}`,
//           {
//             headers: {
//               guardianChecked: 1,
//             },
//           }
//         )
//         .then((res) => {
//           console.log(res.data);
//           this.setState({
//             news_list: res.data,
//           });
//           // console.log(this.state.news_list);
//         })
//         .catch((err) => console.log(err));
//     } else {
//       // ny times
//       // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
//       console.log("send request to nyt");
//       axios
//         .get(
//           `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com${localStorage.getItem(
//             "tabName"
//           )}`,
//           {
//             headers: {
//               guardianChecked: 2,
//             },
//           }
//         )
//         .then((res) => {
//           console.log(res.data);
//           this.setState({
//             news_list: res.data,
//           });
//           // console.log(this.state.news_list);
//         })
//         .catch((err) => console.log(err));
//     }
//   }

//   render() {
//     return (
//       <Context.Provider value={this.state}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }

// export const Consumer = Context.Consumer;
// // ---------------------------------------------

// // import React, { Component } from "react";
// // import axios from "axios";

// // export const Context = React.createContext();

// // export class Provider extends Component {
// //   state = {
// //     // guardianCheckd: true,
// //     news_list: [],
// //     tab: "/",
// //     tabChange: (tabName) => {
// //       if (tabName === "/") {
// //         axios
// //           .get("/home")
// //           .then((res) => {
// //             console.log(res.data);
// //             this.setState({
// //               news_list: res.data,
// //             });
// //           })
// //           .catch((err) => console.log(err));
// //       }
// //       if (this.state.tab !== tabName) {
// //         this.setState(
// //           {
// //             tab: tabName,
// //           },
// //           () => {
// //             console.log(this.state.tab);
// //             axios
// //               .get(this.state.tab)
// //               .then((res) => {
// //                 console.log(res.data);
// //                 this.setState({
// //                   news_list: res.data,
// //                 });
// //                 // console.log(this.state.news_list);
// //               })
// //               .catch((err) => console.log(err));
// //           }
// //         );
// //       }
// //     },
// //   };

// //   render() {
// //     return (
// //       <Context.Provider value={this.state}>
// //         {this.props.children}
// //       </Context.Provider>
// //     );
// //   }
// // }

// // export const Consumer = Context.Consumer;


/********************************************************/
import React, { Component } from "react";
import axios from "axios";

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    // guardianCheckd: true,
    news_list: [],
    // tab: "/",
    // tabChange: (tabName) => {
    //   if (tabName === "/") {
    //     axios
    //       .get("/home")
    //       .then((res) => {
    //         console.log(res.data);
    //         this.setState({
    //           news_list: res.data,
    //         });
    //       })
    //       .catch((err) => console.log(err));
    //   }
    //   if (this.state.tab !== tabName) {
    //     this.setState(
    //       {
    //         tab: tabName,
    //       },
    //       () => {
    //         console.log(this.state.tab);
    //         axios
    //           .get(this.state.tab)
    //           .then((res) => {
    //             console.log(res.data);
    //             this.setState({
    //               news_list: res.data,
    //             });
    //             // console.log(this.state.news_list);
    //           })
    //           .catch((err) => console.log(err));
    //       }
    //     );
    //   }
    // },
  };
  componentDidMount() {
    // console.log(typeof localStorage.getItem("guardianChecked"));
    if (localStorage.getItem("guardianChecked") === "true") {
      // guardian
      // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
      axios
        .get(`http://localhost:5000${localStorage.getItem("tabName")}`, {
          headers: {
            guardianChecked: 1,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            news_list: res.data,
          });
          // console.log(this.state.news_list);
        })
        .catch((err) => console.log(err));
    } else {
      // ny times
      // http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com/
      console.log("send request to nyt");
      axios
        .get(
          `http://nodejsapp-csci571xiaomingniu.us-east-1.elasticbeanstalk.com${localStorage.getItem(
            "tabName"
          )}`,
          {
            headers: {
              guardianChecked: 2,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.setState({
            news_list: res.data,
          });
          // console.log(this.state.news_list);
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
// ---------------------------------------------

// import React, { Component } from "react";
// import axios from "axios";

// export const Context = React.createContext();

// export class Provider extends Component {
//   state = {
//     // guardianCheckd: true,
//     news_list: [],
//     tab: "/",
//     tabChange: (tabName) => {
//       if (tabName === "/") {
//         axios
//           .get("/home")
//           .then((res) => {
//             console.log(res.data);
//             this.setState({
//               news_list: res.data,
//             });
//           })
//           .catch((err) => console.log(err));
//       }
//       if (this.state.tab !== tabName) {
//         this.setState(
//           {
//             tab: tabName,
//           },
//           () => {
//             console.log(this.state.tab);
//             axios
//               .get(this.state.tab)
//               .then((res) => {
//                 console.log(res.data);
//                 this.setState({
//                   news_list: res.data,
//                 });
//                 // console.log(this.state.news_list);
//               })
//               .catch((err) => console.log(err));
//           }
//         );
//       }
//     },
//   };

//   render() {
//     return (
//       <Context.Provider value={this.state}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }

// export const Consumer = Context.Consumer;
