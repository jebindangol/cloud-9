import React, { Component, useContext } from "react";
import { useRouter } from "next/router";
import Link from "../../utils/ActiveLink";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { DataContext } from "../../pages/_app";
const MySwal = withReactContent(Swal);


const AddBrandForm = ({ showModal }) => {
    const router = useRouter();

    const { register, handleSubmit, watch, formState } = useForm();
    const { brands, categories } = useContext(DataContext);

    const errorContent = () => {
        MySwal.fire({
            title: "Error!",
            text: "Brand Add Failed!. Please try again",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: true,
        });
    };

    const successContent = () => {
        MySwal.fire({
            title: "Done!",
            text: "Brand Added successfully!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.reload(); 
            }
        });
    };
    

    const onSubmit = async (formData) => {
        const res = await axios
            .post(
                "/api/brand-api",
                {
                    _id: convertToSlug(formData.name),
                    label: formData.name,
                    url: `/products/brand/${convertToSlug(formData.name)}`,
                    key: convertToSlug(formData.name),
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                showModal(false);
                successContent();
            })
            .catch((error) => {
                console.error(error);
                errorContent();
            });
    };

    const CloseButton = () => (
        <div className=" tw-flex justify-content-end">
            <button
                className=" tw-cursor-pointer tw-text-[30px] tw-hover:tw-scale-110"
                style={{ cursor: "pointer" }}
                onClick={() => showModal(false)}
            >
                ╳
            </button>
        </div>
    );

    const convertToSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="register-form tw-w-full tw-mt-36">
            <CloseButton />
            <h2>Add New Brand</h2>
            {/* <p>Enter product details to add new product</p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Brand Name</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("name")}
                    />
                </div>

                <input
                    type="submit"
                    className=" tw-border-2 tw-px-4 tw-py-2 tw-rounded-lg"
                />
            </form>
        </div>
    );
};

export default AddBrandForm;
