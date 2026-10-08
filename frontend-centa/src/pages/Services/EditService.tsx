import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getServiceById,
  updateService,
} from "../../services/service.service";

import type {
  ServicePayload,
} from "../../types/service";


const EditService = () => {


  const navigate = useNavigate();

  const { id } = useParams();



  const [form, setForm] =
    useState<ServicePayload>({
      title: "",
      shortDescription: "",
      description: "",
      icon: "",
      thumbnail: "",
      order: 0,
      isActive: true,
    });



  const [loading, setLoading] =
    useState(false);



  const [fetching, setFetching] =
    useState(true);






  useEffect(() => {


    const fetchService = async () => {

      try {


        if(!id) return;



        const data =
          await getServiceById(id);



        setForm({

          title: data.title,

          shortDescription:
            data.shortDescription,

          description:
            data.description,

          icon:
            data.icon ?? "",

          thumbnail:
            data.thumbnail ?? "",

          order:
            data.order,

          isActive:
            data.isActive,

        });



      } catch(error:any){


        toast.error(
          "Gagal mengambil data service"
        );


      } finally {


        setFetching(false);


      }

    };



    fetchService();


  },[id]);








  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {


    const value =
      e.target.name === "order"
        ? Number(e.target.value)
        : e.target.name === "isActive"
        ? e.target.value === "true"
        : e.target.value;



    setForm({

      ...form,

      [e.target.name]:
        value,

    });


  };







  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();



    try {


      setLoading(true);



      await updateService(
        id!,
        form
      );



      toast.success(
        "Service berhasil diperbarui"
      );



      navigate(
        "/dashboard/services"
      );



    } catch(error:any){


      toast.error(
        error?.response?.data?.message ??
        "Gagal update service"
      );


    } finally {


      setLoading(false);


    }


  };






  if(fetching){

    return (

     <div
  className="
    min-h-screen
    p-8
    bg-gradient-to-br
    from-slate-50
    via-white
    to-slate-100
    dark:from-slate-950
    dark:via-slate-950
    dark:to-slate-900
    text-slate-900
    dark:text-white
  "
>

        Loading Service

      </div>

    );

  }






    return (
  <div
    className="
      min-h-screen
      p-8
      bg-gradient-to-br
      from-slate-50
      via-white
      to-slate-100
      dark:from-slate-950
      dark:via-slate-950
      dark:to-slate-900
      text-slate-900
      dark:text-white
    "
  >


      <div className="mb-8">

  <h1
    className="
      text-3xl
      font-bold
      tracking-tight
    "
  >
    Edit Service
  </h1>

  <p
    className="
      mt-2
      text-slate-500
      dark:text-slate-400
    "
  >
    Update service information.
  </p>

</div>




      <form

        onSubmit={handleSubmit}

       className="
space-y-6
rounded-2xl
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
border
border-slate-200/70
dark:border-slate-800
shadow-sm
p-8
"

      >



        <input

          name="title"

          value={form.title}

          onChange={handleChange}

          placeholder="Title"

          className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/10
outline-none
"

        />





        <textarea

          name="shortDescription"

          value={form.shortDescription}

          onChange={handleChange}

          placeholder="Short Description"

          className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
focus:ring-4
resize-none
focus:ring-blue-500/10
outline-none
"

        />







        <textarea

          rows={5}

          name="description"

          value={form.description}

          onChange={handleChange}

          placeholder="Description"

          className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
resize-none
focus:ring-4
focus:ring-blue-500/10
outline-none
"

        />







        <input

          name="icon"

          value={form.icon ?? ""}

          onChange={handleChange}

          placeholder="Icon"

         className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/10
outline-none
"

        />







        <input

          name="thumbnail"

          value={form.thumbnail ?? ""}

          onChange={handleChange}

          placeholder="Thumbnail"

        className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/10
outline-none
"
        />







        <input

          type="number"

          name="order"

          value={form.order ?? 0}

          onChange={handleChange}

        className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/10
outline-none
"

        />








        <select

          name="isActive"

          value={
            form.isActive
              ? "true"
              : "false"
          }

          onChange={handleChange}

          className="
w-full
rounded-xl
border
border-slate-200/70
dark:border-slate-700
bg-white/70
dark:bg-slate-950/60
backdrop-blur
px-4
py-3
text-sm
text-slate-900
dark:text-white
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/10
outline-none
"

        >

          <option value="true">
            Active
          </option>


          <option value="false">
            Inactive
          </option>


        </select>








        <button

          disabled={loading}

          className="
w-full
py-3
rounded-xl
bg-gradient-to-r
from-blue-600
to-indigo-600
hover:shadow-lg
hover:shadow-blue-500/20
transition-all
duration-300
text-white
font-semibold
disabled:opacity-50
disabled:cursor-not-allowed
"

        >

          {
            loading
              ? "Updating..."
              : "Update Service"
          }


        </button>



      </form>


    </div>

  );


};


export default EditService;