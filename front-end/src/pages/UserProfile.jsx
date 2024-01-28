import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import UserProfileImage from "../assets/images/user-profile.png";
import ProfileInfoCard from "../components/ProfileInfoCard";
import ProfileImgCard from "../components/ProfileImgCard";
import "../assets/appcss/userprofilecss.css";
import axios from "axios";
import baseURL from "../../config/axiosConfig";
import Cookies from "js-cookie";

export default function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      let encodedUserID = Cookies.get("userID");
      let decodedStringuserID = decodeURIComponent(encodedUserID).replace(
        /"/g,
        ""
      );
      axios
        .get(baseURL + "user/" + decodedStringuserID)
        .then((response) => {
          // Handle successful response
          setUserData(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <Row>
      <Col className="col-sm-4 justufy-content-center my-3">
        <ProfileImgCard userData={userData} />
      </Col>
      <Col className="col-sm-8 justufy-content-center my-3">
        <ProfileInfoCard userData={userData} />
      </Col>
    </Row>
  );
}
