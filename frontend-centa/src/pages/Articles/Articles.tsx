import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  getArticles,
  deleteArticle,
  publishArticle,
  draftArticle,
} from "../../services/article.service";

import { getAllCategories } from "../../services/category.service";

import type { Article } from "../../types/article";
import type { Category } from "../../types/category";
import { API_BASE_URL } from "../../config/env";

const Articles = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState<
    "DRAFT" | "PUBLISHED" | ""
  >("");

  const [categoryId, setCategoryId] = useState("");

  /* =========================================================
     LOAD ARTICLES
  ========================================================= */

  const loadArticles = async () => {
    try {
      setLoading(true);

      const response = await getArticles({
        page,
        limit: pagination.limit,
        search: debouncedSearch || undefined,
        status: status || undefined,
        categoryId: categoryId || undefined,
      });

      setArticles(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to load articles."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOAD CATEGORIES
  ========================================================= */

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();

      setCategories(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to load categories."
      );
    }
  };

  /* =========================================================
     EFFECTS
  ========================================================= */

  useEffect(() => {
    loadArticles();
  }, [
    page,
    debouncedSearch,
    status,
    categoryId,
  ]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmDelete) return;

    try {
      await deleteArticle(id);

      toast.success(
        "Article deleted successfully."
      );

      if (
        articles.length === 1 &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
        return;
      }

      loadArticles();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete article."
      );
    }
  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = async (
    article: Article
  ) => {
    try {
      if (article.status === "DRAFT") {
        await publishArticle(article.id);

        toast.success(
          "Article published successfully."
        );
      } else {
        await draftArticle(article.id);

        toast.success(
          "Article moved to draft."
        );
      }

      loadArticles();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to change article status."
      );
    }
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const publishedArticles =
    articles.filter(
      (article) =>
        article.status === "PUBLISHED"
    ).length;

  const draftArticles =
    articles.filter(
      (article) =>
        article.status === "DRAFT"
    ).length;

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="relative min-h-[70vh] overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/[0.06]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-400">
              Loading articles...
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Preparing your content workspace
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 pb-10">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[18%] top-[8%] h-80 w-80 rounded-full bg-blue-600/[0.045] blur-[120px]" />

        <div className="absolute right-[8%] top-[28%] h-96 w-96 rounded-full bg-indigo-600/[0.04] blur-[140px]" />

        <div className="absolute bottom-[5%] left-[38%] h-72 w-72 rounded-full bg-violet-600/[0.035] blur-[120px]" />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.07]
          bg-[#050918]
          px-7
          py-7
          shadow-[0_20px_70px_rgba(0,0,0,0.22)]
          transition-all
          duration-500
          hover:border-white/[0.10]
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/[0.08] blur-[90px]" />

        <div className="pointer-events-none absolute -bottom-24 left-[35%] h-48 w-72 rounded-full bg-indigo-600/[0.06] blur-[80px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Centa Administration
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Articles
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage, publish, and organize articles
              across the Centa content management system.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/articles/create"
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
              shadow-[0_0_25px_rgba(37,99,235,0.05)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-500/40
              hover:bg-blue-500/[0.14]
              hover:text-blue-300
              hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]
            "
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>

            New Article
          </button>

        </div>
      </section>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* TOTAL */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-white/[0.07]
            bg-[#050918]
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.16)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-500/20
            hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)]
          "
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-600/10 blur-3xl transition-all duration-500 group-hover:bg-blue-600/15" />

          <div className="relative flex items-start justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Total Articles
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {pagination.total}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                All registered articles
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
                shadow-[0_0_20px_rgba(37,99,235,0.08)]
              "
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M5 4h14v16H5z" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            </div>

          </div>
        </div>

        {/* PUBLISHED */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-white/[0.07]
            bg-[#050918]
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.16)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-emerald-500/20
            hover:shadow-[0_20px_60px_rgba(16,185,129,0.07)]
          "
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/15" />

          <div className="relative flex items-start justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Published
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {publishedArticles}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Currently live
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
                shadow-[0_0_20px_rgba(16,185,129,0.08)]
              "
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

          </div>
        </div>

        {/* DRAFT */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-white/[0.07]
            bg-[#050918]
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.16)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-violet-500/20
            hover:shadow-[0_20px_60px_rgba(139,92,246,0.07)]
          "
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/15" />

          <div className="relative flex items-start justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Draft
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {draftArticles}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Awaiting publication
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
                shadow-[0_0_20px_rgba(139,92,246,0.08)]
              "
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l2.5 2" />
              </svg>
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[18px]
          border
          border-white/[0.07]
          bg-[#050918]
          p-3
          shadow-[0_15px_50px_rgba(0,0,0,0.14)]
        "
      >
        <div className="pointer-events-none absolute -left-20 top-1/2 h-32 w-64 -translate-y-1/2 rounded-full bg-blue-600/[0.045] blur-3xl" />

        <div className="relative flex flex-col gap-3 lg:flex-row">

          {/* Search */}

          <div className="relative flex-1">

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-white/[0.06]
                bg-[#080d1d]
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-slate-600
                hover:border-white/[0.10]
                focus:border-blue-500/30
                focus:bg-[#0a1021]
                focus:ring-4
                focus:ring-blue-500/[0.06]
              "
            />

          </div>

          {/* Status */}

          <div className="relative">

            <select
              value={status}
              onChange={(e) => {
                setStatus(
                  e.target.value as
                    | ""
                    | "DRAFT"
                    | "PUBLISHED"
                );
                setPage(1);
              }}
              className="
                h-11
                min-w-[170px]
                appearance-none
                rounded-xl
                border
                border-white/[0.06]
                bg-[#080d1d]
                px-4
                pr-10
                text-sm
                text-slate-300
                outline-none
                transition-all
                duration-300
                hover:border-white/[0.10]
                focus:border-blue-500/30
                focus:ring-4
                focus:ring-blue-500/[0.06]
              "
            >
              <option value="">
                All Status
              </option>

              <option value="PUBLISHED">
                Published
              </option>

              <option value="DRAFT">
                Draft
              </option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

          </div>

          {/* Category */}

          <div className="relative">

            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="
                h-11
                min-w-[190px]
                appearance-none
                rounded-xl
                border
                border-white/[0.06]
                bg-[#080d1d]
                px-4
                pr-10
                text-sm
                text-slate-300
                outline-none
                transition-all
                duration-300
                hover:border-white/[0.10]
                focus:border-blue-500/30
                focus:ring-4
                focus:ring-blue-500/[0.06]
              "
            >
              <option value="">
                All Categories
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

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

          </div>

        </div>
      </section>

      {/* =====================================================
          ARTICLE TABLE
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[20px]
          border
          border-white/[0.07]
          bg-[#050918]
          shadow-[0_20px_70px_rgba(0,0,0,0.20)]
        "
      >
        {/* Table Glow */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-600/[0.045] blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-32 left-[30%] h-64 w-72 rounded-full bg-indigo-600/[0.035] blur-[100px]" />

        {/* =================================================
            TABLE HEADER
        ================================================= */}

        <div className="relative flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-blue-500/10
                bg-blue-500/[0.07]
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
                <path d="M5 4h14v16H5z" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Article Directory
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                All registered content in your CMS
              </p>
            </div>

          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-slate-500
              sm:self-auto
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />

            {pagination.total} articles
          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="relative overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.012]">

                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Thumbnail
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Article
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Author
                </th>

                <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {/* EMPTY */}

              {articles.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-20"
                  >
                    <div className="flex flex-col items-center justify-center text-center">

                      <div
                        className="
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
                          <path d="M5 4h14v16H5z" />
                          <path d="M8 9h8" />
                          <path d="M8 13h6" />
                        </svg>
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-white">
                        No articles found
                      </h3>

                      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-600">
                        Try changing your search or
                        filters, or create a new article.
                      </p>

                    </div>
                  </td>
                </tr>
              )}

              {/* DATA */}

              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="
                    group
                    border-b
                    border-white/[0.045]
                    transition-all
                    duration-300
                    last:border-0
                    hover:bg-blue-500/[0.018]
                  "
                >

                  {/* Thumbnail */}

             <td className="px-6 py-5">
  {article.thumbnail ? (
    <div className="relative w-20">
      <div className="pointer-events-none absolute -inset-1 rounded-xl bg-blue-500/10 opacity-0 blur-md transition-all duration-300 group-hover:opacity-100" />

      <div className="relative aspect-video w-20 overflow-hidden rounded-xl border border-white/[0.08] bg-[#080d1d] shadow-lg">
        <img
          src={
            article.thumbnail.startsWith("http")
              ? article.thumbnail
              : `${API_BASE_URL}${article.thumbnail}`
          }
          alt={article.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-[1.03]
          "
        />
      </div>
    </div>
  ) : (
    <div
      className="
        flex
        aspect-video
        w-20
        items-center
        justify-center
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        text-[10px]
        font-medium
        uppercase
        tracking-wider
        text-slate-600
      "
    >
      No Image
    </div>
  )}
</td>

                  {/* Article */}

                  <td className="px-6 py-5">

                    <div className="max-w-[280px]">

                      <p className="truncate text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-blue-400">
                        {article.title}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-600">
                        Article ID · {article.id}
                      </p>

                    </div>

                  </td>

                  {/* Category */}

                  <td className="px-6 py-5">

                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-lg
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-medium
                        text-slate-400
                      "
                    >
                      {article.category?.name ??
                        "Uncategorized"}
                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    {article.status ===
                    "PUBLISHED" ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-emerald-500/10
                          bg-emerald-500/[0.07]
                          px-3
                          py-1.5
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-emerald-400
                          shadow-[0_0_15px_rgba(16,185,129,0.04)]
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                        Published
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-violet-500/10
                          bg-violet-500/[0.07]
                          px-3
                          py-1.5
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-violet-400
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.7)]" />

                        Draft
                      </span>
                    )}

                  </td>

                  {/* Author */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-white/[0.035]
                          text-[10px]
                          font-bold
                          uppercase
                          text-slate-400
                        "
                      >
                        {article.author?.name
                          ?.charAt(0)
                          ?.toUpperCase() ?? "A"}
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {article.author?.name ??
                          "Unknown"}
                      </span>

                    </div>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-end gap-2">

                      {/* EDIT */}

                      <button
                        type="button"
                        title="Edit article"
                        onClick={() =>
                          navigate(
                            `/dashboard/articles/${article.id}/edit`
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          text-slate-500
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-blue-500/20
                          hover:bg-blue-500/[0.08]
                          hover:text-blue-400
                        "
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </button>

                      {/* STATUS */}

                      <button
                        type="button"
                        title={
                          article.status ===
                          "DRAFT"
                            ? "Publish article"
                            : "Move to draft"
                        }
                        onClick={() =>
                          handleStatusChange(
                            article
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          text-slate-500
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-emerald-500/20
                          hover:bg-emerald-500/[0.08]
                          hover:text-emerald-400
                        "
                      >
                        {article.status ===
                        "DRAFT" ? (
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <path d="M6 4h12v16H6z" />
                            <path d="M9 8h6" />
                            <path d="M9 12h6" />
                            <path d="M9 16h3" />
                          </svg>
                        )}
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        title="Delete article"
                        onClick={() =>
                          handleDelete(article.id)
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          text-slate-500
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-red-500/20
                          hover:bg-red-500/[0.08]
                          hover:text-red-400
                        "
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path d="M4 7h16" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M6 7l1 13h10l1-13" />
                          <path d="M9 7V4h6v3" />
                        </svg>
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* =================================================
            FOOTER / PAGINATION
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

          <p className="text-xs text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-400">
              {articles.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-400">
              {pagination.total}
            </span>{" "}
            articles
          </p>

          <div className="flex items-center gap-2">

            {/* Previous */}

            <button
              type="button"
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  (prev) => prev - 1
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.02]
                px-3
                py-2
                text-xs
                font-medium
                text-slate-500
                transition-all
                hover:border-white/[0.12]
                hover:bg-white/[0.04]
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
                bg-blue-500/[0.10]
                px-3
                text-xs
                font-semibold
                text-blue-400
                shadow-[0_0_18px_rgba(37,99,235,0.08)]
              "
            >
              {page}
            </div>

            {/* Next */}

            <button
              type="button"
              disabled={
                page >=
                  pagination.totalPages
              }
              onClick={() =>
                setPage(
                  (prev) => prev + 1
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.02]
                px-3
                py-2
                text-xs
                font-medium
                text-slate-500
                transition-all
                hover:border-white/[0.12]
                hover:bg-white/[0.04]
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

      </section>

    </div>
  );
};

export default Articles;