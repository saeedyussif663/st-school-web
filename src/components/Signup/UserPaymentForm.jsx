import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutWrapper from "./components/LayoutWrapper";
import { useForm } from "react-hook-form";
import { createUser } from "./api/SignupApi";
import { toast } from "react-hot-toast";

const UserPaymentForm = ({ onPrevious, formInput }) => {
  const [userForm, setUserForm] = formInput;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formDataSubmit = { ...userForm, ...data };
    setUserForm({ ...formDataSubmit });

    createUser(formDataSubmit)
      .then((responseData) => {
        /*
           response data contains info abt the user... - email, password, paymentstatus etc
        */
        const { email } = responseData;
        toast.success("user created successfully");
        navigate("/", { state: { email } });
      })
      .catch((err) => {
        toast.error(String(err));
      });
  };

  return (
    <LayoutWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <label htmlFor="text" className="block text-[#706E6E] mb-2">
            Would you like to make a full or partial payment ?
          </label>
          <select
            type="text"
            id="paymentType"
            name="paymentType"
            placeholder="make partial/full payment"
            className="border border-[#C9C9C9] focus:outline-gray-600  w-full p-2 rounded-lg text-[#706E6E] "
            required
            {...register("payment_type", { required: true })}
            defaultValue={userForm["payment_type"] || "Full"}
          >
            <option value="" disabled>
              Select Payment Type
            </option>
            <option name="partial" value="Part">
              Partial Payment &#40;GHC 100/m&#41;
            </option>
            <option name="full" value="Full">
              Full Payment &#40;GHC 300/m&#41;
            </option>
          </select>
        </div>

        <div className="mb-7">
          <label htmlFor="password" className="block text-[#706E6E]">
            Enter your Mobile Money Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder="024-736-9812"
            className="border border-[#C9C9C9] focus:outline-gray-600  w-full p-2 rounded-lg "
            {...register("phone_number", {
              required: "Enter a valid phone number",
              maxLength: { value: 10, message: "Should be a 10 digit number" },
              pattern: {
                value: /^0\d{9}$/,
                message: "Enter a valid phone number",
              },
            })}
            defaultValue={userForm["phone_number"] || null}
          />
          {errors.phoneNumber && (
            <p className="text-red-600">{errors["phone_number"].message}</p>
          )}
        </div>
        <div className="flex md:flex-row items-center  flex-col gap-2">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onPrevious();
            }}
            className="bg-white text-black border border-gray-500 px-4 py-2 w-full rounded-lg hover:border-gray-900"
          >
            Go Back
          </button>
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 w-full rounded-lg md:mb-0 border border-gray-900 hover:bg-gray-800 mb-4"
          >
            Proceed
          </button>
        </div>
        <div className="pb-3 md:mt-4">
          <p>
            <span>Already have an account?</span>
            <Link to={"/login"} className="font-semibold ml-2">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </LayoutWrapper>
  );
};

export default UserPaymentForm;
