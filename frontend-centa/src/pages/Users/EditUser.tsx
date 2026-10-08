import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getUserById,
  updateUser,
} from "../../services/user.service";

import type { Role } from "../../types/user";


import { useAuth } from "../../context/AuthContext";



const EditUser = () => {


  const navigate = useNavigate();

  const { id } = useParams();
  const { user: currentUser } = useAuth();



 const [form, setForm] = useState<{
  name: string;
  email: string;
  role: Role;
}>({
  name: "",
  email: "",
  role: "ADMIN",
});



  const [loading, setLoading] =
    useState(true);



  const [saving, setSaving] =
    useState(false);

    useEffect(() => {
  if (
    currentUser &&
    currentUser.role !== "SUPER_ADMIN"
  ) {
    toast.error("Akses hanya untuk SUPER_ADMIN");
    navigate("/dashboard");
  }
}, [currentUser, navigate]);





  const loadUser = async () => {


    try {


      if (!id) {
        return;
      }



      const user =
        await getUserById(id);



      setForm({

        name: user.name,

        email: user.email,

        role: user.role,

      });



    } catch (error: any) {


      toast.error(
        error?.response?.data?.message ??
        "Gagal mengambil data user"
      );



    } finally {


      setLoading(false);


    }


  };





  useEffect(() => {

    loadUser();

  }, [id]);








  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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



    if (!id) {
      return;
    }




    if (
      !form.name ||
      !form.email
    ) {


      toast.error(
        "Name dan email wajib diisi"
      );


      return;

    }






    try {


      setSaving(true);



      await updateUser(
        id,
        form
      );



      toast.success(
        "User berhasil diperbarui"
      );



      navigate(
        "/dashboard/users"
      );



    } catch (error: any) {


      toast.error(
        error?.response?.data?.message ??
        "Gagal memperbarui user"
      );


    } finally {


      setSaving(false);


    }


  };







  if (loading) {
    if (!currentUser) {
  return null;
}

if (currentUser.role !== "SUPER_ADMIN") {
  return null;
}


    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >

        <div className="text-center">


          <div
            className="
              w-10
              h-10
              border-4
              border-blue-600
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />


          <p
            className="
              mt-4
              text-gray-500
            "
          >
            Memuat user...
          </p>


        </div>


      </div>

    );


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
          "
        >
          Edit User
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
  disabled={currentUser?.id === id}

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
{currentUser?.id === id && (
  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
    Role akun sendiri tidak dapat diubah.
  </p>
)}

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

              disabled={saving}

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
                saving
                ?
                "Saving..."
                :
                "Update User"
              }


            </button>


          </div>




        </form>


      </div>


    </div>


  );


};


export default EditUser;