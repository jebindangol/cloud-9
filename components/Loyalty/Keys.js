import { useContext, useRef } from "react";
import { ResultContext } from "../../context/ResultContext";
import { getLoyaltyPointFromServer } from "../../helper/users";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DataContext } from "../../pages/_app";
const MySwal = withReactContent(Swal);

export const Keys = ({ children, style, value }) => {
  const toast = useRef(null);
  const { result, setResult } = useContext(ResultContext);
  const { setLoyaltyUser } = useContext(DataContext);

  const onKeyClick = () => {
    switch (value) {
      case "delete":
        return setResult(result.slice(0, -1));
      case "show":
        handleShowLoyalty();
      case "reset":
        handleReset();

      default:
        return defaultCaseHandler(value);
    }
  };

  const handleReset = () => {
    setResult("");
    setLoyaltyUser({
      loyalty: 0,
      phone: "",
      fullname: "",
    });
  };

  const handleShowLoyalty = async () => {
    if (result.length === 10) {
      const res = await getLoyaltyPointFromServer(result);
      if (res.data) {
        setLoyaltyUser(res.data);
      } else {
        MySwal.fire({
          title: "Error!",
          text: "Phone number not found!",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
        setLoyaltyUser({
          loyalty: 0,
          phone: "",
          fullname: "",
        });
      }

      return setResult("");
    } else {
      MySwal.fire({
        title: "Error!",
        text: "Please enter a valid 10 digit phone number!",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }
  };

  const defaultCaseHandler = (val) => {
    if (val !== "show" && val !== "reset" && val !== "delete") {
      if (result.length === 10) {
        return setResult(result);
      }
      if (result !== "Invalid Input" && result.length !== 10) {
        return setResult(result + val);
      } else {
        return setResult(val);
      }
    }
  };

  return (
    <div className="key" style={style} onClick={onKeyClick}>
      <div className="overlay"></div>
      {children}
    </div>
  );
};
