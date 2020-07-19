import React, { Component } from "react";
import { CardDeck } from "react-bootstrap";
import FavoritesBlock from "./FavoritesBlock";

export default class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   favoritesList: [],
    // };
  }

  // componentDidMount() {
  //   if (localStorage.getItem("jfVersion") != null) {
  //     localStorage.removeItem("jfVersion");
  //   }

  //   for (let i = 0; i < localStorage.length; i++) {
  //     if (this.state.favoritesList.contain)
  //       this.setState({
  //         favoritesList: [
  //           ...this.state.favoritesList,
  //           JSON.parse(localStorage.getItem(localStorage.key(i))),
  //         ],
  //       });
  //   }
  // }

  render() {
    // for (let i = 0; i < localStorage.length; i++) {
    //   console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
    // }

    // console.log(localStorage.length);
    const localArrRaw = Object.entries(localStorage);
    const localArr = localArrRaw.filter((el) => {
      return (
        el[0] !== "guardianChecked" &&
        el[0] !== "tabName" &&
        el[0] !== "jfVersion"
      );
    });
    // console.log("localArr.length" + localArr.length);
    if (localArr.length != 0) {
      return (
        <div>
          <h1 className="ml-4">Favorites</h1>

          <CardDeck>
            {localArr.map((item) => (
              <FavoritesBlock
                key={item[0]}
                favoritesItem={JSON.parse(item[1])}
              />
            ))}
          </CardDeck>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <h2>No Item in Bookmark.</h2>
        </div>
      );
    }

    // const { favoritesList } = this.state;
    // console.log(favoritesList);
    // if (favoritesList.length != 0) {
    //   return (
    //     <CardDeck>
    //       {favoritesList.map((item) => (
    //         <FavoritesBlock key={item.id} favoritesItem={item} />
    //       ))}
    //     </CardDeck>
    //   );
    // } else {
    //   return (
    //     <div className="text-center">
    //       <div className="spinner-border" role="status">
    //         <span className="sr-only">Loading...</span>
    //       </div>
    //     </div>
    //   );
    // }
  }
}
