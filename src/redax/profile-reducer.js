import { ProfileSetAPI } from "../api/Api";
import { stopSubmit } from "redux-form"
const addPost = "profile/ADD-POST";

const SETUSERPROFILE = "profile/SETUSERPROFILE";
const SETSTATUS = "profile/SETSTATUS";
const DELETEPOST = "profile/DELETEPOST";
const SAVEPHOTO = "profile/SAVEPHOTO";
let initialState = {
  posts: [
    { id: 1, likesCount: 1, message: "hi,how are you?" },
    { id: 2, likesCount: 12223, message: "it's my first post" },
    { id: 3, likesCount: 3231, message: "it's so cool!!" },
    { id: 4, likesCount: 41, message: "it's so cool!!" },
    { id: 5, likesCount: 53, message: "it's so cool!!" },
    { id: 6, likesCount: 69, message: "it's so cool!!" },
    { id: 7, likesCount: 77, message: "i am DusiNKA!!" },
    { id: 8, likesCount: 8, message: "it's so cool!!" },
    { id: 9, likesCount: 444, message: "i very happy!!" },
    { id: 10, likesCount: 666, message: "i very happy!!" }
  ],

  profile: null,
  status: ""
};
let idAdd = 11;
const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case addPost:
      idAdd++;
      return {
        ...state,
        posts: [
          ...state.posts,
          { id: idAdd, message: action.posted, likesCount: 0 }
        ]
      };
    case SETUSERPROFILE: {
      return { ...state, profile: action.profile }
    }
    case SETSTATUS: {
      return { ...state, status: action.status }
    }
    case DELETEPOST: {
      return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
    }
    case SAVEPHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos } }
    }


    default:
      return state;
  }
};
export const addPostActionCreator = (posted) => ({ type: addPost, posted });
export const setUserProfile = (profile) => ({ type: SETUSERPROFILE, profile });
export const setStatus = (status) => ({ type: SETSTATUS, status });
export const deletePost = (postId) => ({ type: DELETEPOST, postId });
export const savePhotoSuccess = (photos) => ({ type: SAVEPHOTO, photos });


export const newUser = (userId) => async (dispatch) => {
  let response = await ProfileSetAPI.profilSetUser(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  let response = await ProfileSetAPI.getStatus(userId);
  dispatch(setStatus(response.data))
}


export const updateStatus = (status) => async (dispatch) => {
  let response = await ProfileSetAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  let response = await ProfileSetAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id
  let response = await ProfileSetAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(newUser(userId))
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
}




export default profileReducer;
