import { useEffect, useState } from "react";
import { Modal, Form, Dropdown } from "react-bootstrap";
import { Button } from "primereact/button";
import { addUserFromServer, updateUserFromServer } from "../../helper/users";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { InputMask } from "primereact/inputmask";
import { useSession } from "next-auth/react";
const MySwal = withReactContent(Swal);

const AddEditUser = ({
  show,
  mode,
  handleClose,
  name,
  email,
  dob,
  phone,
  gender,
  id,
  setUpdateUI,
  userStatus,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    dob: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    userRole: "User",
    createdStore: "createdStore",
    status: true,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
    userRole: "",
    createdStore: "",
    password: "",
    status: "",
  });



  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formStyle = {
    paddingBottom: "20px",
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDate1 = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();
  const maxDate = new Date(
    currentDate.getFullYear() - 21,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleAdd = () => {
    // Perform validation
    const validationErrors = {};

    // Validate full name
    if (!formData.name) {
      validationErrors.name = "Please provide a valid name.";
    }

    // Validate email
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      validationErrors.email = "Please provide a valid email address.";
    }

    // Validate gender
    if (!formData.gender) {
      validationErrors.gender = "Please select a gender.";
    }

    // Validate date of birth
    if (!formData.dob) {
      validationErrors.dob = "Please provide a valid date of birth.";
    }

    // Validate phone
    if (!formData.phone) {
      validationErrors.phone = "Please provide a valid phone number.";
    }

    // Validate user role
    if (mode === "ADD" && !formData.userRole) {
      validationErrors.userRole = "Please select a user role.";
    }

    if (mode === "ADD" && !formData.createdStore) {
      validationErrors.createdStore = "Please select a created store.";
    }

    // Validate password if mode is ADD
    if (mode === "ADD" && !password) {
      validationErrors.password = "Please provide a valid password.";
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmit(true);

    // Validation passed, perform the add action
    // ...
  };

  const { status, data } = useSession();

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();

      setIsSubmit(false);
    }
  }, [isSubmit]);

  const handleSubmit = async () => {
    // e.preventDefault();
    mode == "EDIT" ? handleUpateUser() : handleAddUser();
  };

  const handleUpateUser = async () => {
    try {
      await updateUserFromServer({
        id,
        fullname: formData.name,
        dob: formatDate(formData.dob),
        phone: formData.phone.replace(/\D/g, ""),
        gender: formData.gender,
        status: formData.status,
      });
      setUpdateUI();
      handleClose();
      handleAlert(true, "User updated successfully!");
    } catch (error) {
      console.error("UpdateUserError", error);
      handleAlert(false, error?.response?.data?.msg);
    }
  };

  const handleAddUser = async () => {
    try {
      await addUserFromServer({
        fullname: formData.name,
        dob: formatDate(formData.dob),
        gender: formData.gender,
        phone: formData.phone.replace(/\D/g, ""),
        email: formData.email,
        password: formData.password,
        role: formData.userRole,
        createdStore: formData.createdStore,
      });

      setUpdateUI();
      handleClose();
      handleAlert(true, "User added successfully!");
    } catch (error) {
      console.error("AddUserError", error);
      handleAlert(false, error?.response?.data?.error);
    }
  };

  const handleAlert = (isSuccess, msg) => {
    MySwal.fire({
      title: isSuccess ? "Success!" : "Error!",
      text: msg,
      icon: isSuccess ? "success" : "error",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { password, confirmPassword } = formData;
  const passwordMatch = password === confirmPassword;

  const generateRandomPassword = () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleDate = (date) => {
    setFormData({
      ...formData,
      name,
      email,
      phone,
      password: "",
      confirmPassword: "",
      id,
      gender,
      dob: formatDate1(date),
      status: userStatus,
    });
  };

  useEffect(() => {
    if (mode == "EDIT") {
      handleDate(dob);
    } else {
      setFormData({
        name: "",
        email: "",
        dob: "",
        phone: "",
        password: generateRandomPassword(),
        confirmPassword: "",
        createdStore: "",
      });
      setErrors({
        name: "",
        email: "",
        gender: "",
        dob: "",
        phone: "",
        userRole: "",
        password: "",
        createdStore: "",
      });
    }
  }, [show, mode]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="d-block">
        <Modal.Title className="d-block text-center">
          {mode == "EDIT" ? "Edit" : "Adds"} Users
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "20px" }}>
        <Form>
          <Form.Group controlId="formName" style={formStyle}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              isInvalid={errors.name}
              onFocus={() => setErrors({ ...errors, name: "" })}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="formEmail" style={formStyle}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly={mode === "EDIT"}
              isInvalid={errors.email}
              onFocus={() => setErrors({ ...errors, email: "" })}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="formGender" style={formStyle}>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              isInvalid={errors.gender}
              onFocus={() => setErrors({ ...errors, gender: "" })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
            {errors.gender && (
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            )}
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
              isInvalid={errors.dob}
              onFocus={() => setErrors({ ...errors, dob: "" })}
            />
            {errors.dob && (
              <Form.Control.Feedback type="invalid">
                {errors.dob}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {mode === "ADD" && (
            <Form.Group controlId="formCreatedStore" style={formStyle}>
              <Form.Label>Created Store</Form.Label>
              <Form.Control
                as="select"
                name="createdStore"
                value={formData.createdStore}
                onChange={handleChange}
                required
                isInvalid={errors.createdStore}
                onFocus={() => setErrors({ ...errors, createdStore: "" })}
              >
                <option value="">Select store</option>
                <option value="Cloud9">Cloud9</option>
                <option value="Hemphys">Hemphys</option>
              </Form.Control>
              {errors.createdStore && (
                <Form.Control.Feedback type="invalid">
                  {errors.createdStore}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}

          <Form.Group controlId="formPhone" style={formStyle}>
            {/* <div className="flex-auto"> */}
            <label htmlFor="phone" className="font-bold block mb-2">
              Phone
            </label>
            <div>
              <InputMask
                id="phone"
                mask="(999) 999-9999"
                placeholder="Phone Number"
                value={formData?.phone}
                onChange={(txt) =>
                  setFormData({ ...formData, phone: txt.value })
                }
                className={`form-control custom-input-mask${
                  errors.phone ? "input-mask-invalid is-invalid" : ""
                }`}
                onFocus={() => setErrors({ ...errors, phone: "" })}
              />
            </div>
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
            {/* </div> */}
          </Form.Group>

          {mode === "ADD" &&
            (data?.user?.image === "SUPERADMIN" ||
              data?.user?.image === "ADMIN") && (
              <Form.Group controlId="formUserRole" style={formStyle}>
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  as="select"
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleChange}
                  required
                  isInvalid={errors.userRole}
                  onFocus={() => setErrors({ ...errors, userRole: "" })}
                >
                  <option value="">Select user role</option>
                  {data?.user?.image === "SUPERADMIN" && (
                    <option value="SUPERADMIN">Superadmin</option>
                  )}
                  {data?.user?.image === "SUPERADMIN" && (
                    <option value="ADMIN">Admin</option>
                  )}
                  <option value="ELITE">Elite Customer</option>
                  <option value="USER">User</option>
                </Form.Control>
                {errors.userRole && (
                  <Form.Control.Feedback type="invalid">
                    {errors.userRole}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            )}

          {mode === "ADD" && (
            <>
              <Form.Group controlId="formPassword" style={formStyle}>
                <Form.Label>Password</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={errors.password}
                    onFocus={() => setErrors({ ...errors, password: "" })}
                  />
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </>
          )}

          {mode == "EDIT" && (
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                isInvalid={errors.status}
                onFocus={() => setErrors({ ...errors, status: "" })}
              >
                <option value="">Select status</option>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Form.Control>
              {errors.status && (
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#cecece",
            color: "white",
            border: "1px solid #cecece",
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAdd}>
          {mode == "EDIT" ? "Update User" : "Add New User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditUser;
