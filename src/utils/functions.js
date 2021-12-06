import axios from "axios";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();
let jwtToken = cookies.get("jwt");

export const parseJwt = (token) => {
  let base64Url = token.toString().split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const getUserData = (jwt) => {
  return jwt ? parseJwt(jwt) : null;
};

const getConfig = (jwt) => {
  return {
    headers: { Authorization: `Bearer ${jwt}` },
  };
};

export const deleteRequest = (id, type, jwt) => {
  const config = getConfig(jwt);
  const TOPIC_API = `https://onvet.herokuapp.com/api/topics/${id}`;
  const POST_API = `https://onvet.herokuapp.com/api/posts/${id}`;
  const COMMENT_API = `https://onvet.herokuapp.com/api/comments/${id}`;
  let API = "";

  switch (type) {
    case 0:
      API = TOPIC_API;
      break;
    case 1:
      API = POST_API;
      break;
    case 2:
      API = COMMENT_API;
      break;

    default:
      API = "";
  }

  axios
    .delete(API, config)
    .then((response) => {
      if (response.status !== 202) {
        console.log("erroras", response);
      } else return response;
    })
    .then((data) => {
      window.location.reload();
    });
};

export const editRequest = (id, data, type, jwt) => {
  const config = getConfig(jwt);
  const TOPIC_API = `https://onvet.herokuapp.com/api/topics/${id}`;
  const POST_API = `https://onvet.herokuapp.com/api/posts/${id}`;
  const COMMENT_API = `https://onvet.herokuapp.com/api/comments/${id}`;
  let API = "";
  let body = data;

  switch (type) {
    case 0:
      API = TOPIC_API;

      break;
    case 1:
      API = POST_API;
      break;
    case 2:
      API = COMMENT_API;
      break;

    default:
      API = "";
  }

  axios
    .put(API, body, config)
    .then((response) => {
      if (response.status !== 200) {
        console.log("erroras", response);
      } else return response;
    })
    .then((data) => {
      window.location.reload();
    });
};

export const create = (formData, type, jwt) => {
  const config = getConfig(jwt);
  const TOPIC_API = "https://onvet.herokuapp.com/api/topics";
  const POST_API = "https://onvet.herokuapp.com/api/posts";
  const COMMENT_API = "https://onvet.herokuapp.com/api/comments";
  let API = "";

  switch (type) {
    case 0:
      API = TOPIC_API;
      break;
    case 1:
      API = POST_API;
      break;
    case 2:
      API = COMMENT_API;
      break;

    default:
      API = "";
  }
  axios
    .post(API, formData, config)
    .then((response) => {
      if (response.status !== 201) {
        console.log("erroras", response);
      } else return response;
    })
    .then((data) => {
      window.location.reload();
    });
};

export const isButtonActive = (topic, jwt) => {
  let userData = getUserData(jwt);
  if (userData !== null) {
    if (userData.role === "1" || userData.sub === topic.user_id) return true;
    else return false;
  }
};

export const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
