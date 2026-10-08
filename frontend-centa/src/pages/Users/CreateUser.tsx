import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import {
  createUser,
} from "../../services/user.service";

import type {
  UserPayload,
} from "../../types/user";


const CreateUser = () => {


  const navigate = useNavigate();
  const { user } = useAuth();


  const [form, setForm] =
    useState<UserPayload>({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
    });



  const [loading, setLoading] =
  useState(false);

useEffect(() => {
  if (user && user.role !== "SUPER_ADMIN") {
    toast.error("Akses hanya untuk SUPER_ADMIN");
    navigate("/dashboard");
  }
}, [user, navigate]);
   



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {


    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });


  };






  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();



    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {

      toast.error(
        "Semua field wajib diisi"
      );

      return;

    }



    try {


      setLoading(true);



      await createUser(form);



      toast.success(
        "User berhasil dibuat"
      );



      navigate(
        "/dashboard/users"
      );



    } catch (error: any) {


      toast.error(
        error?.response?.data?.message ??
        "Gagal membuat user"
      );



    } finally {


      setLoading(false);


    }


  };



if (!user) {
  return null;
}

if (user.role !== "SUPER_ADMIN") {
  return null;
}


  return (

    <div
      className="
        p-8
        min-h-screen
        bg-gray-100
        text-gray-900
        dark:bg-gray-950
        dark:text-gray-100
      "
    >


      <div
        className="
          max-w-xl
          mx-auto
          bg-white
          dark:bg-gray-900
          rounded-lg
          shadow
          border
          border-gray-200
          dark:border-gray-800
          p-6
        "
      >


        <h1
          className="
            text-2xl
            font-bold
            mb-6
            dark:text-white
          "
        >
          Create User
        </h1>





        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <div>


            <label
              className="
                block
                mb-2
                text-sm
                font-medium
              "
            >
              Name
            </label>



            <input

              name="name"

              value={form.name}

              onChange={handleChange}

              className="
                w-full
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                dark:text-white
              "

              placeholder="Enter name"

            />


          </div>






          <div>


            <label
              className="
                block
                mb-2
                text-sm
                font-medium
              "
            >
              Email
            </label>



            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              className="
                w-full
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                dark:text-white
              "

              placeholder="Enter email"

            />


          </div>







          <div>


            <label
              className="
                block
                mb-2
                text-sm
                font-medium
              "
            >
              Password
            </label>



            <input

              type="password"

              name="password"

              value={form.password}

              onChange={handleChange}

              className="
                w-full
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                dark:text-white
              "

              placeholder="Enter password"

            />


          </div>








          <div>


            <label
              className="
                block
                mb-2
                text-sm
                font-medium
              "
            >
              Role
            </label>



            <select

              name="role"

              value={form.role}

              onChange={handleChange}

              className="
                w-full
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                dark:text-white
              "

            >

              <option value="ADMIN">
                ADMIN
              </option>


              <option value="SUPER_ADMIN">
                SUPER_ADMIN
              </option>


            </select>


          </div>









          <div
            className="
              flex
              justify-end
              gap-3
            "
          >


            <button

              type="button"

              onClick={() =>
                navigate(
                  "/dashboard/users"
                )
              }

              className="
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                dark:border-gray-700
              "

            >

              Cancel

            </button>





            <button

              type="submit"

              disabled={loading}

              className="
                px-4
                py-2
                rounded-lg
                bg-blue-600
                hover:bg-blue-700
                text-white
                disabled:opacity-50
              "

            >

              {
                loading
                ?
                "Saving..."
                :
                "Create User"
              }


            </button>


          </div>




        </form>


      </div>


    </div>


  );


};


export default CreateUser;