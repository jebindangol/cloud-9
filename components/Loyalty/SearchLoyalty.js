import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { KeysGrid } from "../Loyalty/KeysGrid";
import { ResultContext } from "../../context/ResultContext";
import UserLoyalty from "./UserLoyalty";
import { useEffect } from "react";
import { getLoyaltyRate } from "../../helper/users";
import { DataContext } from "../../pages/_app";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import Loyalty from "./Loyalty";
import LoyaltyHistory from "./LoyaltyTransaction";
import { Container, Row } from "reactstrap";

const SearchLoyalty = () => {
  const { status, data } = useSession();
  const { loyaltyRate, setLoyaltyRate, shops } = useContext(DataContext);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index) => {
    setActiveIndex(index.index);
  };

  const handleLoyaltyRate = async () => {
    try {
      const res = await getLoyaltyRate();
      setLoyaltyRate(res);
    } catch (err) {
      console.error("err", rer);
    }
  };

  useEffect(() => {
    handleLoyaltyRate();
  }, []);

  if (
    status === "authenticated" &&
    (data?.user?.image === "SUPERADMIN" || data?.user?.image === "ADMIN")
  )
    return (
      <>
        <div
          className="header pb-8 pt-9  pt-lg-8 d-flex align-items-center bg-gradient-default"
          style={{
            minHeight: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: "0.8",
          }}
        >
          <Container className="d-flex align-items-center" fluid>
            <h1 className="display-2 text-white">Loyalty</h1>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          {/* <Row style={{ backgroundColor: "#fff" }}> */}
          <TabView
            activeIndex={activeIndex}
            onTabChange={handleTabChange}
            className="p-tabview-custom"
          >
            <TabPanel header="Loyalty">
              <Loyalty />
            </TabPanel>
            <TabPanel header="Loyalty Transaction">
              <LoyaltyHistory />
            </TabPanel>
          </TabView>
          {/* </Row> */}
        </Container>
        {/* s */}
      </>
    );
  return <></>;
};

export default SearchLoyalty;
