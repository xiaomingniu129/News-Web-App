const express = require("express");
const app = express();
const request = require("request");
const axios = require("axios");
var sizeOf = require("image-size");
var url = require("url");
var https = require("https");
var getPixels = require("get-pixels");
var pixels = require("image-pixels");
var path = require("path");
const os = require("os");
var cors = require("cors");

app.use(cors());
// gm = require("gm");

const PORT = process.env.PORT || 5000;
// const cors = require("cors");
// app.use(cors());

//guardian d2b6c8f3-2ba8-422e-98ab-e94b90048f7e
//guardian备用 7329ec99-e660-425f-901d-44321acf6ef6
const guardian = "7329ec99-e660-425f-901d-44321acf6ef6";
const homeUrl = `https://content.guardianapis.com/search?api-key=${guardian}&section=(sport|business|technology|politics)&show-blocks=all `;
const worldUrl = `https://content.guardianapis.com/world?api-key=${guardian}&show-blocks=all`;
const politicsUrl = `https://content.guardianapis.com/politics?api-key=${guardian}&show-blocks=all`;
const businessUrl = `https://content.guardianapis.com/business?api-key=${guardian}&show-blocks=all`;
const technologyUrl = `https://content.guardianapis.com/technology?api-key=${guardian}&show-blocks=all`;
const sportUrl = `https://content.guardianapis.com/sport?api-key=${guardian}&show-blocks=all`;
const searchUrl = `https://content.guardianapis.com/search?q=[QUERY_KEYWORD]&api-key=[YOUR_API_KEY]&show-blocks=all`;
const defaultGuardianImage = `https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png`;

// nytimes  eV0PGsbpu3YxUltGGegcalqZM861Af1X
const nytimes = "eV0PGsbpu3YxUltGGegcalqZM861Af1X";
const NYdefaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
const NYhomeUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytimes}`;
const NYworldUrl = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${nytimes}`;
const NYpoliticsUrl = `https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${nytimes}`;
const NYbusinessUrl = `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${nytimes}`;
const NYtechnologyUrl = `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${nytimes}`;
const NYsportUrl = `https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${nytimes}`;

// app.use(
//   express.static(path.join(path.join(__dirname, ".."), "newsfront", "build"))
// );
app.get("/search", (req, res) => {
  console.log(req.query.q);
  request(
    `https://content.guardianapis.com/search?q=${req.query.q}&api-key=${guardian}&show-blocks=all`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let parsedBody = JSON.parse(body);
        let results = parsedBody.response.results;
        let defaultGuardianImage = `https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png`;
        let guardianId = new Array();
        let title = new Array();
        let description = new Array();
        let subDescription = new Array();
        let img = new Array();
        let date = new Array();
        let section = new Array();
        let detailUrl = new Array();
        // img
        for (let i = 0; i < results.length; i++) {
          if (
            results[i].hasOwnProperty("webTitle") &&
            results[i].hasOwnProperty("blocks") &&
            results[i].blocks.hasOwnProperty("main") &&
            results[i].blocks.main.hasOwnProperty("elements") &&
            results[i].blocks.main.elements[0].hasOwnProperty("assets") &&
            results[i].blocks.main.elements[0].assets.length > 0
          ) {
            let lastIndex =
              results[i].blocks.main.elements[0].assets.length - 1;
            img.push(results[i].blocks.main.elements[0].assets[lastIndex].file);
          } else {
            img.push(defaultGuardianImage);
          }
          // title
          if (results[i].hasOwnProperty("webTitle")) {
            title.push(results[i].webTitle);
          }
          // date
          date.push(results[i].webPublicationDate);
          // section
          section.push(results[i].sectionId);
          // id
          guardianId.push(results[i].id);
          // description
          description.push(results[i].blocks.body[0].bodyTextSummary);
          // subDescription
          if (
            results[i].blocks.body[0].bodyTextSummary.split(" ").length > 50
          ) {
            let length = subDescription.push(
              results[i].blocks.body[0].bodyTextSummary
                .split(" ")
                .splice(0, 50)
                .join(" ") + "..."
            );
          } else {
            subDescription.push(results[i].blocks.body[0].bodyTextSummary);
          }
          // detailUrl
          detailUrl.push(results[i].webUrl);
        }

        // guardianNews Object
        let guardianNews = new Array();
        for (let i = 0; i < date.length; i++) {
          guardianNews[i] = new Object();
          guardianNews[i].id = guardianId[i];
          guardianNews[i].title = title[i];
          guardianNews[i].description = description[i];
          guardianNews[i].subDescription = subDescription[i];
          guardianNews[i].detailUrl = detailUrl[i];
          guardianNews[i].date = date[i];
          guardianNews[i].section = section[i];
          guardianNews[i].img = img[i];
        }
        res.send(guardianNews);
      }
    }
  );
});

