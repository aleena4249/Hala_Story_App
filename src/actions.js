import {
  USER_LOGIN,
  GET_TOP_STORIES,
  GET_STORY_DETAIL,
  SELECTED_STORY
} from "./actionTypes";

export const userLogin = (user_email, user_password) => ({
  type: USER_LOGIN,
  payload: {
    user_email: user_email,
    user_password: user_password
  }
});
export const getTopStories = top_stories_id_obj => ({
  type: GET_TOP_STORIES,
  payload: {
    top_stories_id: top_stories_id_obj
  }
});
export const getStoryDetail = story_detail_obj => ({
  type: GET_STORY_DETAIL,
  payload: {
    storyDetail: story_detail_obj
  }
});
export const getSelectedStory = selectedStoryItem => ({
  type: SELECTED_STORY,
  payload: {
    storySelected: selectedStoryItem
  }
});
