import React, { Component } from "react";
import NewsBlock from "./NewsBlock";
import { Consumer } from "../../context";
import Spinner from "./Spinner";

export default class News extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { news_list } = value;
          if (news_list === undefined || news_list.length === 0) {
            return (
              // <div className="text-center">
              //   <div className="spinner-border" role="status">
              //     <span className="sr-only">Loading...</span>
              //   </div>
              // </div>
              <Spinner />
            );
          } else {
            return (
              <React.Fragment>
                <div className="row">
                  {news_list.map((item) => (
                    <NewsBlock
                      key={item.id}
                      title={item.title}
                      img={item.img}
                      description={item.description}
                      subDescription={item.subDescription}
                      date={item.date}
                      section={item.section}
                      detailUrl={item.detailUrl}
                      id={item.id}
                    />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}
