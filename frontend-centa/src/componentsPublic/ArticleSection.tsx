import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getArticles } from "../services/article.service";
import type { Article } from "../types/article";


export const ArticleSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const FALLBACK_IMAGE =
    "https://via.placeholder.com/1200x800/080d1d/00BFFF?text=Centa+Insight";

  useEffect(() => {
  const fetchArticles = async () => {
    try {
      setLoading(true);

      const data = await getArticles();

      const result = data.data || [];

      setArticles(
        Array.isArray(result)
          ? result.slice(0, 3)
          : []
      );

    } catch (error) {
      console.error(
        "Gagal mengambil data artikel:",
        error
      );

      setArticles([]);

    } finally {
      setLoading(false);
    }
  };

  fetchArticles();

}, []);

  const formatDate = (date?: string) => {
    if (!date) return "Centa Insight";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Centa Insight";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00BFFF]">
              <span>03</span>

              <span className="h-px w-8 bg-[#00BFFF]/40" />

              <span>Insight & News</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Latest
              <span className="text-slate-500"> Articles.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
              Insight, teknologi, software development, dan cybersecurity
              dari perspektif Centa Limited.
            </p>
          </div>

          <Link
            to="/articles"
            className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-slate-400 transition-colors hover:text-[#00BFFF]"
          >
            View all articles

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
              >
                <div className="h-56 animate-pulse bg-white/[0.04]" />

                <div className="space-y-4 p-6">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-5 w-4/5 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-4 w-full animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          /* ===================================================
             EMPTY STATE
          ==================================================== */

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/5 text-[#00BFFF]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
              >
                <path
                  d="M5 4H19V20H5C4.45 20 4 19.55 4 19V5C4 4.45 4.45 4 5 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M8 8H16M8 12H16M8 16H13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-bold text-white">
              No articles yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Insight dan artikel terbaru dari Centa Limited akan
              ditampilkan di sini.
            </p>
          </div>
        ) : (
          /* ===================================================
             ARTICLES
          ==================================================== */

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {articles.map((item, index) => {
            const imgUrl =
  item.thumbnail ||
  FALLBACK_IMAGE;

             const date =
  item.publishedAt || item.createdAt;

              return (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-[#00BFFF]/30 hover:bg-white/[0.04] hover:shadow-[0_25px_80px_rgba(0,191,255,0.07)]"
                >
                  {/* Image */}
                 <Link
  to={`/articles/${item.slug}`}
  className="relative block h-56 overflow-hidden bg-[#080d1d]"
>
                    <img
                      src={imgUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target =
                          e.currentTarget as HTMLImageElement;

                        if (target.src !== FALLBACK_IMAGE) {
                          target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />

                    {/* Top Meta */}
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-[#050816]/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-300 backdrop-blur-md">
                        Insight
                      </span>

                      <span className="text-xs font-black text-white/30">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Bottom Date */}
                    <div className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                      {formatDate(date)}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex min-h-[235px] flex-col p-6">
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#00BFFF]">
                      {item.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                      {item.excerpt ||
                        
                        "Explore the latest insights and perspectives from Centa Limited."}
                    </p>

                    {/* Read More */}
                    <div className="mt-auto pt-7">
                      <Link
  to={`/articles/${item.slug}`}
  className="group/link inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-[#00BFFF]"
>
                        Read Article

                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-sm transition-all duration-300 group-hover/link:border-[#00BFFF]/30 group-hover/link:bg-[#00BFFF]/5 group-hover/link:text-[#00BFFF]">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =====================================================
            BOTTOM LINK
        ====================================================== */}

        {!loading && articles.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/articles"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-xs font-semibold text-slate-400 transition-all duration-300 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5 hover:text-[#00BFFF]"
            >
              Explore the Centa Knowledge Hub

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
