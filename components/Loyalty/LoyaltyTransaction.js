import React, { useState, useEffect, useContext } from "react";
import { getLoyalty, getUserDataFromServer } from "../../helper/users";
import { useSession } from "next-auth/react";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import DateRange from "./DateRange";
import { is } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DataContext } from "../../pages/_app";
import moment from "moment-timezone";

const LoyaltyTransaction = () => {
  const { status, data } = useSession();

  const { shops } = useContext(DataContext);
  const shopsData = shops?.data;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [showDateRange, setShowDateRange] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [summary, setSummary] = useState({
    totalReedemAmt: 0,
    totalUserReedem: 0,
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const maxRange = 180;
  const handleRangeSelect = (ranges) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const rangeInDays = Math.abs(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    ); // calculate the range in days

    if (ranges.selection.startDate && ranges.selection.endDate) {
      setDateRange([ranges.selection]);
      setIsSubmit(true);
    }
  };

  const today = new Date();
  const maxDate = today;
  const minDate = new Date(today.getTime() - maxRange * 24 * 60 * 60 * 1000);
  const getSeverity = (role) => {
    switch (role) {
      case "SUPERADMIN":
        return "info";
      case "ADMIN":
        return "warning";
      case "USER":
        return "success";
    }
  };

  const handleApi = () => {
    setLoading(true);
    getLoyalty(
      dateRange[0].startDate.toISOString().split("T")[0],
      dateRange[0].endDate.toISOString().split("T")[0]
    ).then((responseData) => {
      if (responseData.data) {
        setUsers(responseData.data.data.loyaltyData);
        setSummary(responseData.data.data.summary);
      }
      setLoading(false);
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // const priceBodyTemplate = (user) => {
  //     return formatCurrency(user.redeem_amount);
  // };

  const priceBodyTemplate = (user) => {
    return user.redeem_amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // const formatDate = (dateString) => {
  //   return moment().tz("America/Chicago").format("MMM Do hh:mm A")
  // };

  const formatDate = (dateString) => {
    return moment(dateString).tz("America/Chicago").format("MMM Do hh:mm A");
  };

  const formatPhone = (value) => {
    value = value ? value.replace(/\D/g, "") : "";

    // Extract the individual number groups
    var areaCode = value.slice(0, 3);
    var prefix = value.slice(3, 6);
    var lineNumber = value.slice(6);

    // Format the phone number
    var formattedPhoneNumber =
      "(" + areaCode + ") " + prefix + "-" + lineNumber;

    return formattedPhoneNumber;
  };

  const phoneBodyTemplate = (user) => {
    return formatPhone(user.userPhone);
  };

  useEffect(() => {
    if (isSubmit) {
      handleApi();
    }
    setIsSubmit(false);
  }, [isSubmit]);

  useEffect(() => {
    handleApi();
  }, []);

  useEffect(() => {
    if (selectedShopId === "all") {
      setTableData(users);
    } else {
      const filteredData = users.filter((user) => {
        if (user.shop) return user.shop._id == selectedShopId;
      });
      setTableData(filteredData);
    }
  }, [selectedShopId]);

  useEffect(() => {
    setTableData(users);
  }, [users]);

  if (
    status === "authenticated" &&
    (data?.user?.image === "SUPERADMIN" || data?.user?.image === "ADMIN")
  )
    return (
      <div className="p-transaction">
        <div className="transaction">
          <div className=" tw-flex tw-flex-row tw-justify-start tw-align-middle  tw-h-[75px] tw-mt-8   tw-py-2 md:tw-py-3">
            <Button
              label={showDateRange ? "Hide Date Range" : "Select Date Range"}
              icon="pi pi-calendar"
              onClick={() => setShowDateRange(!showDateRange)}
            />
            <select
              className=" p-button "
              onChange={(e) => {
                setSelectedShopId(e.target.value);
              }}
            >
              <option value={"all"}>All Shops</option>
              {shopsData.map((shop) => (
                <option value={shop._id} key={shop._id}>
                  {shop.shop_name}
                </option>
              ))}
            </select>
          </div>
          {showDateRange && (
            <div>
              <DateRangePicker
                ranges={dateRange}
                onChange={handleRangeSelect}
                minDate={minDate}
                maxDate={maxDate}
                //   presets={presets}
                // staticRanges={[]}
                inputRanges={[]}
              />
            </div>
          )}
          <h5 style={{ marginLeft: "40px" }}>Loyalty Transaction Summary</h5>
          <Container fluid>
            <Row>
              <Col sm={6} xs={12} className="summmary-card">
                <div className="summary-header">Total No. of Reedem</div>
                <div className="summary-value">
                  {tableData.reduce((totalNumberOfRedeem, user) => {
                    if (user.redeem_amount !== 0) {
                      return (totalNumberOfRedeem = totalNumberOfRedeem + 1);
                    }
                    return totalNumberOfRedeem;
                  }, 0)}
                </div>
              </Col>
              <Col sm={6} xs={12} className="summmary-card">
                <div className="summary-header">Total Reedem Amount</div>
                <div className="summary-value">
                  {"$" +
                    tableData.reduce(
                      (totalRedeemAmount, user) =>
                        totalRedeemAmount + user.redeem_amount,
                      0
                    )}
                </div>
              </Col>
              <Col sm={6} xs={12} className="summmary-card">
                <div className="summary-header">Total Loyalty Points</div>
                <div className="summary-value">
                  {/* {summary?.totalLoyaltyPoint} */}
                  {tableData.reduce(
                    (totalPoints, user) =>
                      totalPoints + user.total_loyalty_point,
                    0
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid>
          <Row>
            <Col className="order-xl-2" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <DataTable
                    value={tableData}
                    scrollable
                    paginator
                    showGridlines
                    rows={10}
                    loading={loading}
                    dataKey="id"
                    globalFilterFields={[
                      "fullname",
                      "loyalty",
                      "email",
                      "dob",
                      "role",
                      "phone",
                    ]}
                    // header={header}
                    emptyMessage="No loyalty transaction found."
                  >
                    <Column
                      field="userName"
                      header="Name"
                      sortable
                      style={{ minWidth: "12rem" }}
                    />
                    <Column
                      field="userPhone"
                      header="Phone"
                      body={phoneBodyTemplate}
                      sortable
                      style={{ minWidth: "10rem" }}
                    />
                    <Column
                      field="loyalty_earn"
                      header="Loyalty Earned (Points)"
                      sortable
                      style={{ minWidth: "14rem" }}
                    />
                    <Column
                      field="redeem_amount"
                      header="Loyalty Redeemed ($)"
                      body={priceBodyTemplate}
                      sortable
                      style={{ minWidth: "10rem" }}
                    />
                    <Column
                      header="Total Loyalty (Points)"
                      field="total_loyalty_point"
                      sortable
                      style={{ minWidth: "10rem" }}
                    />
                    <Column
                      header="Shop"
                      field="shop.shop_name"
                      sortable
                      style={{ minWidth: "10rem" }}
                    />

                    <Column
                      field="createdBy"
                      header="Created By"
                      sortable
                      style={{ minWidth: "14rem" }}
                    />
                    {/*                   
                    <Column
                      field="createdAt"
                      header="DateTime"
                      body={(rowData) => formatDate(rowData.createdAt)}
                      sortable
                      style={{ minWidth: "14rem" }}
                    /> */}
                    <Column
                      field="createdAt"
                      header="DateTime"
                      body={(rowData) => formatDate(rowData.createdAt)}
                      sortable
                      style={{ minWidth: "14rem" }}
                    />
                  </DataTable>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  return <> </>;
};

export default LoyaltyTransaction;
