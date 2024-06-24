import React, { Component, useState } from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { Button } from "primereact/button";
import { Form } from "react-bootstrap";
import { InputMask } from "primereact/inputmask";
import { getLoyaltyPointFromServer } from "../../helper/users";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const CheckLoyalty = ({ show, setShow = () => {} }) => {
  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
  });
  const [loyaltyUser, setLoyaltyUser] = useState();
  // const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const formStyle = {
    paddingBottom: "20px",
  };

  const currentDate = new Date();
  const maxDate = new Date(
    currentDate.getFullYear() - 21,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await getLoyaltyPointFromServer(
      formData.phone.replace(/\D/g, ""),
      formData.dob
    );
    if (res.data) {
      MySwal.fire({
        title: res?.data?.data?.user?.fullname,
        text:
          "You have got " +
          res?.data?.data?.loyalty?.total_loyalty_point +
          " loyalty points!",
        icon: "success",
        timer: 10000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
      handleClose();
    } else {
      MySwal.fire({
        title: "Error!",
        text: "Invalid user details!",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
      setLoyaltyUser();
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      phone: "",
      dob: "",
    });
    setLoyaltyUser();
  };
  return (
    <Modal animation show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Check Your Loyalty Point</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} method="post">
        <Modal.Body>
          <Form.Group controlId="formPhone" style={formStyle}>
            <div className="flex-auto">
              <label htmlFor="phone" className="font-bold block mb-2">
                Phone
              </label>
              <InputMask
                id="phone"
                mask="(999) 999-9999"
                placeholder="Phone Number"
                value={formData?.phone}
                onChange={(txt) =>
                  setFormData({ ...formData, phone: txt.value })
                }
                className="custom-input-mask"
              ></InputMask>
            </div>
          </Form.Group>

          <Form.Group controlId="formDOB" style={formStyle}>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData?.dob}
              onChange={handleChange}
              required
              min="1900-01-01"
              max={maxDateString}
              formatDate={(date) => new Date(date).toLocaleDateString("en-US")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-center w-100">
            <Button>Check Point</Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CheckLoyalty;