app.get("/home", (req, res) => {
  if (req.headers.guardianchecked === "1") {
    getGuardianData(homeUrl, req, res);
  } else {
    getNYTimesData(NYhomeUrl, req, res);
  }
});
app.get("/world", (req, res) => {
  if (req.headers.guardianchecked === "1") {
    getGuardianData(worldUrl, req, res);
  } else {
    getNYTimesData(NYworldUrl, req, res);
  }
});
app.get("/politics", (req, res) => {
  if (req.headers.guardianchecked === "1") {
    getGuardianData(politicsUrl, req, res);
  } else {
    getNYTimesData(NYpoliticsUrl, req, res);
  }
});
app.get("/business", (req, res) => {
  if (req.headers.guardianchecked === "1") {
    getGuardianData(businessUrl, req, res);
  } else {
    getNYTimesData(NYbusinessUrl, req, res);
  }
});
app.get("/technology", (req, res) => {
  if (req.headers.guardianchecked === "1") {
    getGuardianData(technologyUrl, req, res);
  } else {
    getNYTimesData(NYtechnologyUrl, req, res);
  }
});
app.get("/sports", (req, res) => {
  if (req.headers.guardianchecked === "1") {
    getGuardianData(sportUrl, req, res);
  } else {
    getNYTimesData(NYsportUrl, req, res);
  }
});
app.get("/latest", (req, res) => {
  getGuardianLatest(
    `https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=${guardian}`,
    req,
    res
  );
});

function getGuardianLatest(url, req, res) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let parsedBody = JSON.parse(body);
      let results = parsedBody.response.results;
      let guardianId = new Array();
      let title = new Array();
      let img = new Array();
      let date = new Array();
      let section = new Array();
      let detailUrl = new Array();
      // img
      for (let i = 0; i < results.length; i++) {
        if (
          results[i].hasOwnProperty("fields") &&
          results[i].fields.hasOwnProperty("thumbnail")
        ) {
          img.push(results[i].fields.thumbnail);
        } else {
          img.push(defaultGuardianImage);
        }
        // title
        if (results[i].hasOwnProperty("webTitle")) {
          title.push(results[i].webTitle);
        }
        // date
        date.push(results[i].webPublicationDate);
        // section
        section.push(results[i].sectionName);
        // id
        guardianId.push(results[i].id);
        // detailUrl
        detailUrl.push(results[i].webUrl);
      }

      // guardianNews Object
      let guardianNews = new Array();
      for (let i = 0; i < date.length; i++) {
        guardianNews[i] = new Object();
        guardianNews[i].id = guardianId[i];
        guardianNews[i].title = title[i];
        guardianNews[i].detailUrl = detailUrl[i];
        guardianNews[i].date = date[i];
        guardianNews[i].section = section[i];
        guardianNews[i].img = img[i];
      }
      /**
       * Android
       */

      // let guardianNewsObject = new Object();
      // guardianNewsObject.totalResults = guardianNews.length;
      // guardianNewsObject.articles = guardianNews;
      // console.log(guardianNews.length);
      // res.send(guardianNewsObject);
      /**
       * Android
       */
      res.send(guardianNews);
    }
  });
}

