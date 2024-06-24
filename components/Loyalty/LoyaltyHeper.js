import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateLoyaltyPointFromServer } from "../../helper/users";
const MySwal = withReactContent(Swal);

export const handleUpdateLoyalty = async (loyalty) => {
  const res = await updateLoyaltyPointFromServer(loyalty);
  if (res.data) {
    return res.data;
  } else {
    MySwal.fire({
      title: "Error!",
      text: "Phone number not found!",
      icon: "error",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  }
};
