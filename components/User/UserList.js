import React, { useState, useEffect } from "react";
import { getUserDataFromServer } from "../../helper/users";
import { useSession } from "next-auth/react";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { MultiSelect } from "primereact/multiselect";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import AddEditUser from "./AddEditUser";

const UserList = () => {
  const { status, data } = useSession();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    loyalty: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    role: { value: null, matchMode: FilterMatchMode.IN },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    active: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [showModal, setShowModal] = useState({
    status: false,
    mode: "ADD",
    selectedUser: null,
  });

  const isSelectable = (data) => true;

  const isRowSelectable = (event) =>
    event.data ? isSelectable(event.data) : true;

  const rowClassName = (data) => (isSelectable(data) ? "" : "p-disabled");

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

  // useEffect(() => {
  //   getUserDataFromServer().then((responseData) => {
  //     if (!!responseData.users) {
  //       setUsers(responseData.users.data);
  //     }
  //     setLoading(false);
  //   });
  // }, [updateUI]);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    getUserDataFromServer().then((responseData) => {
     
      if (!!responseData.users) {
        setUsers(responseData.users.data);
      }
      setLoading(false); 
    });
  }, [updateUI]);


  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="tw-flex tw-flex-row tw-justify-between tw-w-full">
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
          <Button
            icon="ni ni-single-02"
            label="Add User"
            rounded
            raised
            onClick={() =>
              setShowModal({
                status: true,
                mode: "ADD",
              })
            }
          />
        </div>
        <MultiSelect
          value={visibleColumns}
          options={columns}
          optionLabel="header"
          onChange={onColumnToggle}
          className="w-full sm:w-20rem"
          display="chip"
        />
      </div>
    );
  };

  const roleBodyTemplate = (rowData) => {
    return <Tag value={rowData.role} severity={getSeverity(rowData.role)} />;
  };

  const createdStoreBodyTemplate = (users) => {
    return (
      <Tag
        value={users.createdStore}
        severity={getSeverity(users.createdStore)}
      />
    );
  };

  console.log(users, "users are ");

  const statusBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.active,
          "false-icon pi-times-circle": !rowData.active,
        })}
      ></i>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-user-edit"
        label="Edit"
        onClick={() =>
          setShowModal({
            status: true,
            mode: "EDIT",
            selectedUser: rowData,
          })
        }
      />
    );
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const columns = [
    {
      field: "email",
      header: "Email",
      sortable: true,
      style: { minWidth: "14rem" },
      dataType: "text",
    },
    {
      field: "dob",
      header: "DoB",
      sortable: true,
      style: { minWidth: "10rem" },
      dataType: "date",
    },
    {
      field: "phone",
      header: "Phone",
      sortable: true,
      style: { minWidth: "10rem" },
      dataType: "text",
    },
    {
      field: "gender",
      header: "Gender",
      sortable: true,
      style: { minWidth: "10rem" },
      dataType: "text",
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState(columns);

  const header = renderHeader();
  if (
    status === "authenticated" &&
    (data?.user?.image === "SUPERADMIN" || data?.user?.image === "ADMIN")
  )
    return (
      <>
        <div
          className="header pb-8 pt-9 pt-lg-8 d-flex align-items-center bg-gradient-default"
          style={{
            minHeight: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: "0.8",
          }}
        >
          <Container className="d-flex align-items-center" fluid>
            <h1 className="display-2 text-white">User List</h1>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <DataTable
                    value={users}
                    scrollable
                    paginator
                    showGridlines
                    rows={10}
                    loading={loading}
                    dataKey="id"
                    filters={filters}
                    globalFilterFields={[
                      "fullname",
                      "loyalty",
                      "email",
                      "dob",
                      "role",
                      "phone",
                    ]}
                    header={header}
                    emptyMessage={loading ? "Loading..." : "No users found."}
                    isDataSelectable={isRowSelectable}
                    rowClassName={rowClassName}
                  >
                    <Column
                      field="fullname"
                      header="Name"
                      sortable
                      style={{ minWidth: "12rem" }}
                    />
                    <Column
                      field="loyalty"
                      header="Loyaty"
                      sortable
                      dataType="numeric"
                      style={{ minWidth: "8rem" }}
                    />
                    {visibleColumns.map((col) => (
                      <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.sortable}
                        style={col.style}
                        dataType={col.dataType}
                      />
                    ))}
                    <Column
                      header="Role"
                      field="role"
                      sortable
                      style={{ minWidth: "10rem" }}
                      body={roleBodyTemplate}
                    />

                    <Column
                      field="createdStore"
                      header="Created Store"
                      style={{ minWidth: "10rem" }}
                      body={createdStoreBodyTemplate}
                    />

                    <Column
                      field="status"
                      header="Status"
                      dataType="boolean"
                      style={{ minWidth: "6rem" }}
                      body={statusBodyTemplate}
                    />
                    <Column
                      field="action"
                      header="Action"
                      style={{ minWidth: "6rem" }}
                      body={actionBodyTemplate}
                    />

                    {/* 
                    <Column
                      field="email"
                      header="Email"
                      sortable
                      style={{ minWidth: "14rem" }}
                    />
                    <Column
                      field="dob"
                      header="DoB"
                      dataType="date"
                      sortable
                      style={{ minWidth: "10rem" }}
                      
                    />
                    
                    <Column
                      field="phone"
                      header="Phone"
                      sortable
                      style={{ minWidth: "10rem" }}
                    />
                    <Column
                      field="gender"
                      header="Gender"
                      sortable
                      style={{ minWidth: "10rem" }}
                    />
                   */}
                  </DataTable>
                </CardHeader>
              </Card>
            </Col>
          </Row>

          <AddEditUser
            show={showModal.status}
            handleClose={() =>
              setShowModal({
                status: false,
                mode: "ADD",
                selectedUser: null,
              })
            }
            mode={showModal.mode}
            dob={showModal.selectedUser?.dob}
            email={showModal.selectedUser?.email}
            name={showModal.selectedUser?.fullname}
            phone={showModal.selectedUser?.phone}
            gender={showModal.selectedUser?.gender}
            id={showModal.selectedUser?._id}
            userStatus={showModal.selectedUser?.active}
            setUpdateUI={() => setUpdateUI(!updateUI)}
          />
        </Container>
      </>
    );
  return <> </>;
};

export default UserList;
