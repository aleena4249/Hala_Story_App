import axios from "axios";

let topStoryArray = [];
let storyCommmentArray = [];
export const getTopStoriesId = async () => {
  const idsObj = await axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(({ data }) => {
      return data;
    })
    .catch(function(error) {});
  const newidsObj = idsObj.slice(0, 20);
  newidsObj &&
    newidsObj.map(item => {
      getEachStory(item).then(function(result) {
        topStoryArray.push(result);
      });
    });
  return topStoryArray;
};

const getEachStory = async item => {
  let response;
  const url = `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`;
  await axios
    .get(url)
    .then(resp => {
      response = resp.data;
    })
    .catch(function(error) {
      // throw error
    });
  return response;
};

export const getStoryDetailFun = item => {
  item &&
    item.map(elem => {
      getStoryDetails(elem).then(function(result) {
        //console.log("result", result);
        storyCommmentArray.push(result);
      });
    });
  return storyCommmentArray;
};

const getStoryDetails = async item => {
  let response;
  const url = ` https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`;
  await axios
    .get(url)
    .then(resp => {
      response = resp.data;
    })
    .catch(function(error) {
      // throw error
    });
  return response;
};
