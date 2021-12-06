import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Layout } from "./layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { CreatePost } from "./creates/create-post";
import {
  deleteRequest,
  editRequest,
  isButtonActive,
  slugify,
} from "../utils/functions";
import { Container } from "../theme/helpers";
import styled from "styled-components";
import Cookies from "universal-cookie/es6";
import { ReactComponent as ArrowRightSvg } from "../images/arrow-right.svg";
import { EditPost } from "./edits/edit-post";

const TopicContainer = styled.div`
  margin: 30px 0;

  ul {
    margin-left: 24px;

    li {
      margin-bottom: 32px;
      display: flex;

      a {
        text-decoration: none;
        color: black;
      }

      h4 {
        margin: 0;
      }

      button {
        border: none;
        background: transparent;
        text-decoration: underline;
        cursor: pointer;
        width: max-content;
        padding: 0;
        margin-right: 16px;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }
`;

const Circle = styled.div`
  min-width: 80px;
  height: 80px;
  border-radius: 100%;
  background: #b0b0ec;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin: 0 40px 0 20px;
    transition: 0.1s ease-in-out;
    min-width: 10px;
    min-height: 16px;
  }

  &:hover {
    svg {
      transform: rotate(30deg);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LinkContainer = styled(Link)`
  &:hover {
    opacity: 0.5;
  }
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

const Topic = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [postsData, setPostsData] = useState({ data: null, isLoading: true });
  const [topicData, setTopicData] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", content: "" });
  const [editClicked, setEditClicked] = useState({ value: false, index: null });

  const cookies = new Cookies();
  let jwtToken = cookies.get("jwt");

  const getTopicId = () => {
    const id = pathname.split("/");
    return id.at(-1);
  };

  const topicId = getTopicId();

  const TOPIC_POSTS_API = `https://onvet.herokuapp.com/api/topics/${topicId}/posts`;
  const TOPIC_API = `https://onvet.herokuapp.com/api/topics/${topicId}`;

  useEffect(() => {
    setPostsData({ ...postsData, isLoading: true });
    const fetchTopicPostsData = async () =>
      axios.get(TOPIC_POSTS_API).then((response) => {
        setPostsData({ data: response.data, isLoading: false });
      });
    const fetchTopicData = async () =>
      axios.get(TOPIC_API).then((response) => {
        setTopicData(response.data[0]);
      });
    fetchTopicPostsData();
    fetchTopicData();
  }, []);

  console.log(topicData);

  return (
    <Layout>
      <TopicContainer>
        <Container>
          <h2>{topicData && topicData.title}</h2>
          {jwtToken && <CreatePost topicId={topicId} jwt={jwtToken} />}
          <ul>
            {postsData.isLoading === false &&
              postsData.data.map((post, index) => (
                <li>
                  <CircleContainer>
                    <Circle />
                    <span>{post.author_name}</span>
                  </CircleContainer>
                  <Content>
                    <LinkContainer
                      to={
                        editClicked.value
                          ? "#"
                          : `${slugify(post.title)}-${post.id}`
                      }
                    >
                      <ArrowContainer>
                        <EditPost
                          title={post.title}
                          content={post.content}
                          index={index}
                          editClicked={editClicked}
                          setEditedData={setEditedData}
                        />
                        <ArrowRightSvg />
                      </ArrowContainer>
                    </LinkContainer>

                    {editClicked.value && editClicked.index === index ? (
                      <div>
                        <button
                          onClick={() =>
                            editRequest(post.id, editedData, 1, jwtToken)
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
                        {isButtonActive(post, jwtToken) && (
                          <button
                            onClick={() => deleteRequest(post.id, 1, jwtToken)}
                          >
                            Istrinti
                          </button>
                        )}
                        {isButtonActive(post, jwtToken) && (
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
                  </Content>
                </li>
              ))}
          </ul>
        </Container>
      </TopicContainer>
    </Layout>
  );
};

export default Topic;
