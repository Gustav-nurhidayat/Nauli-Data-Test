import { Outlet, useLocation } from "react-router-dom";
import { ChevronRight, Circle } from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/contacts": "Feedback",
  "/dashboard/articles": "Articles",
  "/dashboard/categories": "Categories",
  "/dashboard/services": "Services",
  "/dashboard/users": "User Management",
  "/dashboard/team": "Team",
  "/dashboard/about": "About",
  "/dashboard/settings": "Settings",
};

export default function AdminLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (pageTitles[path]) {
      return pageTitles[path];
    }

    const matchedPath = Object.keys(pageTitles).find(
      (key) => key !== "/dashboard" && path.startsWith(`${key}/`)
    );

    return matchedPath ? pageTitles[matchedPath] : "Management";
  };

  const pageTitle = getPageTitle();

  return (
    <div
      className="
        relative
        flex
        h-screen
        w-full
        overflow-hidden
        bg-[#f8fafc]
        text-slate-900
        selection:bg-blue-500/20
        selection:text-blue-700
        dark:bg-[#060a12]
        dark:text-white
        dark:selection:bg-blue-400/20
        dark:selection:text-blue-300
      "
    >
      {/* Ambient Background */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-blue-500/[0.035]
            blur-[100px]
            dark:bg-blue-500/[0.045]
          "
        />

        <div
          className="
            absolute
            -right-40
            top-1/4
            h-[30rem]
            w-[30rem]
            rounded-full
            bg-indigo-500/[0.025]
            blur-[110px]
            dark:bg-indigo-500/[0.04]
          "
        />

        <div
          className="
            absolute
            bottom-[-15rem]
            left-1/3
            h-[28rem]
            w-[28rem]
            rounded-full
            bg-violet-500/[0.02]
            blur-[110px]
            dark:bg-violet-500/[0.035]
          "
        />
      </div>

      {/* Sidebar */}
      <aside
        className="
          relative
          z-40
          hidden
          h-screen
          shrink-0
          lg:block
        "
      >
        <Sidebar />
      </aside>

      {/* Application */}
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          min-w-0
          flex-1
          flex-col
        "
      >
        {/* Header */}
        <header
          className="
            sticky
            top-0
            z-30
            flex
            h-16
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200/70
            bg-white/80
            px-4
            backdrop-blur-xl
            supports-[backdrop-filter]:bg-white/65
            sm:px-6
            lg:px-8
            dark:border-white/[0.055]
            dark:bg-[#060a12]/80
            dark:supports-[backdrop-filter]:bg-[#060a12]/70
          "
        >
          {/* Left */}
          <div className="flex min-w-0 items-center">
            <div className="flex min-w-0 items-center gap-2.5">
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
                  border-blue-500/15
                  bg-blue-500/[0.06]
                  dark:border-blue-400/10
                  dark:bg-blue-400/[0.06]
                "
              >
                <Circle
                  size={7}
                  strokeWidth={0}
                  fill="currentColor"
                  className="
                    text-blue-500
                    dark:text-blue-400
                  "
                />
              </div>

              <div className="min-w-0">
                <div
                  className="
                    hidden
                    items-center
                    gap-1.5
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                    sm:flex
                    dark:text-slate-500
                  "
                >
                  <span>Security</span>

                  <ChevronRight size={11} />

                  <span>Control Panel</span>
                </div>

                <h1
                  className="
                    truncate
                    text-sm
                    font-semibold
                    tracking-[-0.01em]
                    text-slate-900
                    sm:text-[15px]
                    dark:text-white
                  "
                >
                  {pageTitle}
                </h1>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-2">
            {/* System Status */}
            <div
              className="
                hidden
                h-9
                items-center
                gap-2
                rounded-lg
                border
                border-emerald-500/15
                bg-emerald-500/[0.045]
                px-3
                md:flex
                dark:border-emerald-400/10
                dark:bg-emerald-400/[0.04]
              "
            >
              <span
                className="
                  relative
                  flex
                  h-1.5
                  w-1.5
                "
              >
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                  "
                />
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                Online
              </span>
            </div>

            {/* Theme */}
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-500
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                transition-all
                duration-200
                hover:border-slate-300
                hover:bg-slate-50
                hover:text-slate-700
                dark:border-white/[0.07]
                dark:bg-white/[0.025]
                dark:text-slate-400
                dark:hover:border-white/[0.12]
                dark:hover:bg-white/[0.05]
                dark:hover:text-slate-200
              "
            >
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main */}
        <main
          className="
            relative
            min-w-0
            flex-1
            overflow-x-hidden
            px-4
            py-6
            sm:px-6
            sm:py-7
            lg:px-8
            lg:py-8
          "
        >
          {/* Top Accent */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-blue-500/20
              to-transparent
              dark:via-blue-400/15
            "
          />

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[1680px]
            "
          >
            <Outlet />
          </div>
        </main>
          </div>
          </div>
         );
}