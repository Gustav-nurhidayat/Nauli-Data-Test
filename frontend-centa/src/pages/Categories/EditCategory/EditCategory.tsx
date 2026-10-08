import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getCategoryById,
  updateCategory,
} from "../../../services/category.service";

const EditCategory = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const loadCategory = async () => {

    if (!id) {
      return;
    }

    try {

      setLoading(true);

      const response =
        await getCategoryById(id);

      setName(response.data.name);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ??
        "Gagal memuat kategori"
      );

      navigate(
        "/dashboard/categories"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadCategory();

  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!id) {
      return;
    }

    if (!name.trim()) {

      toast.error(
        "Nama kategori wajib diisi"
      );

      return;

    }

    try {

      setSubmitting(true);

      await updateCategory(
        id,
        {
          name: name.trim(),
        }
      );

      toast.success(
        "Kategori berhasil diperbarui"
      );

      navigate(
        "/dashboard/categories"
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ??
        "Gagal memperbarui kategori"
      );

    } finally {

      setSubmitting(false);

    }

  };

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-100
          dark:bg-gray-950
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
              dark:text-gray-400
            "
          >
            Memuat kategori...
          </p>

        </div>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        p-8
        bg-gray-100
        text-gray-900
        dark:bg-gray-950
        dark:text-gray-100
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          mb-6
          text-gray-900
          dark:text-white
        "
      >
        Edit Category
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

          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder="Masukkan nama kategori"
          />

        </div>

        <div
          className="
            flex
            justify-end
            gap-3
            pt-2
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/categories"
              )
            }
            className="
              px-6
              py-2
              border
              border-gray-300
              dark:border-gray-700
              rounded-lg
              text-gray-700
              dark:text-gray-200
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition-colors
            "
          >
            Cancel
          </button>

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
              disabled:cursor-not-allowed
            "
          >
            {
              submitting
                ? "Updating..."
                : "Update Category"
            }
          </button>

        </div>

      </form>

    </div>

  );

};

export default EditCategory;