import React, { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Card from "react-bootstrap/Card";
import { Button } from "primereact/button";
import RedeemLoyaltyPointModal from "./ReedemLoyaltyPoint";
import AddLoyaltyPoint from "./AddLoyaltyPoint";

export const btnStyle = {
    backgroundColor: "var(--delete)",
    fontSize: "18px",
    marginRight: "10px",
};

const StarSVG = () => (
    <svg
        aria-hidden="true"
        class="tw-w-5 tw-h-5 tw-text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);

const UserLoyalty = () => {
    const { loyaltyUser } = useContext(DataContext);
    const loyaltyData = loyaltyUser?.data;
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const toggleAdd = () => setIsOpenAdd(!isOpenAdd);

    if (loyaltyUser?.phone !== "")
        return (
            <div
                style={{
                    boxShadow: "0 0 10px 0 rgba(0,0,0,.2)",
                }}
            >
                <Card className="bg-secondary shadow ">
                    <Card.Header className="tw-px-8">Loyalty Points</Card.Header>
                    <Card.Body>
                        <Card.Text className="tw-px-4 tw-mb-4">
                            <div>{loyaltyData?.user?.fullname}</div>
                            <div>Phone Number: {loyaltyData?.user?.phone}</div>
                            {loyaltyData?.user?.role !== "ELITE" ? (
                                <div>
                                    Total Points:{" "}
                                    {loyaltyData?.loyalty?.total_loyalty_point}
                                </div>
                            ) : (
                                <>
                                    <div>10% discount</div>
                                    <div class="tw-flex tw-items-center">
                                        <StarSVG />
                                        <StarSVG />
                                        <StarSVG />
                                        <StarSVG />
                                        <StarSVG />
                                    </div>
                                </>
                            )}
                        </Card.Text>

                        {loyaltyData?.user?.role !== "ELITE" ? (
                            <>
                                <Button
                                    // style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
                                    onClick={toggle}
                                    variant="secondary"
                                    className="btn tw-h-[45px] "
                                >
                                    Redeem
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={toggleAdd}
                                    className="btn fs-18 tw-h-[45px]"
                                >
                                    Add Loyalty Point
                                </Button>
                                <RedeemLoyaltyPointModal
                                    isOpen={isOpen}
                                    toggle={toggle}
                                />
                                <AddLoyaltyPoint
                                    isOpen={isOpenAdd}
                                    toggle={toggleAdd}
                                />
                            </>
                        ) : null}
                    </Card.Body>
                </Card>
            </div>
        );
    return <div></div>;
};

export default UserLoyalty;