function getGuardianData(url, req, res) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let parsedBody = JSON.parse(body);
      let results = parsedBody.response.results;
      let guardianId = new Array();
      let title = new Array();
      let description = new Array();
      let subDescription = new Array();
      let img = new Array();
      let date = new Array();
      let section = new Array();
      let detailUrl = new Array();
      // img
      for (let i = 0; i < results.length; i++) {
        if (
          results[i].hasOwnProperty("webTitle") &&
          results[i].hasOwnProperty("blocks") &&
          results[i].blocks.hasOwnProperty("main") &&
          results[i].blocks.main.hasOwnProperty("elements") &&
          results[i].blocks.main.elements[0].hasOwnProperty("assets") &&
          results[i].blocks.main.elements[0].assets.length > 0
        ) {
          let lastIndex = results[i].blocks.main.elements[0].assets.length - 1;
          img.push(results[i].blocks.main.elements[0].assets[lastIndex].file);
        } else {
          img.push(defaultGuardianImage);
        }
        // title
        if (results[i].hasOwnProperty("webTitle")) {
          title.push(results[i].webTitle);
        }
        // date
        date.push(results[i].webPublicationDate);
        // section
        section.push(results[i].sectionId);
        // id
        guardianId.push(results[i].id);
        // description
        description.push(results[i].blocks.body[0].bodyTextSummary);
        // subDescription
        if (results[i].blocks.body[0].bodyTextSummary.split(" ").length > 50) {
          let length = subDescription.push(
            results[i].blocks.body[0].bodyTextSummary
              .split(" ")
              .splice(0, 50)
              .join(" ") + "..."
          );
        } else {
          subDescription.push(results[i].blocks.body[0].bodyTextSummary);
        }
        // detailUrl
        detailUrl.push(results[i].webUrl);
      }

      // guardianNews Object
      let guardianNews = new Array();
      for (let i = 0; i < date.length; i++) {
        guardianNews[i] = new Object();
        guardianNews[i].id = guardianId[i];
        guardianNews[i].title = title[i];
        guardianNews[i].description = description[i];
        guardianNews[i].subDescription = subDescription[i];
        guardianNews[i].detailUrl = detailUrl[i];
        guardianNews[i].date = date[i];
        guardianNews[i].section = section[i];
        guardianNews[i].img = img[i];
      }
      console.log(guardianNews[1].date);
      /**
       * Android
       */

      // let guardianNewsObject = new Object();
      // guardianNewsObject.totalResults = guardianNews.length;
      // guardianNewsObject.articles = guardianNews;
      // console.log(guardianNews.length);
      // res.send(guardianNewsObject);
      /**
       * Android
       */
      res.send(guardianNews);
    }
  });
}

