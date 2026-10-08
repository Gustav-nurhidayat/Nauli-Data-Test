import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createService,
} from "../../services/service.service";

import type {
  ServicePayload,
} from "../../types/service";


const CreateService = () => {


  const navigate = useNavigate();


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


    if(
      !form.title ||
      !form.shortDescription ||
      !form.description
    ){

      toast.error(
        "Field wajib harus diisi"
      );

      return;

    }



    try {


      setLoading(true);



      await createService(form);



      toast.success(
        "Service berhasil dibuat"
      );



      navigate(
        "/dashboard/services"
      );



    } catch(error:any){


      toast.error(
        error?.response?.data?.message ??
        "Gagal membuat service"
      );


    } finally {


      setLoading(false);


    }


  };





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


  <div
  className="
    mb-8
  "
>

  <h1
    className="
      text-3xl
      font-bold
      tracking-tight
    "
  >
    Create Service
  </h1>

  <p
    className="
      mt-2
      text-slate-500
      dark:text-slate-400
    "
  >
    Create a new company service.
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


        <div>

          <label
            className="
              block
              mb-2
              text-sm
              font-medium
            "
          >
            Title
          </label>


          <input

            type="text"

            name="title"

            value={form.title}

            onChange={handleChange}

            placeholder="Service title"

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
            Short Description
          </label>


          <textarea

            name="shortDescription"

            value={form.shortDescription}

            onChange={handleChange}

            placeholder="Short description"

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
            Description
          </label>


          <textarea

            rows={5}

            name="description"

            value={form.description}

            onChange={handleChange}

            placeholder="Full description"

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
            Icon
          </label>


          <input

            type="text"

            name="icon"

            value={form.icon ?? ""}

            onChange={handleChange}

            placeholder="icon name / url"

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
            Thumbnail
          </label>


          <input

            type="text"

            name="thumbnail"

            value={form.thumbnail ?? ""}

            onChange={handleChange}

            placeholder="thumbnail url"

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
            Order
          </label>


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
            Status
          </label>


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
              px-4
              py-2
              rounded-lg
              border
              dark:bg-gray-900
              dark:border-gray-700
            "

          >

            <option value="true">
              Active
            </option>


            <option value="false">
              Inactive
            </option>


          </select>


        </div>







        <button

          disabled={loading}

          className="
            bg-blue-600
            text-white
            px-6
            py-2
            rounded-lg
            hover:bg-blue-700
          "

        >

          {
            loading
            ? "Saving..."
            : "Create Service"
          }

        </button>



      </form>


    </div>

  );


};


export default CreateService;