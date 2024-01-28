import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CardGroup from "react-bootstrap/CardGroup";
import UserProfileImage from "../assets/images/user-profile.png";
import UserEditForm from "./UserEditForm";
import "../assets/appcss/userprofilecss.css";

const deleteUserAccount = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};

function UserEditFormModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="m-5">
        <UserEditForm
          usereditdata={props.usermodalmata}
          onHide={props.onHide}
        />
      </Modal.Body>
    </Modal>
  );
}

export default function ProfileImgCard(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Card id="userprofile" className="rounded shadow">
      <Card.Img variant="top" className="p-5" src={UserProfileImage} />
      <Card.Body>
        <Card.Title className="text-center">
          {props.userData.userFirstName} {props.userData.userLastName}
        </Card.Title>
        <Card.Text className="text-center">
          <FontAwesomeIcon
            className="btn btn-light p-2 mx-2 my-5"
            icon={faPenToSquare}
            onClick={() => setModalShow(true)}
          />
          <FontAwesomeIcon
            className="btn btn-light p-2 my-5"
            icon={faTrash}
            onClick={deleteUserAccount}
          />
          <UserEditFormModal
            show={modalShow}
            usermodalmata={props.userData}
            onHide={() => setModalShow(false)}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
