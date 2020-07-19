// import React from "react";
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";

// // Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// class Spinner extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//     };
//   }

//   render() {
//     return (
//       <div className="sweet-loading">
//         <ClipLoader
//           css={override}
//           size={150}
//           color={"#123abc"}
//           loading={this.state.loading}
//         />
//       </div>
//     );
//   }
// }

// export default Spinner;

import React from "react";
import { css } from "@emotion/core";
import { BounceLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="align-middle mt-20">
        <div className="sweet-loading">
          <BounceLoader
            css={override}
            size={50}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}
