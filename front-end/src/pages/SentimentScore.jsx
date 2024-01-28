import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import SentimentScoreCard from "../components/SentimentScoreCard";
import axios from "axios";
import baseURL from "../../config/axiosConfig";
import Cookies from "js-cookie";
import "../assets/appcss/searchbarcss.css";

export default function SentimentScore() {
  const [sentimentScoreData, setSentimentScoreData] = useState([]);
  const [sentimentRowScoreData, setSentimentRowScoreData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listStatus, setlistStatus] = useState(true);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      setSentimentScoreData(sentimentRowScoreData);
    }
    const filteredResults = sentimentRowScoreData.filter((item) =>
      item.userSentimentText.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSentimentScoreData(filteredResults);
  };

  const fetchData = () => {
    if (Object.keys(sentimentScoreData).length === 0) {
      let encodedUserID = Cookies.get("userID");
      let decodedStringuserID = decodeURIComponent(encodedUserID).replace(
        /"/g,
        ""
      );
      axios
        .get(baseURL + "text/filter/" + decodedStringuserID)
        .then((response) => {
          // Handle successful response
          setSentimentScoreData(response.data);
          setSentimentRowScoreData(response.data);
        })
        .catch((error) => {
          // Handle error
          setlistStatus(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card className="shadow" id="searchbar">
        <Card.Body>
          <Row>
            <Form.Control
              size="md"
              type="text"
              placeholder="Search..."
              id="searchinput"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Row>
        </Card.Body>
      </Card>
      <Row className="p-3">
        {listStatus ? (
          sentimentScoreData.map((item, index) => (
            <SentimentScoreCard
              key={index}
              SentimentTxt={item.userSentimentText}
              SentimentScore={item.userSentimentScore}
              SentimentEmoji={item.userSentimentCate}
              SentimentID={item._id}
              fetchData={fetchData}
            />
          ))
        ) : (
          <span className="text-dark">Empty...</span>
        )}
      </Row>
    </>
  );
}
