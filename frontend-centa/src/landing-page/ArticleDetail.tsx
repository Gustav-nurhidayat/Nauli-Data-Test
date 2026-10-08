import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../services/article.service";
import { API_BASE_URL } from "../config/env";
import SEO from "../components/SEO";

interface Article {
  id: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnail?: string | null;
  publishedAt?: string | null;
  createdAt?: string;

  category?: {
    name: string;
  };

  author?: {
    name: string;
  };
}

export default function ArticleDetail() {
 const { slug } = useParams();

  const [article, setArticle] =
    useState<Article | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
      if (!slug) return;

const response =
  await getArticleById(slug);

        setArticle(response.data);
      } catch (error) {
        console.error(
          "Failed load article:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
 }, [slug]);

  /*
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#060707]
          text-slate-500
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              animate-pulse
              rounded-full
              bg-[#15E0ED]
              shadow-[0_0_10px_rgba(21,224,237,0.7)]
            "
          />

          Loading article...
        </div>
      </main>
    );
  }

  /*
   * =====================================================
   * ARTICLE NOT FOUND
   * =====================================================
   */

  if (!article) {
    return (
      <main
        className="
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          bg-[#060707]
          px-6
          text-white
        "
      >
        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#15E0ED]
          "
        >
          CENTA / ARTICLES
        </span>

        <h1
          className="
            mt-5
            text-3xl
            font-black
            tracking-tight
            sm:text-4xl
          "
        >
          Article Not Found
        </h1>

        <Link
          to="/articles"
          className="
            mt-7
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#15E0ED]
            transition-colors
            duration-300
            hover:text-[#8ff5fa]
          "
        >
          ← Back to Articles
        </Link>
      </main>
    );
  }

  const articleDate =
    article.publishedAt ||
    article.createdAt ||
    "";

    const canonicalUrl =
  `https://centa.ltd/articles/${slug}`;

const seoTitle =
  `${article.title} | Centa Limited`;

const seoDescription =
  article.excerpt ||
  `Read ${article.title} on Centa Limited.`;

const seoImage =
  article.thumbnail
    ? article.thumbnail.startsWith("http")
      ? article.thumbnail
      : `${API_BASE_URL}${article.thumbnail}`
    : "https://centa.ltd/og-image.png";

  /*
   * =====================================================
   * MAIN
   * =====================================================
   */

  return (
  <>
    <SEO
      title={seoTitle}
      description={seoDescription}
      canonical={canonicalUrl}
      image={seoImage}
      type="article"
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
          AMBIENT BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#15E0ED]/[0.025]
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#15E0ED]/20
          to-transparent
        "
      />

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
          ARTICLE HERO
      ====================================================== */}

      <section
        className="
          relative
          border-b
          border-[#1a1d1d]
        "
      >
        <div
          className="
            mx-auto
            max-w-5xl
            px-6
            pb-20
            pt-32
            sm:pb-24
            lg:px-10
            lg:pt-36
          "
        >
          {/* BACK */}

          <Link
            to="/articles"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#697373]
              transition-all
              duration-300
              hover:text-[#15E0ED]
            "
          >
            <span
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            >
              ←
            </span>

            CENTA / ARTICLES
          </Link>

          {/* HERO CONTENT */}

          <div className="mt-12">
            {/* CATEGORY */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#15E0ED]/20
                bg-[#15E0ED]/[0.035]
                px-3.5
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#15E0ED]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#15E0ED]
                  shadow-[0_0_8px_rgba(21,224,237,0.7)]
                "
              />

              {article.category?.name ||
                "Technology"}
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-7
                max-w-5xl
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.045em]
                text-white
                sm:text-5xl
                lg:text-[64px]
              "
            >
              {article.title}
            </h1>

            {/* EXCERPT */}

            {article.excerpt && (
              <p
                className="
                  mt-7
                  max-w-3xl
                  text-base
                  leading-8
                  text-[#8a9494]
                  sm:text-lg
                "
              >
                {article.excerpt}
              </p>
            )}

            {/* META */}

            <div
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#555f5f]
              "
            >
              <span>
                {articleDate
                  ? new Date(
                      articleDate
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "CENTA"}
              </span>

              {article.author && (
                <>
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-[#15E0ED]/50
                    "
                  />

                  <span>
                    By {article.author.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURE IMAGE
      ====================================================== */}

      {article.thumbnail && (
        <section
          className="
            relative
            mx-auto
            max-w-6xl
            px-6
            py-10
            sm:py-14
            lg:px-10
          "
        >
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-[#1a1d1d]
              bg-[#0b0d0d]
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            "
          >
            {/* Image */}

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
                block
                max-h-[650px]
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.015]
              "
            />

            {/* Overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[#060707]/30
                via-transparent
                to-transparent
              "
            />
          </div>
        </section>
      )}

      {/* =====================================================
          ARTICLE CONTENT
      ====================================================== */}

      <section
        className="
          relative
          mx-auto
          max-w-4xl
          px-6
          pb-32
          pt-8
          lg:px-10
        "
      >
        <article
          className="
            max-w-none
          "
        >
          <div
            className="
              whitespace-pre-line
              text-[15px]
              leading-[2]
              text-[#a3adad]
              sm:text-base
              sm:leading-[2.05]
            "
          >
            {article.content}
          </div>
        </article>

        {/* =================================================
            BOTTOM DIVIDER
        ================================================== */}

        <div
          className="
            mt-16
            h-px
            bg-gradient-to-r
            from-[#15E0ED]/20
            via-[#1a1d1d]
            to-transparent
          "
        />

        {/* =================================================
            BACK TO ARTICLES
        ================================================== */}

        <div className="mt-8">
          <Link
            to="/articles"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#697373]
              transition-colors
              duration-300
              hover:text-[#15E0ED]
            "
          >
            <span
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            >
              ←
            </span>

            Back to Articles
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}