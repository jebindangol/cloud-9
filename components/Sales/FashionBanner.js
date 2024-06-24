import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageUploadForm from "../Common/ImageUploadFormInput";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

const Data = [
  {
    img: "/images/sales/sub-banner1.jpg",
    about: "",
    offer: "",
    link: "/sale-and-promotion",
  },
  {
    img: "/images/sales/sub-banner2.jpg",
    about: "",
    offer: "",
    link: "/sale-and-promotion",
  },
];

const MasterCollectionBanner = ({ img, about, offer, link, classes }) => {
  return (
    <div className="col" md="6">
      <Link legacyBehavior href={link}>
        <a>
          <div
            className={`collection-banner ${classes}  tw-relative  tw-h-[800px] tw-w-[600px]`}
          >
            <Image
              src={img}
              width={430}
              height={750}
              className="tw-object-fit tw-object-contain"
              alt=""
            />
            <div className="contain-banner ">
              <div>
                <h4>{offer}</h4>
                <h2>{about}</h2>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

const FashionBanner = () => {
  const { data } = useSession();
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [newPromotionImageUrl, setNewPromotionImageUrl] = useState(null);
  const [promotionsData, setPromotionsData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPromotionsFromServer();
  }, []);

  const getPromotionsFromServer = async () => {
    const promotionDataResponse = await axios.get("/api/promotion");
    setPromotionsData(promotionDataResponse.data.data);
  };

  const onSubmit = (formData) => {
    axios
      .post(
        `/api/promotion`,
        {
          img: newPromotionImageUrl,
          about: formData.about,
          offer: formData.offer,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setShowModal(false);
        successContent();
      })
      .catch((error) => {
        console.error(error);
        errorContent();
      });
  };

  const handleDeletePromo = (id) => {
    Swal.fire({
      title: "Delete Promotion",
      text: "Are you sure you want to delete this promotion",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/promotion?id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            deleteSuccessContent();
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to deleted!");
          });
      }
    });
  };

  const handleAddNewPromotion = () => {
    Swal.fire({
      title: "New Promotion",
      text: "Are you sure you want to add New Promotion",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModal(true);
      }
    });
  };

  const successContent = () => {
    Swal.fire({
      title: "Added",
      text: "New pomotion added",
      confirmButtonText: "OK",
      timer: 1500,
      icon: "success",
    }).then(() => {
      router.reload();
    });
  };

  const deleteSuccessContent = () => {
    Swal.fire({
      title: "Deleted",
      text: "Promotion deleted",
      confirmButtonText: "OK",
      timer: 1500,
      icon: "success",
    }).then(() => {
      router.reload();
    });
  };

  const errorContent = () => {
    Swal.fire({
      title: "Oops!",
      text: "Could not add new promotion",
      confirmButtonText: "OK",
      timer: 1500,
      icon: "error",
    });
  };

  const showPromotionPopup = (popupImageUrl) => {
    Swal.fire({
        html: `<img src="${popupImageUrl}" />`,
    });
  }

  const CloseButton = () => (
    <div className=" tw-flex justify-content-end">
      <button
        className=" tw-cursor-pointer tw-text-[30px] tw-hover:tw-scale-110"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(false)}
      >
        ╳
      </button>
    </div>
  );

  const MasterCollectionBanner = ({ img, about, offer, link, classes, id }) => {
    return (
      <div className="col" md="6">
        <Link legacyBehavior href={link}>
          <a>
            <div
              className={`collection-banner ${classes}  tw-relative tw-w-[178px] tw-h-[220px]`}
              onClick={() => showPromotionPopup(img)}
            >
              <Image
                src={img}
                width={200}
                height={200}
                className=" tw-object-fit  tw-w-[178px] tw-h-[220px] "
                alt=""
              />
              <div className="contain-banner ">
                <div>
                  <h4>{offer}</h4>
                  <h2>{about}</h2>
                </div>
                {data?.user?.image === "SUPERADMIN" && (
                  <div
                    className=" group tw-z-10 tw-absolute tw-right-0 tw-top-0 tw-cursor-pointer tw-bg-[rgba(0,0,0,0.3)] tw-p-4"
                    onClick={() => handleDeletePromo(id)}
                  >
                    <FaTrash className=" tw-cursor-pointer group-hover:tw-text-red-500" />
                    Delete
                  </div>
                )}
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  };

  const AddPromotionForm = () => (
    <div className="tw-w-screen tw-h-screen  tw-absolute tw-top-50 tw-left-0 tw-z-20 tw-flex tw-justify-center">
      <div className="register-form tw-shadow-2xl tw-max-w-[86%] tw-h-fit tw-bg-white ">
        <CloseButton />
        <h2>Add New Promotion</h2>
        <p>Please select an image and upload</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Image</label>

            {newPromotionImageUrl ? (
              <img
                src={newPromotionImageUrl}
                alt="Uploaded Promotion"
                className="tw-h-[150px] tw-w-fit"
              />
            ) : (
              <ImageUploadForm
                className="tw-h-fit"
                uploadedImageUrl={(res) => {
                  setNewPromotionImageUrl(res);
                }}
              />
            )}
          </div>

          <div className="form-group">
            <label>About</label>
            <input
              type="text"
              className="form-control"
              {...register("about")}
            />
          </div>

          <div className="form-group">
            <label>Offer</label>
            <input
              type="text"
              className="form-control"
              {...register("offer")}
            />
          </div>

          <input
            type="submit"
            className=" tw-border-2 tw-px-4 tw-py-2 tw-rounded-lg"
          />
        </form>
      </div>
    </div>
  );

  return (
    <>
      {showModal && <AddPromotionForm />}
      <Fragment>
        {data?.user?.image === "SUPERADMIN" && ( // <-- Conditional rendering
          <section className="promotion-section">
            <div className="container">
              <div className="row">
                <div className="col text-end tw-mt-[50px] mb-0">
                  <button
                    className="default-btn"
                    onClick={handleAddNewPromotion}
                  >
                    New promotion
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="tw-flex tw-justify-center tw-items-center ">
            <div className="tw-flex tw-flex-row tw-gap-10 partition2 ">
              {promotionsData.length > 0 &&
                promotionsData.map((data, i) => {
                  return (
                    <Fragment key={i}>
                      <MasterCollectionBanner
                        img={data.img}
                        about={data.about}
                        link={data.link}
                        offer={data.offer}
                        classes={
                          "p-right text-center tw-mt-[50px] tw-mb-[50px]  "
                        }
                        id={data._id}
                      />
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </section>
      </Fragment>
    </>
  );
};

export default FashionBanner;
