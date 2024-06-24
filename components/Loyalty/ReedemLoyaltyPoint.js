import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { btnStyle } from "./UserLoyalty";
import { ResultContext } from "../../context/ResultContext";
import { handleUpdateLoyalty } from "./LoyaltyHeper";
import { DataContext } from "../../pages/_app";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSession } from "next-auth/react";
const MySwal = withReactContent(Swal);

const RedeemLoyaltyPointModal = ({ isOpen, toggle }) => {
  const [point, setPoint] = useState(100);
  const { loyaltyRate } = useContext(DataContext);
  const { loyaltyUser, setLoyaltyUser, shops } = useContext(DataContext);
  const [convertedLoyaltyPoints, setConvertedLoyaltyPoints] = useState(0);
  const { status, data } = useSession();

  const loyaltyData = loyaltyUser?.data?.loyalty;

  const onChange = (event) => {
    setPoint(event.target.value);
  };

  const getDefaultShopId = () => {
    const shopList = shops?.data
    const filteredShop = shopList.filter( shop => shop.shop_name === "Cloud 9")
    return filteredShop[0]._id;
  }

  const handleReedem = async () => {
    // handle redeeming of loyalty points here
    if (
      point != "" &&
      point >= 100 &&
      loyaltyData.total_loyalty_point >= parseInt(point)
    ) {
      const newPoint = parseInt(loyaltyData.total_loyalty_point) - point;

      const payload = {
        user_id: loyaltyUser?.data?.user?._id,
        shop_id: loyaltyData.shop_id || getDefaultShopId(),
        loyalty: newPoint,
        loyalty_earn: 0,
        redeem_amount: convertedLoyaltyPoints,
        user: data.user,
      };
      const res = await handleUpdateLoyalty(payload);
      setLoyaltyUser(res);
      toggle();
      setPoint(100);
      MySwal.fire({
        title: "Success!",
        text: "Loyalty points redeemed successfully!",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    } else {
      MySwal.fire({
        title: "Error!",
        text: "Not enough loyalty points!",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    const convertedPoints = Math.floor(
      point * loyaltyRate.reedem_conversion_rate
    );
    setConvertedLoyaltyPoints(convertedPoints);
  }, [point]);

  const handlePlusClick = () => {
    setPoint(parseInt(point) + 100);
  };

  const handleMinusClick = () => {
    if (point > 100) {
      setPoint(parseInt(point) - 100);
    }
  };

  return (
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header>
        <Modal.Title>Redeem Loyalty Point</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-outlined p-mr-2"
            onClick={handlePlusClick}
          />
          <span
            className="p-mx-2 w-50 d-flex justify-content-center"
            style={{ fontSize: "40px" }}
          >
            {point}
          </span>
          <Button
            icon="pi pi-minus"
            className="p-button-rounded p-button-outlined p-ml-2"
            onClick={handleMinusClick}
          />
        </div>
        <div className="mt-2 ml-4 fs-14 text-muted d-flex justify-content-center align-items-center">
          Redeem Fund: ${convertedLoyaltyPoints}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center w-100">
          <Button style={{ btnStyle }} onClick={handleReedem}>
            Redeem Now
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RedeemLoyaltyPointModal;
