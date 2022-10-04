import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateAlbum } from "../redux/features/albumSlices";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks'

type detials = {
    id:any,
    name: any,
    username: any,
    email: any,
    phone:any,
}

const Details: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;
  const { id } = useParams();

  const albums = useAppSelector((state) => state.musicAlbum.albums);
  const userDetails = albums && albums.filter((d:any) => d.id === Number(id))[0];

  const [details, setDetails] = useState<detials>();
  const [errors, setErrors] = useState<detials>();

  useEffect(() => {
    return setDetails({
      id: userDetails.id,
      name: userDetails.name,
      username: userDetails.username,
      email: userDetails.email,
      phone: userDetails.phone,
    });
  }, []);

  const handleChange = (e: any) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(updateAlbum(details));
      navigate("/"); 
    }
  };

  const validate = () => {
    const input = { ...details };
    let errors = {} as detials ;
    let isValid = true;

    if (input?.name === "") {
      isValid = false;
       errors.name = "Please enter your first name";
    } else if (input.name?.length > 8) {
      isValid = false;
      errors.name = "Name cannot exceed 8 characters";
    }

    if (input?.username === "") {
      isValid = false;
      errors.username = "Please enter your last name";
    } else if (input.username?.length > 8) {
      isValid = false;
      errors.username = "Name cannot exceed 8 characters";
    }

    if (input.email === "") {
      isValid = false;
      errors.email = "Please enter your email address.";
    } else {
      const emailPattern = new RegExp(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      );

      if (!emailPattern.test(input.email)) {
        isValid = false;
        errors.email = "Please enter valid email address.";
      }
    }
    if (!input.phone) {
      isValid = false;
      errors.phone = "Please enter your phone number.";
    }
    if (typeof input.phone !== "undefined") {
      var phonePattern = new RegExp(/^[0-9\b]+$/);
      if (!phonePattern.test(input.phone)) {
        isValid = false;
        errors.phone = "Please enter only number.";
      } else if (input.phone.length !== 10) {
        isValid = false;
        errors.phone = "Please enter valid phone number.";
      }
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className=" bg-white p-5 max-w-md mx-auto rounded shadow-sm  dark:bg-slate-800 dark:text-gray-400">
      <h2 className=" text-center text-orange-800 text-3xl font-semibold">
        {result === "edit" ? " Edit User Details" : "User Details"}
      </h2>
      {result === "edit" ? (
        <div className="max-w-md py-4 px-8 bg-white border-2  border-orange-400 shadow-md border-shadow-5 shadow-lg rounded-lg my-8 dark:bg-slate-800 dark:text-gray-400">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="w-full border rounded h-12 px-4 focus:outline-none dark:bg-slate-800 dark:text-gray-400"
              value={details?.name}
              name="name"
              onChange={handleChange}
              disabled={result === "view"}
            />
            {errors?.name && <div className="text-red-600">{errors?.name}</div>}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="w-full border rounded h-12 px-4 focus:outline-none dark:bg-slate-800 dark:text-gray-400"
              value={details?.username}
              name="username"
              onChange={handleChange}
              disabled={result === "view"}
            />
            {errors?.username && (
              <div className="text-red-600">{errors?.username}</div>
            )}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="w-full border rounded h-12 px-4 focus:outline-none dark:bg-slate-800 dark:text-gray-400"
              value={details?.email}
              name="email"
              onChange={handleChange}
              disabled={result === "view"}
            />
            {errors?.email && <div className="text-red-600">{errors?.email}</div>}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {" "}
              Phone
            </label>
            <input
              className="w-full border rounded h-12 px-4 focus:outline-none dark:bg-slate-800 dark:text-gray-400"
              value={details?.phone}
              name="phone"
              onChange={handleChange}
              disabled={result === "view"}
            />
            {errors?.phone && <div className="text-red-600">{errors?.phone}</div>}
          </div>
          <br></br>
          {result === "edit" && (
            <button
              className="text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-500 focus:outline-none dark:focus:ring-orange-600"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white p-5 max-w-md mx-auto rounded shadow-sm">
          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div className="flex justify-center md:justify-end -mt-16"></div>
            <div>
              <h1 className="mt-2 text-gray-600 text-xl font-medium ">
                {details?.name}
              </h1>
              <p className="mt-2 text-gray-600 text-xl font-medium ">
                {details?.username}
              </p>
              <p className="mt-2 text-gray-600 text-xl font-medium ">
                {details?.email}
              </p>
              <p className="mt-2 text-gray-600 text-xl font-medium">
                {details?.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
