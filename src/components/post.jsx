import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Layout } from "./layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteRequest, editRequest, isButtonActive } from "../utils/functions";
import { CreateComment } from "./creates/create-comment";
import { Container } from "../theme/helpers";
import styled from "styled-components";
import Cookies from "universal-cookie/es6";
import { EditComment } from "./edits/edit-comment";

const PostContainer = styled.div`
  margin: 30px 0;

  p {
    margin-left: 16px;
  }

  ul {
    list-style-type: none;

    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
      border-bottom: 2px solid #eeeff4;
      padding: 16px 0;

      a {
        text-decoration: none;
        color: black;
      }

      button {
        border: none;
        background: transparent;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: #b0b0ec;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 24px;

  span {
    margin-top: 8px;
  }
`;

const Post = () => {
  const location = useLocation();
  const [commentsData, setCommentsData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [editedData, setEditedData] = useState({ comment_text: "" });
  const [editClicked, setEditClicked] = useState({ value: false, index: null });
  const cookies = new Cookies();
  let jwtToken = cookies.get("jwt");

  const getTopicId = () => {
    const id = location.pathname.split("/");
    return id.at(2);
  };

  const getPostId = () => {
    const id = location.pathname.split("/").toString().split("-");
    return id.at(-1);
  };

  const topicId = getTopicId();
  const postId = getPostId();

  const POST_COMMENTS_API = `https://onvet.herokuapp.com/api/posts/${postId}/comments`;
  const TOPIC_API = `https://onvet.herokuapp.com/api/posts/${topicId}`;

  useEffect(() => {
    const fetchCommentsData = async () =>
      axios.get(POST_COMMENTS_API).then((response) => {
        setCommentsData(response.data);
      });
    const fetchPostData = async () =>
      axios.get(TOPIC_API).then((response) => {
        setPostData(response.data[0]);
      });
    fetchCommentsData();
    fetchPostData();
  }, [postId]);

  return (
    <Layout>
      <Container>
        <PostContainer>
          <h2>{postData && postData.title}</h2>
          <p>{postData && postData.content}</p>
          <ul>
            {commentsData &&
              commentsData.map((comment, index) => (
                <li>
                  <CircleContainer>
                    <Circle />
                    <span>{comment.author_name}</span>
                  </CircleContainer>
                  <div>
                    {/* <h4>{comment.comment_text}</h4> */}
                    <EditComment
                      comment_text={comment.comment_text}
                      index={index}
                      editClicked={editClicked}
                      setEditedData={setEditedData}
                    />

                    {editClicked.value && editClicked.index === index ? (
                      <div>
                        <button
                          onClick={() =>
                            editRequest(comment.id, editedData, 2, jwtToken)
                          }
                        >
                          Patvirtinti
                        </button>
                        <button
                          onClick={() =>
                            setEditClicked({
                              value: false,
                              index: null,
                            })
                          }
                        >
                          Atsaukti
                        </button>
                      </div>
                    ) : (
                      <div>
                        {isButtonActive(comment, jwtToken) && (
                          <button
                            onClick={() =>
                              deleteRequest(comment.id, 2, jwtToken)
                            }
                          >
                            Istrinti
                          </button>
                        )}
                        {isButtonActive(comment, jwtToken) && (
                          <button
                            onClick={() =>
                              setEditClicked({
                                value: true,
                                index: index,
                              })
                            }
                          >
                            Redaguoti
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
          {jwtToken && <CreateComment postId={postId} jwt={jwtToken} />}
        </PostContainer>
      </Container>
    </Layout>
  );
};

export default Post;
