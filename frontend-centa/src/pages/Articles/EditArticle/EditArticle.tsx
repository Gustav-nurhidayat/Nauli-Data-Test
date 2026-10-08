import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getArticleById,
  updateArticle,
} from "../../../services/article.service";

import {
  getAllCategories,
} from "../../../services/category.service";

import type { Category } from "../../../types/category";


const EditArticle = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);


  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    categoryId: "",
  });



  const loadCategories = async () => {

    try {

      const data = await getAllCategories();

      setCategories(data);


    } catch (error) {

      console.error(
        "Gagal mengambil kategori",
        error
      );

    }

  };



  const loadArticle = async () => {


    if (!id) {
      return;
    }


    try {


      setLoading(true);


      const response = await getArticleById(id);


      const article = response.data;



      setForm({

        title: article.title,

        excerpt: article.excerpt ?? "",

        content: article.content,

        thumbnail: article.thumbnail ?? "",

        categoryId: article.category.id,

      });



    } catch (error: any) {


      toast.error(
        error?.response?.data?.message ??
        "Gagal mengambil artikel"
      );


    } finally {

      setLoading(false);

    }

  };




  useEffect(() => {

    loadCategories();

    loadArticle();

  }, [id]);




  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {


    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });


  };




  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();


    if (!id) {
      return;
    }


    try {


      setSubmitting(true);



      await updateArticle(
        id,
        {
          title: form.title,

          excerpt: form.excerpt,

          content: form.content,

          thumbnail: form.thumbnail,

          categoryId: form.categoryId,
        }
      );



      toast.success(
        "Artikel berhasil diperbarui"
      );



      navigate(
        "/dashboard/articles"
      );



    } catch (error: any) {


      toast.error(
        error?.response?.data?.message ??
        "Gagal memperbarui artikel"
      );


    } finally {


      setSubmitting(false);


    }

  };




  if (loading) {

    return (

     <div className="min-h-screen p-8 bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">

        Loading article...

      </div>

    );

  }





  return (

   <div className="min-h-screen p-8 bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">


      <h1
  className="
    text-3xl
    font-bold
    mb-6
    text-gray-900
    dark:text-white
  "
>
  Edit Article
</h1>



      <form
  onSubmit={handleSubmit}
  className="
    space-y-5
    bg-white
    dark:bg-gray-900
    border
    border-gray-200
    dark:border-gray-800
    p-6
    rounded-lg
    shadow
  "


      >


        <div>

        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>


          <input

            type="text"

            name="title"

            value={form.title}

            onChange={handleChange}

            className="
  w-full
  border
  border-gray-300
  dark:border-gray-700
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-white
  rounded-lg
  px-4
  py-2
"

          />

        </div>




        <div>


         <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>



          <select

            name="categoryId"

            value={form.categoryId}

            onChange={handleChange}

            className="
  w-full
  border
  border-gray-300
  dark:border-gray-700
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-white
  rounded-lg
  px-4
  py-2
"

          >

            <option value="">
              Pilih Category
            </option>



            {categories.map((category) => (

              <option

                key={category.id}

                value={category.id}

              >

                {category.name}

              </option>

            ))}


          </select>


        </div>





        <div>

         <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Excerpt
          </label>


          <textarea

            name="excerpt"

            value={form.excerpt}

            onChange={handleChange}

            rows={3}

            className="
  w-full
  border
  border-gray-300
  dark:border-gray-700
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-white
  rounded-lg
  px-4
  py-2
  min-h-[250px]
"

          />


        </div>





        <div>

         <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>


          <textarea

            name="content"

            value={form.content}

            onChange={handleChange}

            rows={8}

           className="
  w-full
  border
  border-gray-300
  dark:border-gray-700
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-white
  rounded-lg
  px-4
  py-2
  min-h-[250px]
"

          />


        </div>





        <div>

         <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Thumbnail URL
          </label>


          <input

            type="text"

            name="thumbnail"

            value={form.thumbnail}

            onChange={handleChange}

           className="
  w-full
  border
  border-gray-300
  dark:border-gray-700
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-white
  rounded-lg
  px-4
  py-2
"

          />


        </div>





       <button
  type="submit"
  disabled={submitting}
  className="
    bg-blue-600
    hover:bg-blue-700
    dark:hover:bg-blue-500
    text-white
    px-6
    py-2
    rounded-lg
    transition-colors
    disabled:opacity-50
  "
>

          {
            submitting
              ? "Updating..."
              : "Update Article"
          }


        </button>



      </form>


    </div>

  );

};


export default EditArticle;