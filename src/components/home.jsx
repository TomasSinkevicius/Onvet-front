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

const TopicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const TopicsTopContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
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

export const Home = () => {
  const [topics, setTopics] = useState();

  const cookies = new Cookies();
  let jwtToken = cookies.get("jwt");
  const userData = jwtToken ? parseJwt(jwtToken) : null;

  useEffect(() => {
    const fetchData = async () =>
      axios
        .get(`https://onvet.herokuapp.com/api/topics`)
        .then((response) => setTopics(response.data));

    fetchData();
  }, []);

  return (
    <Layout>
      <Hero />
      <Container>
        <TopicsContainer>
          <TopicsTopContainer>
            <h1>Kategorijos</h1>
            {userData && userData.role === "1" && (
              <CreateTopic jwt={jwtToken} />
            )}
          </TopicsTopContainer>

          <ul>
            {topics &&
              topics.map((topic, index) => (
                <SingleTopicContainer>
                  <Link key={index} to={`/kategorijos/${topic.id}`}>
                    <div>
                      <span>{topic.title}</span>
                    </div>
                  </Link>

                  <SvgsContainer>
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
                          editRequest(
                            topic.id,
                            { title: "edita!" },
                            0,
                            jwtToken
                          )
                        }
                      >
                        <EditSvg />
                      </EditDeleteButton>
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
