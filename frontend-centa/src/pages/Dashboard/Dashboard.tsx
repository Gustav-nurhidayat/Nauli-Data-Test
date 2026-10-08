import { useEffect, useState } from "react";
import {
  ArrowRight,
  List,
  Mail,
  Save,
  ShieldCheck,
  Users,
} from "lucide-react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  getDashboard,
  getDashboardXss,
} from "../../services/dashboard.service";
import type {
  DashboardData,
  DashboardResponse,
  DashboardStatistics,
} from "../../types/dashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  const [statistics, setStatistics] =
    useState<DashboardStatistics | null>(null);

  const [latestContacts, setLatestContacts] =
    useState<DashboardData["latestContacts"]>([]);

  const [loading, setLoading] = useState(true);
  const [xssPayload, setXssPayload] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const response: DashboardResponse = await getDashboard();

setStatistics(response.data.statistics);
setLatestContacts(response.data.latestContacts);

const xssResponse = await getDashboardXss();
setXssPayload(xssResponse.data.xssPayload);
      } catch (error: any) {
        console.error("LOAD DASHBOARD ERROR:", error);

        toast.error(
          error?.response?.data?.message ??
            "Gagal memuat dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <div className="min-h-[70vh]">
        <div
          className="
            flex
            min-h-[520px]
            items-center
            justify-center
            rounded-3xl
            border
            border-slate-200/70
            bg-white
            shadow-sm
            dark:border-white/[0.06]
            dark:bg-slate-950/40
          "
        >
          <div className="flex flex-col items-center">
            <div
              className="
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/[0.08]
              "
            >
              <div
                className="
                  h-6
                  w-6
                  animate-spin
                  rounded-full
                  border-2
                  border-blue-500/20
                  border-t-blue-500
                "
              />
            </div>

            <p
              className="
                mt-4
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Memuat dashboard
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Menyiapkan data Centa...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">

      {/* ====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200/70
          bg-white
          shadow-sm
          dark:border-white/[0.06]
          dark:bg-slate-950/50
        "
      >
        {/* Grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            dark:opacity-[0.045]
          "
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Blue glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-blue-500/[0.10]
            blur-3xl
            dark:bg-blue-400/[0.08]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-140px]
            right-[20%]
            h-72
            w-72
            rounded-full
            bg-indigo-500/[0.06]
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            min-h-[250px]
            flex-col
            justify-between
            gap-8
            p-6
            sm:p-8
            lg:p-10
          "
        >
          <div>
            {/* Status */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-500/15
                bg-blue-500/[0.06]
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-blue-600
                dark:border-blue-400/10
                dark:bg-blue-400/[0.06]
                dark:text-blue-400
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
                    bg-blue-500
                    opacity-50
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-blue-500
                  "
                />
              </span>

              Internal Overview
            </div>

            {/* Heading */}
            <h1
              className="
                mt-5
                max-w-3xl
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-4xl
                lg:text-[42px]
                lg:leading-[1.1]
                dark:text-white
              "
            >
             Welcome ,{" "}
              <span className="text-blue-500">
                {user?.name || "Admin"}
              </span>
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                sm:text-[15px]
                dark:text-slate-400
              "
            >
              Your centralized hub for Centa's activity,
              insights, and performance.
            </p>
          </div>

          {/* Bottom information */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-3
              border-t
              border-slate-200/70
              pt-5
              dark:border-white/[0.06]
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_10px_rgba(16,185,129,0.6)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                System operational
              </span>
            </div>

            <div
              className="
                hidden
                h-3
                w-px
                bg-slate-200
                sm:block
                dark:bg-slate-700
              "
            />

            <span
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              Lab Administration
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================
          STATISTICS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* ARTICLES */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-blue-500/5
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-blue-500/[0.07]
              blur-2xl
            "
          />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-500
                  ring-1
                  ring-blue-500/10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <List size={19} />
              </div>

              <span
                className="
                  rounded-full
                  bg-blue-500/5
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-blue-500
                "
              >
                Content
              </span>
            </div>

            <div className="mt-7">
              <p
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {statistics?.totalArticles ?? 0}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Total articles
              </p>
            </div>
          </div>
        </div>

        {/* USERS */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-emerald-500/5
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-emerald-500/[0.07]
              blur-2xl
            "
          />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-500/10
                  text-emerald-500
                  ring-1
                  ring-emerald-500/10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <Users size={19} />
              </div>

              <span
                className="
                  rounded-full
                  bg-emerald-500/5
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-emerald-500
                "
              >
                Access
              </span>
            </div>

            <div className="mt-7">
              <p
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {statistics?.totalUsers ?? 0}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Registered users
              </p>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-violet-500/5
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-violet-500/[0.07]
              blur-2xl
            "
          />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-500/10
                  text-violet-500
                  ring-1
                  ring-violet-500/10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <ShieldCheck size={19} />
              </div>

              <span
                className="
                  rounded-full
                  bg-violet-500/5
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-violet-500
                "
              >
                Business
              </span>
            </div>

            <div className="mt-7">
              <p
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {statistics?.totalServices ?? 0}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Active services
              </p>
            </div>
          </div>
        </div>

        {/* CONTACTS */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-rose-500/5
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-rose-500/[0.07]
              blur-2xl
            "
          />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-rose-500/10
                  text-rose-500
                  ring-1
                  ring-rose-500/10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <Mail size={19} />
              </div>

              <span
                className="
                  rounded-full
                  bg-rose-500/5
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-rose-500
                "
              >
                Inbox
              </span>
            </div>

            <div className="mt-7">
              <p
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {statistics?.totalContacts ?? 0}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Incoming contacts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          ARTICLE OVERVIEW
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-4
          lg:grid-cols-2
        "
      >
        {/* Published */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:shadow-lg
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-emerald-500/[0.06]
              blur-3xl
            "
          />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-500/10
                  text-emerald-500
                  ring-1
                  ring-emerald-500/10
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Published Articles
                </p>

                <p
                  className="
                    mt-1
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    dark:text-white
                  "
                >
                  {statistics?.publishedArticles ?? 0}
                </p>
              </div>
            </div>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-emerald-500/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-emerald-500
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
        </div>

        {/* Draft */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:shadow-lg
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-slate-500/[0.05]
              blur-3xl
            "
          />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-500/10
                  text-slate-500
                  dark:text-slate-400
                "
              >
                <Save size={20} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Draft Articles
                </p>

                <p
                  className="
                    mt-1
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    dark:text-white
                  "
                >
                  {statistics?.draftArticles ?? 0}
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full
                bg-slate-500/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
                dark:text-slate-400
              "
            >
              Draft
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================
    XSS PAYLOAD PREVIEW
===================================================== */}

<section
  className="
    rounded-2xl
    border
    border-slate-200/70
    bg-white
    p-5
    shadow-sm
    dark:border-white/[0.06]
    dark:bg-slate-950/50
  "
>
  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
    Feedback Preview
  </h2>

  <div className="mt-4">
   <div
  className="xss-payload"
  dangerouslySetInnerHTML={{ __html: xssPayload }}

/>
  </div>

  <div className="mt-6 rounded-xl border border-red-500/30 bg-red-950/20 p-6">
  <div className="text-xs font-semibold uppercase tracking-widest text-red-400">
    RED TEAM OBJECTIVE COMPLETE
  </div>

  <div className="mt-3 font-mono text-lg text-red-300">
    SCENARIO75&#123;RED_C00k13_MFA_Byp4ss_0wn3d&#125;
  </div>
</div>
</section>

      {/* ====================================================
          LATEST CONTACTS
      ===================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200/70
          bg-white
          shadow-sm
          dark:border-white/[0.06]
          dark:bg-slate-950/50
        "
      >
        {/* Header */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-slate-200/70
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.06]
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-500
                  ring-1
                  ring-blue-500/10
                "
              >
                <Mail size={16} />
              </div>

              <div>
                <h2
                  className="
                    text-sm
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Latest Contacts
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Recent messages from your website
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/dashboard/contacts"
            className="
              inline-flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-slate-200
              px-3.5
              py-2
              text-xs
              font-semibold
              text-slate-600
              transition-all
              duration-200
              hover:border-blue-500/20
              hover:bg-blue-500/5
              hover:text-blue-500
              dark:border-slate-800
              dark:text-slate-300
              dark:hover:border-blue-500/20
              dark:hover:bg-blue-500/5
              dark:hover:text-blue-400
            "
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-200/70
                  bg-slate-50/60
                  text-slate-500
                  dark:border-white/[0.06]
                  dark:bg-slate-900/40
                  dark:text-slate-400
                "
              >
                <th className="px-5 py-3.5 font-semibold">
                  Name
                </th>

                <th className="px-5 py-3.5 font-semibold">
                  Email
                </th>

                <th className="px-5 py-3.5 font-semibold">
                  Subject
                </th>

                <th className="px-5 py-3.5 font-semibold">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {latestContacts.slice(0, 5).map((contact) => (
                <tr
                  key={contact.id}
                  className="
                    group/row
                    border-b
                    border-slate-100
                    transition-colors
                    hover:bg-slate-50/70
                    dark:border-slate-800/70
                    dark:hover:bg-slate-900/60
                  "
                >
                  {/* Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-slate-100
                          text-xs
                          font-bold
                          text-slate-500
                          dark:bg-slate-800
                          dark:text-slate-300
                        "
                      >
                        {contact.name
                          ?.charAt(0)
                          ?.toUpperCase() || "?"}
                      </div>

                      <span
                        className="
                          font-semibold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {contact.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td
                    className="
                      px-5
                      py-4
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {contact.email}
                  </td>

                  {/* Subject */}
                  <td className="max-w-[280px] px-5 py-4">
                    <span
                      className="
                        block
                        truncate
                        text-slate-600
                        dark:text-slate-300
                      "
                    >
                      {contact.subject || "-"}
                    </span>
                  </td>

                  {/* Time */}
                  <td
                    className="
                      whitespace-nowrap
                      px-5
                      py-4
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {new Date(
                      contact.createdAt
                    ).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}

              {latestContacts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-16"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-slate-100
                          text-slate-400
                          dark:bg-slate-800
                          dark:text-slate-500
                        "
                      >
                        <Mail size={19} />
                      </div>

                      <p
                        className="
                          mt-4
                          text-sm
                          font-semibold
                          text-slate-700
                          dark:text-slate-300
                        "
                      >
                        No contacts yet
                      </p>

                      <p
                        className="
                          mt-1
                          max-w-xs
                          text-xs
                          leading-5
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Messages submitted through
                        the website will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {latestContacts.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-200/70
              px-5
              py-3
              dark:border-white/[0.06]
            "
          >
            <span
              className="
                text-[11px]
                text-slate-400
                dark:text-slate-500
              "
            >
              Showing latest {Math.min(
                latestContacts.length,
                5
              )} contacts
            </span>

            <Link
              to="/dashboard/contacts"
              className="
                text-[11px]
                font-semibold
                text-blue-500
                transition
                hover:text-blue-600
                dark:text-blue-400
              "
            >
              Manage contacts →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
