import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllCategories } from "../../../services/category.service";
import { createArticle } from "../../../services/article.service";
import { uploadImage } from "../../../services/upload.service";
import type { Category } from "../../../types/category";
import { API_BASE_URL } from "../../../config/env";

const CreateArticle = () => {
const navigate = useNavigate();

const [categories, setCategories] = useState<Category[]>([]);
const [submitting, setSubmitting] = useState(false);
const [uploading, setUploading] = useState(false);
  
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


  useEffect(() => {
    loadCategories();
  }, []);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  try {

    setUploading(true);

   
    const response = await uploadImage(file);

console.log("UPLOAD RESPONSE:", response);
console.log("UPLOAD URL:", response.data.url);

setForm((prev) => ({
  ...prev,
  thumbnail: response.data.url,
}));

    toast.success("Upload berhasil");

  } catch (error: any) {

    toast.error(
      error?.response?.data?.message ??
      "Upload gagal"
    );

  } finally {

    setUploading(false);

  }

};

 const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    setSubmitting(true);


    await createArticle({
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      thumbnail: form.thumbnail,
      categoryId: form.categoryId,
    });


    toast.success(
      "Artikel berhasil dibuat"
    );


    navigate(
      "/dashboard/articles"
    );


  } catch (error: any) {

    toast.error(
      error?.response?.data?.message ??
      "Gagal membuat artikel"
    );


  } finally {

    setSubmitting(false);

  }

};


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
        Create Article
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


        {/* Title */}

        <div>

          <label className="block mb-2 font-medium">
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




        {/* Category */}

        <div>

          <label className="block mb-2 font-medium">
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





        {/* Excerpt */}

        <div>

          <label className="block mb-2 font-medium">
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




        {/* Content */}

        <div>

          <label className="block mb-2 font-medium">
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





        {/* Thumbnail */}

<div>

  <label className="block mb-2 font-medium">
    Thumbnail
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleUpload}
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

  {uploading && (
    <p className="mt-2 text-blue-600 dark:text-blue-400">
      Uploading image...
    </p>
  )}

  {form.thumbnail && (
    <img
      src={`${API_BASE_URL}${form.thumbnail}`}
      alt="Thumbnail Preview"
      className="
  mt-4
  w-48
  rounded-lg
  border
  border-gray-300
  dark:border-gray-700
"
    />
  )}

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
      ? "Saving..."
      : "Save Article"
  }
</button>


      </form>


    </div>

  );
};


export default CreateArticle;