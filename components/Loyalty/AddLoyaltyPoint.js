import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "primereact/button";
import { btnStyle } from "./UserLoyalty";
import { DataContext } from "../../pages/_app";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { handleUpdateLoyalty } from "./LoyaltyHeper";
import { useSession } from "next-auth/react";
import { ResultContext } from "../../context/ResultContext";
const MySwal = withReactContent(Swal);

const AddLoyaltyPoint = ({ isOpen, toggle }) => {
  const [point, setPoint] = useState("");
  const { loyaltyRate } = useContext(DataContext);
  const [convertedLoyaltyPoints, setConvertedLoyaltyPoints] = useState(0);
  const [ selectedShopId, setSelectedShopId ] = useState(1);
  const { loyaltyUser, setLoyaltyUser, shops } = useContext(DataContext);
  const { status, data } = useSession();

  const loyaltyData = loyaltyUser?.data?.loyalty;
  const shopsData = shops?.data
  const onChange = (event) => {
    setPoint(event.target.value);
  };

  const session = useSession();

  const handleAdd = async () => {
    if (convertedLoyaltyPoints <= 0) {
      MySwal.fire({
        title: "Error!",
        text: "Not enough loyalty points!",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
      return;
    }

    const newPoint =
      parseInt(loyaltyData.total_loyalty_point) +
      parseInt(convertedLoyaltyPoints);
    const payload = {
      user_id: loyaltyUser?.data?.user?._id,
      loyalty: newPoint,
      loyalty_earn: convertedLoyaltyPoints,
      redeem_amount: 0,
      user: data.user,
      shop_id: selectedShopId
    };
    
    try {
      const res = await handleUpdateLoyalty(payload);
      setLoyaltyUser(res);
      toggle();
      setPoint("");
      MySwal.fire({
        title: "Success!",
        text: "Loyalty points added successfully!",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Failed to add loyalty points:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to add loyalty points. Please try again.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }
  };


  // useEffect(() => {
  //   // const conversionRate = 1;
  //   const convertedPoints = Math.ceil(
  //     point * loyaltyRate.loyalty_conversion_rate
  //   );

  //   setConvertedLoyaltyPoints(convertedPoints);
  //   setSelectedShopId(shopsData[0]._id);
  // }, [point]);
  useEffect(() => {
    const convertedPoints = Math.ceil(
      point * loyaltyRate.loyalty_conversion_rate
    );

    setConvertedLoyaltyPoints(convertedPoints);

    if (shopsData && shopsData.length > 0) {
      setSelectedShopId(shopsData[0]._id);
    }
  }, [point, shopsData]);

  return (
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header>
        <Modal.Title>Add Loyalty Point</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="number"
          placeholder="Enter an amount"
          value={point}
          onChange={onChange}
          className=" tw-border-2"
          style={{
            fontSize: "18px",
            borderRadius: "10px",
            padding: "5px",
            width: "80%",
          }}
        />

        <div className="tw-mt-2 tw-ml-4 tw-fs-14 tw-text-muted">
          Converted loyalty points: {convertedLoyaltyPoints}
        </div>

        <select className=" tw-w-[80%] tw-border-2 tw-mt-4 tw-font-[18px] tw-rounded-[10px] tw-p-[5px]" onChange={ (e) => { setSelectedShopId(e.target.value)}}>
          {
            shopsData.map((shop) => <option value={shop._id}>{shop.shop_name}</option>)
          }
        </select>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center w-100">
          <Button style={{ btnStyle }} onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLoyaltyPoint;
