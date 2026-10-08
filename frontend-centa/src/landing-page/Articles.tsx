import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../services/article.service";
import { getAllCategories } from "../services/category.service";
import { API_BASE_URL } from "../config/env";
import type { Category } from "../types/category";
import SEO from "../components/SEO";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  publishedAt?: string | null;
  createdAt?: string;

  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles({
          status: "PUBLISHED",
          limit: 100,
          sortBy: "publishedAt",
          sortOrder: "desc",
        });

        setArticles(response.data || []);
      } catch (error) {
        console.error("Failed load articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();

        setCategories(data || []);
      } catch (error) {
        console.error("Failed load categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return articles;
    }

    return articles.filter(
      (article) =>
        article.category?.id === selectedCategory
    );
  }, [articles, selectedCategory]);

  return (
    <>
    <SEO
      title="Articles & Insights — Centa Limited"
      description="Explore articles, insights, cybersecurity knowledge, software engineering, technology, and digital security updates from Centa Limited."
      canonical="https://centa.ltd/articles"
    />
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#060707]
        text-white
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.012]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="relative border-b border-white/[0.06]">
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-32
            lg:px-10
          "
        >
          {/* Label */}

          <div className="flex items-center gap-3">
            <span
              className="
                flex
                h-7
                items-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-3
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              CENTA / ARTICLES
            </span>

            <span
              className="
                hidden
                h-px
                w-12
                bg-white/[0.08]
                sm:block
              "
            />

            <span
              className="
                hidden
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-slate-600
                sm:block
              "
            >
              Knowledge & Security
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mt-7
              max-w-4xl
              text-5xl
              font-black
              leading-[0.95]
              tracking-[-0.055em]
              text-white
              sm:text-6xl
              lg:text-[72px]
            "
          >
            Engineering knowledge,

            <span
              className="
                block
                text-[#15E0ED]
              "
            >
              secure digital futures.
            </span>
          </h1>

          {/* Accent */}

          <div
            className="
              mt-7
              h-px
              w-20
              bg-[#15E0ED]/40
            "
          />

          {/* Description */}

          <p
            className="
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-[#7f8989]
              sm:text-base
            "
          >
            Explore insights, technical knowledge,
            security research, and perspectives from
            the Centa team.
          </p>
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTER
      ====================================================== */}

      <section className="relative">
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            pt-10
            lg:px-10
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            {/* ALL */}

            <button
              type="button"
              onClick={() =>
                setSelectedCategory("all")
              }
              className={`
                rounded-lg
                border
                px-4
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                transition-all
                duration-300

                ${
                  selectedCategory === "all"
                    ? `
                      border-[#15E0ED]/30
                      bg-[#15E0ED]/[0.06]
                      text-[#15E0ED]
                    `
                    : `
                      border-white/[0.08]
                      bg-white/[0.02]
                      text-slate-500
                      hover:border-white/[0.15]
                      hover:bg-white/[0.04]
                      hover:text-white
                    `
                }
              `}
            >
              All
            </button>

            {/* DYNAMIC CATEGORIES */}

            {!categoryLoading &&
              categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category.id)
                  }
                  className={`
                    rounded-lg
                    border
                    px-4
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    transition-all
                    duration-300

                    ${
                      selectedCategory === category.id
                        ? `
                          border-[#15E0ED]/30
                          bg-[#15E0ED]/[0.06]
                          text-[#15E0ED]
                        `
                        : `
                          border-white/[0.08]
                          bg-white/[0.02]
                          text-slate-500
                          hover:border-white/[0.15]
                          hover:bg-white/[0.04]
                          hover:text-white
                        `
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLES
      ====================================================== */}

      <section className="relative">
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-12
            lg:px-10
          "
        >
          {/* Loading */}

          {loading && (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
                text-sm
                text-slate-600
              "
            >
              Loading articles...
            </div>
          )}

          {/* Empty */}

          {!loading &&
            filteredArticles.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.02]
                  px-6
                  py-20
                  text-center
                "
              >
                <p className="text-sm text-slate-500">
                  No articles available in this category.
                </p>
              </div>
            )}

          {/* Articles */}

          {!loading &&
            filteredArticles.length > 0 && (
              <div
                className="
                  grid
                  gap-6
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {filteredArticles.map((article) => {
                  const categoryName =
                    article.category?.name ||
                    "Technology";

                  const articleDate =
                    article.publishedAt ||
                    article.createdAt ||
                    "";

                  return (
                    <article
                      key={article.id}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-[#0b0d0d]
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-[#15E0ED]/20
                        hover:bg-[#0d1010]
                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                      "
                    >
                      {/* =================================================
                          THUMBNAIL
                      ================================================== */}

                      {article.thumbnail && (
                        <div
                          className="
                            relative
                            aspect-[16/9]
                            overflow-hidden
                            border-b
                            border-white/[0.06]
                            bg-[#080a0a]
                          "
                        >
                          <img
                            src={
                              article.thumbnail.startsWith(
                                "http"
                              )
                                ? article.thumbnail
                                : `${API_BASE_URL}${article.thumbnail}`
                            }
                            alt={article.title}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-[#060707]/80
                              via-transparent
                              to-transparent
                            "
                          />
                        </div>
                      )}

                      {/* =================================================
                          CONTENT
                      ================================================== */}

                      <div className="relative p-6">
                        {/* Category */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                          "
                        >
                          <span
                            className="
                              inline-flex
                              items-center
                              rounded-md
                              border
                              border-[#15E0ED]/15
                              bg-[#15E0ED]/[0.035]
                              px-2.5
                              py-1
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-[#15E0ED]
                            "
                          >
                            {categoryName}
                          </span>

                          <span
                            className="
                              h-1.5
                              w-1.5
                              shrink-0
                              rounded-full
                              bg-[#15E0ED]/60
                            "
                          />
                        </div>

                        {/* Title */}

                        <h2
                          className="
                            mt-5
                            text-xl
                            font-bold
                            leading-snug
                            tracking-tight
                            text-white
                            transition-colors
                            duration-300
                            group-hover:text-[#15E0ED]
                          "
                        >
                          {article.title}
                        </h2>

                        {/* Excerpt */}

                        <p
                          className="
                            mt-3
                            line-clamp-3
                            text-sm
                            leading-6
                            text-[#606a6a]
                          "
                        >
                          {article.excerpt ||
                            "Explore the latest insight from Centa Limited."}
                        </p>

                        {/* Divider */}

                        <div
                          className="
                            mt-6
                            h-px
                            bg-[#1a1d1d]
                          "
                        />

                        {/* Footer */}

                        <div
                          className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-4
                          "
                        >
                          <span
                            className="
                              text-[9px]
                              font-medium
                              uppercase
                              tracking-[0.12em]
                              text-[#555f5f]
                            "
                          >
                            {articleDate
                              ? new Date(
                                  articleDate
                                ).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "CENTA"}
                          </span>

                          <Link
                           to={`/articles/${article.slug}`}
                            className="
                              text-xs
                              font-bold
                              text-[#15E0ED]
                              transition-colors
                              duration-300
                              hover:text-white
                            "
                          >
                            Read Article →
                          </Link>
                        </div>
                      </div>

                      {/* =================================================
                          SUBTLE HOVER EDGE
                      ================================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-y-5
                          left-0
                          w-[1px]
                          rounded-full
                          bg-[#15E0ED]
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-60
                        "
                      />
                    </article>
                  );
                })}
              </div>
            )}
        </div>
      </section>
    </main>
 </>
  );
}