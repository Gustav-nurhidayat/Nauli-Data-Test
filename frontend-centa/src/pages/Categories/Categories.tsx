import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  getCategories,
  deleteCategory,
} from "../../services/category.service";

import type { Category } from "../../types/category";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* =========================================================
     LOAD CATEGORIES
  ========================================================= */

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories({
        page,
        limit: pagination.limit,
        search: debouncedSearch || undefined,
      });

      setCategories(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     DELETE CATEGORY
  ========================================================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteCategory(id);

      toast.success("Category deleted successfully");

      if (categories.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }

      loadCategories();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete category"
      );
    }
  };

  /* =========================================================
     FETCH DATA
  ========================================================= */

  useEffect(() => {
    loadCategories();
  }, [page, debouncedSearch]);

  /* =========================================================
     SEARCH DEBOUNCE
  ========================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* =========================================================
     STATS
  ========================================================= */

  const totalCategories = pagination.total;

  const visibleCategories = categories.length;

  const currentPage = pagination.totalPages
    ? page
    : 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="relative min-h-full overflow-hidden text-slate-200">

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top blue glow */}
        <div
          className="
            absolute
            -left-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-600/[0.08]
            blur-[120px]
          "
        />

        {/* Right indigo glow */}
        <div
          className="
            absolute
            -right-40
            top-[260px]
            h-[520px]
            w-[520px]
            rounded-full
            bg-indigo-600/[0.07]
            blur-[140px]
          "
        />

        {/* Bottom blue glow */}
        <div
          className="
            absolute
            bottom-[-220px]
            left-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/[0.05]
            blur-[140px]
          "
        />

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 space-y-6">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.07]
            bg-[#050918]/90
            px-7
            py-7
            shadow-[0_20px_80px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
            sm:px-9
            sm:py-8
          "
        >

          {/* Header glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-32
              h-72
              w-72
              rounded-full
              bg-blue-500/[0.07]
              blur-[90px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-100px]
              left-[35%]
              h-48
              w-48
              rounded-full
              bg-indigo-500/[0.05]
              blur-[80px]
            "
          />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-blue-500
                    shadow-[0_0_10px_rgba(59,130,246,0.9)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-slate-500
                  "
                >
                  Centa Administration
                </span>

              </div>


              <h1
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-white
                  sm:text-[34px]
                "
              >
                Categories
              </h1>


              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Manage content categories and keep your
                website structure organized.
              </p>

            </div>


            {/* New Category */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard/categories/create"
                )
              }
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-blue-500/20
                bg-blue-500/[0.08]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-blue-400
                shadow-[0_0_25px_rgba(59,130,246,0.04)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-blue-400/40
                hover:bg-blue-500/[0.14]
                hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]
              "
            >

              <svg
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:rotate-90
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>

              New Category

            </button>

          </div>

        </div>


        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
        >

          {/* Total */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.07]
              bg-[#050918]/90
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-500/20
              hover:shadow-[0_15px_50px_rgba(37,99,235,0.08)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-blue-500/[0.08]
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-blue-500/[0.14]
              "
            />

            <div className="relative flex items-center justify-between">

              <div>

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  Total Categories
                </p>

                <p
                  className="
                    mt-3
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-white
                  "
                >
                  {totalCategories}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Registered categories
                </p>

              </div>


              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-500/10
                  bg-blue-500/[0.08]
                  text-blue-400
                  shadow-[0_0_25px_rgba(59,130,246,0.05)]
                "
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="4"
                    y="4"
                    width="6"
                    height="6"
                    rx="1"
                  />
                  <rect
                    x="14"
                    y="4"
                    width="6"
                    height="6"
                    rx="1"
                  />
                  <rect
                    x="4"
                    y="14"
                    width="6"
                    height="6"
                    rx="1"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="6"
                    height="6"
                    rx="1"
                  />
                </svg>
              </div>

            </div>

          </div>


          {/* Current Results */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.07]
              bg-[#050918]/90
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-violet-500/20
              hover:shadow-[0_15px_50px_rgba(139,92,246,0.08)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-violet-500/[0.08]
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-violet-500/[0.14]
              "
            />

            <div className="relative flex items-center justify-between">

              <div>

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  Current Results
                </p>

                <p
                  className="
                    mt-3
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-white
                  "
                >
                  {visibleCategories}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Results on this page
                </p>

              </div>


              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-500/10
                  bg-violet-500/[0.08]
                  text-violet-400
                "
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h10" />
                </svg>
              </div>

            </div>

          </div>


          {/* System */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.07]
              bg-[#050918]/90
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-500/20
              hover:shadow-[0_15px_50px_rgba(16,185,129,0.08)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-emerald-500/[0.07]
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-emerald-500/[0.13]
              "
            />

            <div className="relative flex items-center justify-between">

              <div>

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  Category System
                </p>

                <div className="mt-3 flex items-center gap-2">

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-500
                      shadow-[0_0_10px_rgba(16,185,129,0.9)]
                    "
                  />

                  <span className="text-lg font-semibold text-white">
                    Operational
                  </span>

                </div>

                <p className="mt-1 text-xs text-slate-600">
                  CMS category management
                </p>

              </div>


              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-500/10
                  bg-emerald-500/[0.08]
                  text-emerald-400
                "
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v3" />
                  <path d="M12 18v3" />
                  <path d="M3 12h3" />
                  <path d="M18 12h3" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            SEARCH
        =================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-white/[0.07]
            bg-[#050918]/90
            p-3
            backdrop-blur-xl
            shadow-[0_15px_60px_rgba(0,0,0,0.12)]
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-blue-500/20
              to-transparent
            "
          />

          <div className="relative">

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                flex
                items-center
                pl-4
                text-slate-500
              "
            >

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

            </div>


            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                rounded-xl
                border
                border-transparent
                bg-white/[0.035]
                py-3.5
                pl-12
                pr-4
                text-sm
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-slate-600
                focus:border-blue-500/20
                focus:bg-blue-500/[0.025]
                focus:ring-4
                focus:ring-blue-500/[0.05]
              "
            />

          </div>

        </div>


        {/* ===================================================
            CATEGORY DIRECTORY
        =================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.07]
            bg-[#050918]/90
            backdrop-blur-xl
            shadow-[0_20px_80px_rgba(0,0,0,0.16)]
          "
        >

          {/* Side glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              top-16
              h-72
              w-72
              rounded-full
              bg-blue-500/[0.045]
              blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -left-24
              bottom-0
              h-64
              w-64
              rounded-full
              bg-indigo-500/[0.035]
              blur-[100px]
            "
          />


          {/* Table Header */}

          <div
            className="
              relative
              flex
              flex-col
              gap-4
              border-b
              border-white/[0.06]
              px-6
              py-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500/[0.08]
                    text-blue-400
                  "
                >

                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 5h16" />
                    <path d="M4 12h16" />
                    <path d="M4 19h10" />
                  </svg>

                </div>

                <div>

                  <h2 className="text-sm font-semibold text-white">
                    Category Directory
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-600">
                    All registered content categories
                  </p>

                </div>

              </div>

            </div>


            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-3
                py-1.5
                text-[10px]
                font-medium
                text-slate-500
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_8px_rgba(16,185,129,0.8)]
                "
              />

              {pagination.total} categories

            </div>

          </div>


          {/* =================================================
              TABLE
          ================================================= */}

          <div className="relative overflow-x-auto">

            <table className="w-full min-w-[720px]">

              <thead>

                <tr
                  className="
                    border-b
                    border-white/[0.05]
                    bg-white/[0.012]
                  "
                >

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-slate-600
                    "
                  >
                    Category
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-slate-600
                    "
                  >
                    Slug
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-slate-600
                    "
                  >
                    Created
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-right
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-slate-600
                    "
                  >
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* =========================================
                    LOADING
                ========================================= */}

                {loading && (
                  <tr>

                    <td
                      colSpan={4}
                      className="px-6 py-20"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div
                          className="
                            h-9
                            w-9
                            animate-spin
                            rounded-full
                            border-2
                            border-slate-800
                            border-t-blue-500
                            shadow-[0_0_20px_rgba(59,130,246,0.15)]
                          "
                        />

                        <p
                          className="
                            mt-4
                            text-xs
                            font-medium
                            text-slate-600
                          "
                        >
                          Loading categories...
                        </p>

                      </div>

                    </td>

                  </tr>
                )}


                {/* =========================================
                    EMPTY
                ========================================= */}

                {!loading &&
                  categories.length === 0 && (
                    <tr>

                      <td
                        colSpan={4}
                        className="px-6 py-20"
                      >

                        <div className="flex flex-col items-center justify-center text-center">

                          <div
                            className="
                              mb-5
                              flex
                              h-14
                              w-14
                              items-center
                              justify-center
                              rounded-2xl
                              border
                              border-white/[0.06]
                              bg-white/[0.025]
                              text-slate-600
                            "
                          >

                            <svg
                              className="h-6 w-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <rect
                                x="4"
                                y="4"
                                width="16"
                                height="16"
                                rx="2"
                              />
                              <path d="M8 9h8" />
                              <path d="M8 13h5" />
                            </svg>

                          </div>


                          <h3 className="text-sm font-semibold text-white">
                            No categories found
                          </h3>

                          <p
                            className="
                              mt-1
                              max-w-sm
                              text-xs
                              leading-5
                              text-slate-600
                            "
                          >
                            Try another search term or create
                            a new category to get started.
                          </p>


                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                "/dashboard/categories/create"
                              )
                            }
                            className="
                              mt-5
                              rounded-lg
                              border
                              border-blue-500/20
                              bg-blue-500/[0.07]
                              px-4
                              py-2
                              text-xs
                              font-semibold
                              text-blue-400
                              transition
                              hover:bg-blue-500/[0.12]
                            "
                          >
                            Create Category
                          </button>

                        </div>

                      </td>

                    </tr>
                  )}


                {/* =========================================
                    DATA
                ========================================= */}

                {!loading &&
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="
                        group
                        border-b
                        border-white/[0.045]
                        transition-all
                        duration-300
                        last:border-0
                        hover:bg-blue-500/[0.025]
                      "
                    >

                      {/* Category */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div
                            className="
                              relative
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-xl
                              border
                              border-blue-500/10
                              bg-blue-500/[0.06]
                              text-sm
                              font-bold
                              text-blue-400
                              transition-all
                              duration-300
                              group-hover:border-blue-500/25
                              group-hover:bg-blue-500/[0.1]
                              group-hover:shadow-[0_0_22px_rgba(59,130,246,0.12)]
                            "
                          >

                            <span
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-br
                                from-blue-500/[0.08]
                                to-indigo-500/[0.02]
                              "
                            />

                            <span className="relative">
                              {category.name
                                ?.charAt(0)
                                ?.toUpperCase() || "C"}
                            </span>

                          </div>


                          <div className="min-w-0">

                            <p
                              className="
                                truncate
                                text-sm
                                font-semibold
                                text-slate-200
                                transition-colors
                                group-hover:text-white
                              "
                            >
                              {category.name}
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-[10px]
                                uppercase
                                tracking-wider
                                text-slate-600
                              "
                            >
                              Content Category
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Slug */}

                      <td className="px-6 py-5">

                        <span
                          className="
                            inline-flex
                            max-w-[240px]
                            items-center
                            truncate
                            rounded-lg
                            border
                            border-white/[0.05]
                            bg-white/[0.025]
                            px-3
                            py-1.5
                            font-mono
                            text-[11px]
                            text-slate-500
                            transition
                            group-hover:border-blue-500/10
                            group-hover:text-slate-400
                          "
                        >
                          {category.slug}
                        </span>

                      </td>


                      {/* Created */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <svg
                            className="
                              h-3.5
                              w-3.5
                              shrink-0
                              text-slate-700
                            "
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                          </svg>

                          <span className="text-xs text-slate-500">
                            {new Date(
                              category.createdAt
                            ).toLocaleDateString()}
                          </span>

                        </div>

                      </td>


                      {/* Actions */}

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-end gap-2">

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/dashboard/categories/${category.id}/edit`
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-lg
                              border
                              border-white/[0.07]
                              bg-white/[0.025]
                              px-3
                              py-2
                              text-[11px]
                              font-semibold
                              text-slate-500
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:border-blue-500/20
                              hover:bg-blue-500/[0.07]
                              hover:text-blue-400
                              hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]
                            "
                          >

                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>

                            Edit

                          </button>


                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(category.id)
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-lg
                              border
                              border-red-500/10
                              bg-red-500/[0.045]
                              px-3
                              py-2
                              text-[11px]
                              font-semibold
                              text-red-400/80
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:border-red-500/20
                              hover:bg-red-500/[0.09]
                              hover:text-red-400
                              hover:shadow-[0_0_20px_rgba(239,68,68,0.07)]
                            "
                          >

                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M3 6h18" />
                              <path d="M8 6V4h8v2" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v5" />
                              <path d="M14 11v5" />
                            </svg>

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="
              relative
              flex
              flex-col
              gap-4
              border-t
              border-white/[0.06]
              px-6
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="flex items-center gap-2">

              <span className="text-[11px] text-slate-600">
                Page
              </span>

              <span
                className="
                  font-semibold
                  text-slate-400
                "
              >
                {currentPage || 1}
              </span>

              <span className="text-[11px] text-slate-700">
                of
              </span>

              <span
                className="
                  font-semibold
                  text-slate-400
                "
              >
                {pagination.totalPages || 1}
              </span>

            </div>


            <div className="flex items-center gap-2">

              {/* Previous */}

              <button
                type="button"
                disabled={page === 1 || loading}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-3
                  py-2
                  text-[11px]
                  font-semibold
                  text-slate-500
                  transition-all
                  hover:border-white/[0.12]
                  hover:bg-white/[0.05]
                  hover:text-slate-300
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >

                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>

                Previous

              </button>


              {/* Current Page */}

              <div
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-blue-500/20
                  bg-blue-500/[0.1]
                  px-3
                  text-[11px]
                  font-bold
                  text-blue-400
                  shadow-[0_0_20px_rgba(59,130,246,0.08)]
                "
              >
                {page}
              </div>


              {/* Next */}

              <button
                type="button"
                disabled={
                  page >= pagination.totalPages ||
                  loading ||
                  pagination.totalPages === 0
                }
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-3
                  py-2
                  text-[11px]
                  font-semibold
                  text-slate-500
                  transition-all
                  hover:border-white/[0.12]
                  hover:bg-white/[0.05]
                  hover:text-slate-300
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >

                Next

                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>

              </button>

            </div>

          </div>

        </div>


        {/* ===================================================
            FOOTER STATUS
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            px-2
            pb-4
            text-[10px]
            text-slate-700
          "
        >

          <span>
            Showing {visibleCategories} of {totalCategories} categories
          </span>

          <div className="flex items-center gap-2">

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-500
                shadow-[0_0_8px_rgba(16,185,129,0.8)]
              "
            />

            Category system operational

          </div>

        </div>

      </div>

    </div>
  );
};

export default Categories;