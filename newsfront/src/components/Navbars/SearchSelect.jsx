import React, { Component } from "react";
import history from "history";
import AsyncSelect from "react-select/async";
import axios from "axios";

export default class WithPromises extends Component {
  promiseOptions = (inputValue) => {
    return axios
      .get(
        `https://api.cognitive.microsoft.com/bing/v7.0/Suggestions?q=${encodeURIComponent(
          inputValue
        )}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "fd0ef54849aa44c890942a2eb8866194",
          },
        }
      )
      .then((res) => {
        const resultsRaw = res.data.suggestionGroups[0].searchSuggestions;
        const results = resultsRaw.map((result) => ({
          value: result.displayText,
          label: result.displayText,
        }));
        console.log(results);
        return results;
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div style={searchStyle} className="mt-4">
        <AsyncSelect
          placeholder="Enter keyword .."
          onChange={(opt) =>
            // console.log(opt.label + history.pushState("/search"))
            window.location.assign(`/search?q=${opt.label}`)
          }
          loadOptions={this.promiseOptions}
        />
        ;
      </div>
    );
  }
}

const searchStyle = {
  width: "300px",
};
