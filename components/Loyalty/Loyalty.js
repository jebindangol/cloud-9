import React, { useContext } from "react";
import { ResultContext } from "../../context/ResultContext";
import { KeysGrid } from "./KeysGrid";
import UserLoyalty from "./UserLoyalty";

const Loyalty = () => {
  const { result } = useContext(ResultContext);
  return (
    <div className="container">
      <div className="row">
        <div className="row  tw-flex  tw-justify-around">
          <div className="col-lg-6 col-md-12 order-lg-1 order-md-2 order-2 calculator__container tw-mt-3">
            <div className="calculator__screen">
              <div className="container">
                <h1 className="screen__content">{result}</h1>
              </div>
            </div>
            <div className="calculator__body">
              <KeysGrid />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 order-lg-2 order-md-1 order-1 loyalty_container tw-mt-10 ">
            <UserLoyalty />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;
