import {
  USER_LOGIN,
  GET_TOP_STORIES,
  GET_STORY_DETAIL,
  SELECTED_STORY
} from "./actionTypes";

export default function reducer(state = [], action) {
  if (action.type === USER_LOGIN)
    return {
      ...state,
      user_email: action.payload.user_email,
      user_password: action.payload.user_password
    };
  else if (action.type === GET_TOP_STORIES) {
    return {
      ...state,
      top_stories_id: action.payload.top_stories_id
    };
  } else if (action.type === GET_STORY_DETAIL) {
    return {
      ...state,
      storyDetail: action.payload.storyDetail
    };
  } else if (action.type === SELECTED_STORY) {
    return {
      ...state,
      storySelected: action.payload.storySelected
    };
  }
  return state;
}
