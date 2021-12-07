import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "./layout";
import Cookies from "universal-cookie/es6";
import {
  deleteRequest,
  deleteTopic,
  editRequest,
  isButtonActive,
  parseJwt,
} from "../utils/functions";
import axios from "axios";
import { CreateTopic } from "./creates/create-topic";
import { CreatePost } from "./creates/create-post";
import { Hero } from "./hero";
import { Container } from "../theme/helpers";
import { ReactComponent as EditSvg } from "../images/edit.svg";
import { ReactComponent as DeleteSvg } from "../images/delete.svg";
import { ReactComponent as ArrowRightSvg } from "../images/arrow-right.svg";
import { ReactComponent as ConfirmSvg } from "../images/confirm.svg";
import { ReactComponent as CancelSvg } from "../images/cancel.svg";
import { EditTopic } from "./edits/edit-topic";
import { ReactComponent as CreateSvg } from "../images/create.svg";

const TopicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const TopicsTopContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  svg {
    width: 35px;
    cursor: pointer;
  }
`;

const SingleTopicContainer = styled.li`
  border-bottom: 2px solid #eeeff4;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    text-decoration: none;
    font-size: 18px;
    line-height: 30px;
    color: #18191f;
  }

  a {
    width: 100%;

    &:hover {
      font-weight: 600;
    }
  }
`;

const EditDeleteButton = styled.button`
  border: none;
  background: transparent;
`;

const SvgsContainer = styled.div`
  width: max-content;
  display: flex;
  svg {
    margin-right: 40px;
    transition: 0.1s ease-in-out;
    cursor: pointer;
    width: 20px;

    &:hover {
      transform: rotate(30deg);
    }
  }
`;

const EditButtons = styled.div`
  display: flex;
  svg {
    width: 20px;

    &:first-child {
      margin-right: 60px;
    }
  }
`;

export const Home = () => {
  const [topics, setTopics] = useState();
  const [createActive, setCreateActive] = useState(false);

  const cookies = new Cookies();
  let jwtToken = cookies.get("jwt");
  const userData = jwtToken ? parseJwt(jwtToken) : null;
  const [editedData, setEditedData] = useState({ title: "" });
  const [editClicked, setEditClicked] = useState({ value: false, index: null });

  useEffect(() => {
    const fetchData = async () =>
      axios
        .get(`https://onvet.herokuapp.com/api/topics`)
        .then((response) => setTopics(response.data));

    fetchData();
  }, []);

  console.log(editClicked);

  return (
    <Layout>
      <Hero />
      <Container>
        <TopicsContainer>
          <TopicsTopContainer>
            <h1>Kategorijos</h1>
            {userData && userData.role === "1" && (
              <>
                <CreateSvg onClick={() => setCreateActive(!createActive)} />
                {createActive && (
                  <CreateTopic
                    jwt={jwtToken}
                    setCreateActive={setCreateActive}
                  />
                )}
              </>
            )}
          </TopicsTopContainer>

          <ul>
            {topics &&
              topics.map((topic, index) => (
                <SingleTopicContainer>
                  <Link
                    key={index}
                    to={editClicked.value ? "#" : `/kategorijos/${topic.id}`}
                  >
                    <EditTopic
                      title={topic.title}
                      editClicked={editClicked}
                      index={index}
                      setEditedData={setEditedData}
                    />
                  </Link>

                  <SvgsContainer>
                    {editClicked.value && editClicked.index === index ? (
                      <EditButtons>
                        <ConfirmSvg
                          onClick={() =>
                            editRequest(topic.id, editedData, 0, jwtToken)
                          }
                        />
                        <CancelSvg
                          onClick={() =>
                            setEditClicked({
                              value: false,
                              index: null,
                            })
                          }
                        />
                      </EditButtons>
                    ) : (
                      <>
                        {isButtonActive(topic, jwtToken) && (
                          <EditDeleteButton
                            onClick={() => deleteRequest(topic.id, 0, jwtToken)}
                          >
                            <DeleteSvg />
                          </EditDeleteButton>
                        )}
                        {isButtonActive(topic, jwtToken) && (
                          <EditDeleteButton
                            onClick={() =>
                              setEditClicked({
                                value: true,
                                index: index,
                              })
                            }
                          >
                            <EditSvg />
                          </EditDeleteButton>
                        )}
                      </>
                    )}
                    {!isButtonActive(topic, jwtToken) && <ArrowRightSvg />}
                  </SvgsContainer>
                </SingleTopicContainer>
              ))}
          </ul>
        </TopicsContainer>
      </Container>
    </Layout>
  );
};