function getNYTimesData(url, req, res) {
  axios
    .get(url)
    .then(async (response) => {
      let sectionFromUrl = url.slice(42, 46);

      // res.send(response.data);
      let nyId = new Array();
      let nyTitle = new Array();
      let nyDescription = new Array();
      let nySubDescription = new Array();
      let nyImg = new Array();
      let nyDate = new Array();
      let nySection = new Array();
      let nyDetailUrl = new Array();
      //
      let results = response.data.results;
      // res.send(results);
      for (let i = 0; i < results.length; i++) {
        nyTitle.push(results[i].title);
        nyDescription.push(results[i].abstract);
        nySubDescription.push(results[i].abstract);
        // img
        if (
          !results[i].hasOwnProperty("multimedia") ||
          results[i].multimedia === null
        ) {
          nyImg.push(NYdefaultImg);
        } else if (results[i].multimedia.length === 0) {
          nyImg.push(NYdefaultImg);
        } else {
          for (let j = 0; j < results[i].multimedia.length; j++) {
            if (results[i].multimedia[j].width > 2000) {
              nyImg.push(
                `https://www.nytimes.com/${results[i].multimedia[0].url.slice(
                  25
                )}`
              );
              // detailNews.detailImg = `https://www.nytimes.com/${parsedResponse.multimedia[j].url}`;
              break;
            }
          }
          if (nyImg.length < nyTitle.length) {
            nyImg.push(NYdefaultImg);
          }
        }
        nyDate.push(results[i].updated_date);
        if (sectionFromUrl === "worl") {
          if (results[i].section === "world") {
            nySection.push(results[i].section);
          } else {
            nySection.push("world");
          }
        } else if (sectionFromUrl === "poli") {
          nySection.push("politics");
        } else if (sectionFromUrl === "busi") {
          nySection.push("business");
        } else if (sectionFromUrl === "tech") {
          nySection.push("technology");
        } else if (sectionFromUrl === "spor") {
          nySection.push("sports");
        } else {
          nySection.push("health");
        }
        // nySection.push(results[i].section);
        nyDetailUrl.push(results[i].url);
      }

      // nytimes object
      let nyNews = new Array();
      for (let i = 0; i < nyDate.length; i++) {
        nyNews[i] = new Object();
        nyNews[i].id = nyId[i];
        nyNews[i].title = nyTitle[i];
        nyNews[i].description = nyDescription[i];
        nyNews[i].subDescription = nySubDescription[i];
        nyNews[i].img = nyImg[i];
        nyNews[i].date = nyDate[i];
        nyNews[i].section = nySection[i];
        nyNews[i].detailUrl = nyDetailUrl[i];
      }
      res.send(nyNews);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
}

let articleId = "";
app.get("/article", (req, res) => {
  let articleId = req.query.id;
  // console.log(newsId);
  // res.send(newsId);
  if (req.headers.guardianchecked === "1") {
    let articleUrl = `https://content.guardianapis.com/${articleId}?api-key=${guardian}&show-blocks=all`;
    request(articleUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let parsedResponse = JSON.parse(body).response;
        let detailNews = new Object();
        if (
          parsedResponse.content.hasOwnProperty("id") &&
          parsedResponse.content.hasOwnProperty("sectionName") &&
          parsedResponse.content.hasOwnProperty("webPublicationDate") &&
          parsedResponse.content.hasOwnProperty("webUrl") &&
          parsedResponse.content.hasOwnProperty("webTitle") &&
          parsedResponse.content.blocks.main.hasOwnProperty("elements") &&
          parsedResponse.content.blocks.main.elements[0].hasOwnProperty(
            "assets"
          )
        ) {
          detailNews.detailId = parsedResponse.content.id;
          detailNews.detailSection = parsedResponse.content.sectionName;
          detailNews.detailDate = parsedResponse.content.webPublicationDate;
          detailNews.detailUrl = parsedResponse.content.webUrl;
          detailNews.detailTitle = parsedResponse.content.webTitle;
          let detailLastIndex =
            parsedResponse.content.blocks.main.elements[0].assets.length - 1;
          if (
            parsedResponse.content.blocks.main.elements[0].assets[
              detailLastIndex
            ] !== undefined &&
            parsedResponse.content.blocks.main.elements[0].assets[
              detailLastIndex
            ].hasOwnProperty("file")
          ) {
            detailNews.detailImg =
              parsedResponse.content.blocks.main.elements[0].assets[
                detailLastIndex
              ].file;
          } else {
            detailNews.detailImg = defaultGuardianImage;
          }
          if (
            parsedResponse.content.blocks.body[0].hasOwnProperty(
              "bodyTextSummary"
            )
          ) {
            detailNews.detailDescription =
              parsedResponse.content.blocks.body[0].bodyTextSummary;
          }
        }
        // console.log(detailNews);
        res.send(detailNews);
      }
    });
  } else {
    console.log(articleId);
    let articleUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("${articleId}")&api-key=${nytimes}`;
    axios
      .get(articleUrl)
      .then((response) => {
        console.log("nytimes");
        let parsedResponse = response.data.response.docs[0];
        let detailNews = new Object();
        // id
        // url
        if (parsedResponse.hasOwnProperty("web_url")) {
          detailNews.detailId = parsedResponse.web_url;
          detailNews.detailUrl = parsedResponse.web_url;
        }
        // title
        if (
          parsedResponse.hasOwnProperty("headline") &&
          parsedResponse.headline.hasOwnProperty("main")
        ) {
          detailNews.detailTitle = parsedResponse.headline.main;
        }
        // date
        if (parsedResponse.hasOwnProperty("pub_date")) {
          detailNews.detailDate = parsedResponse.pub_date;
        }
        // section
        if (parsedResponse.hasOwnProperty("section_name")) {
          detailNews.detailSection = parsedResponse.section_name;
        }
        // img
        if (
          !parsedResponse.hasOwnProperty("multimedia") ||
          parsedResponse.multimedia === null
        ) {
          detailNews.detailImg = NYdefaultImg;
        } else if (parsedResponse.multimedia.length === 0) {
          detailNews.detailImg = NYdefaultImg;
        } else {
          for (let j = 0; j < parsedResponse.multimedia.length; j++) {
            if (parsedResponse.multimedia[j].width > 2000) {
              detailNews.detailImg = `https://www.nytimes.com/${parsedResponse.multimedia[j].url}`;
              break;
            }
          }
          if (detailNews.detailImg === undefined) {
            detailNews.detailImg = NYdefaultImg;
          }
        }
        // description
        if (parsedResponse.hasOwnProperty("abstract")) {
          detailNews.detailDescription = parsedResponse.abstract;
        }
        res.send(detailNews);
      })
      .catch((error) => console.log(error));
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
