import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getServices,
  deleteService,
} from "../../services/service.service";

import type { Service } from "../../types/service";

const Services = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await getServices({
        page,
        limit: 10,
        search,
      });

      setServices(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error: any) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      await deleteService(id);

      toast.success("Service deleted successfully");

      fetchServices();
    } catch (error: any) {
      toast.error("Failed to delete service");
    }
  };

  const activeServices = services.filter(
    (service) => service.isActive
  ).length;

  const inactiveServices = services.filter(
    (service) => !service.isActive
  ).length;

  return (
    <div className="relative space-y-6 pb-10">
      {/* =========================================================
          BACKGROUND AMBIENT GLOW
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            top-20
            h-96
            w-96
            rounded-full
            bg-blue-600/[0.06]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            top-[35%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-indigo-600/[0.05]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-180px]
            left-[35%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-violet-600/[0.04]
            blur-[130px]
          "
        />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-white/[0.07]
          bg-[#050918]/90
          px-6
          py-7
          shadow-[0_20px_80px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-0.5
          hover:border-blue-500/[0.16]
          hover:shadow-[0_25px_90px_rgba(37,99,235,0.08)]
          sm:px-8
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
            bg-blue-600/[0.08]
            blur-[90px]
            transition-all
            duration-700
            group-hover:bg-blue-500/[0.14]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-100px]
            left-[30%]
            h-48
            w-48
            rounded-full
            bg-indigo-600/[0.05]
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
                  shadow-[0_0_12px_rgba(59,130,246,0.9)]
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
              Services
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
              Manage company services and keep your service catalog
              organized from one centralized workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/services/create")
            }
            className="
              group/button
              relative
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              border
              border-blue-500/20
              bg-blue-500/[0.08]
              px-4
              py-2.5
              text-xs
              font-semibold
              text-blue-400
              shadow-[0_0_0_rgba(59,130,246,0)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-400/40
              hover:bg-blue-500/[0.14]
              hover:text-blue-300
              hover:shadow-[0_8px_30px_rgba(37,99,235,0.16)]
            "
          >
            <span
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/[0.06]
                to-transparent
                transition-transform
                duration-700
                group-hover/button:translate-x-full
              "
            />

            <span className="relative text-base leading-none">
              +
            </span>

            <span className="relative">
              New Service
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================
          STAT CARDS
      ========================================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Total */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.07]
            bg-[#050918]/90
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-blue-500/[0.20]
            hover:shadow-[0_20px_60px_rgba(37,99,235,0.10)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-12
              -top-12
              h-36
              w-36
              rounded-full
              bg-blue-600/[0.08]
              blur-[50px]
              transition-all
              duration-500
              group-hover:bg-blue-500/[0.16]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-60px]
              left-[-30px]
              h-28
              w-28
              rounded-full
              bg-blue-500/[0.04]
              blur-[40px]
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
                Total Services
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {services.length}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Registered services
              </p>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-blue-500/[0.12]
                bg-blue-500/[0.08]
                text-blue-400
                shadow-[0_0_30px_rgba(59,130,246,0.06)]
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:border-blue-400/20
                group-hover:bg-blue-500/[0.12]
              "
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.07]
            bg-[#050918]/90
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-emerald-500/[0.20]
            hover:shadow-[0_20px_60px_rgba(16,185,129,0.08)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-12
              -top-12
              h-36
              w-36
              rounded-full
              bg-emerald-500/[0.07]
              blur-[50px]
              transition-all
              duration-500
              group-hover:bg-emerald-500/[0.14]
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
                Active
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {activeServices}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Currently published
              </p>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-500/[0.12]
                bg-emerald-500/[0.08]
                text-emerald-400
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:border-emerald-400/20
                group-hover:bg-emerald-500/[0.12]
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

        {/* Inactive */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.07]
            bg-[#050918]/90
            p-5
            shadow-[0_15px_50px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-amber-500/[0.20]
            hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-12
              -top-12
              h-36
              w-36
              rounded-full
              bg-amber-500/[0.07]
              blur-[50px]
              transition-all
              duration-500
              group-hover:bg-amber-500/[0.14]
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
                Inactive
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {inactiveServices}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Currently hidden
              </p>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-amber-500/[0.12]
                bg-amber-500/[0.08]
                text-amber-400
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:border-amber-400/20
                group-hover:bg-amber-500/[0.12]
              "
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M8 8l8 8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SEARCH
      ========================================================= */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[20px]
          border
          border-white/[0.07]
          bg-[#050918]/90
          p-3
          shadow-[0_15px_50px_rgba(0,0,0,0.10)]
          backdrop-blur-xl
          transition-all
          duration-500
          hover:border-white/[0.10]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-44
            w-44
            rounded-full
            bg-blue-600/[0.05]
            blur-[60px]
            transition-all
            duration-500
            group-focus-within:bg-blue-500/[0.10]
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
              transition-colors
              group-focus-within:text-blue-400
            "
          >
            <svg
              className="h-[18px] w-[18px]"
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
            placeholder="Search services..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="
              w-full
              rounded-xl
              border
              border-transparent
              bg-white/[0.025]
              py-3.5
              pl-12
              pr-4
              text-sm
              text-white
              outline-none
              transition-all
              placeholder:text-slate-600
              focus:border-blue-500/20
              focus:bg-blue-500/[0.025]
              focus:ring-4
              focus:ring-blue-500/[0.05]
            "
          />
        </div>
      </div>

      {/* =========================================================
          SERVICE TABLE
      ========================================================= */}

      <div
        className="
          group/table
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.07]
          bg-[#050918]/90
          shadow-[0_20px_70px_rgba(0,0,0,0.14)]
          backdrop-blur-xl
          transition-all
          duration-500
          hover:border-white/[0.09]
        "
      >
        {/* Table ambient glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-[-100px]
            h-72
            w-72
            rounded-full
            bg-blue-600/[0.04]
            blur-[90px]
            transition-all
            duration-700
            group-hover/table:bg-blue-500/[0.07]
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
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
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
                border-blue-500/[0.12]
                bg-blue-500/[0.07]
                text-blue-400
              "
            >
              <svg
                className="h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                />
                <path d="M3 10h18" />
                <path d="M9 4v16" />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Service Directory
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                All registered company services
              </p>
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
              border-white/[0.06]
              bg-white/[0.025]
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-500
                shadow-[0_0_8px_rgba(59,130,246,0.8)]
              "
            />

            {services.length} Results
          </div>
        </div>

        {/* =========================================================
            TABLE
        ========================================================= */}

        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[760px]">
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
                  Service
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
                  Status
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
                  Order
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
              {/* =====================================================
                  LOADING
              ===================================================== */}

              {loading && (
                <tr>
                  <td colSpan={4} className="px-6 py-20">
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="
                          h-8
                          w-8
                          animate-spin
                          rounded-full
                          border
                          border-white/10
                          border-t-blue-500
                          shadow-[0_0_20px_rgba(59,130,246,0.12)]
                        "
                      />

                      <p className="mt-4 text-xs text-slate-500">
                        Loading services...
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* =====================================================
                  EMPTY
              ===================================================== */}

              {!loading && services.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className="
                          relative
                          mb-5
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-white/[0.07]
                          bg-white/[0.025]
                          text-slate-600
                        "
                      >
                        <div
                          className="
                            absolute
                            inset-0
                            rounded-2xl
                            bg-blue-500/[0.04]
                            blur-xl
                          "
                        />

                        <svg
                          className="relative h-6 w-6"
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
                        No services found
                      </h3>

                      <p className="mt-2 max-w-sm text-xs leading-5 text-slate-600">
                        Try another search term or create a new
                        service to get started.
                      </p>
                    </div>
                  </td>
                </tr>
              )}


              {!loading &&
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="
                      group/row
                      border-b
                      border-white/[0.045]
                      transition-all
                      duration-300
                      last:border-0
                      hover:bg-blue-500/[0.025]
                    "
                  >
                

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
                            border-blue-500/[0.12]
                            bg-gradient-to-br
                            from-blue-500/[0.12]
                            to-indigo-500/[0.06]
                            text-xs
                            font-bold
                            text-blue-400
                            transition-all
                            duration-300
                            group-hover/row:border-blue-400/25
                            group-hover/row:bg-blue-500/[0.12]
                            group-hover/row:shadow-[0_0_20px_rgba(59,130,246,0.08)]
                          "
                        >
                          <div
                            className="
                              absolute
                              inset-0
                              bg-gradient-to-br
                              from-white/[0.04]
                              to-transparent
                            "
                          />

                          <span className="relative">
                            {service.title
                              ?.charAt(0)
                              ?.toUpperCase() || "S"}
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
                              group-hover/row:text-white
                            "
                          >
                            {service.title}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-600">
                            Service #{service.order}
                          </p>
                        </div>
                      </div>
                    </td>

                 

                    <td className="px-6 py-5">
                      {service.isActive ? (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-500/[0.12]
                            bg-emerald-500/[0.06]
                            px-3
                            py-1.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-emerald-400
                            transition-all
                            duration-300
                            group-hover/row:border-emerald-400/20
                            group-hover/row:bg-emerald-500/[0.09]
                          "
                        >
                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-emerald-400
                              shadow-[0_0_9px_rgba(52,211,153,0.9)]
                            "
                          />

                          Active
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-slate-500/[0.12]
                            bg-slate-500/[0.05]
                            px-3
                            py-1.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-slate-500
                            "
                          />

                          Inactive
                        </span>
                      )}
                    </td>

                  

                    <td className="px-6 py-5">
                      <span
                        className="
                          inline-flex
                          h-8
                          min-w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-white/[0.025]
                          px-2
                          text-[11px]
                          font-semibold
                          text-slate-400
                        "
                      >
                        {service.order}
                      </span>
                    </td>


                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/dashboard/services/${service.id}/edit`
                            )
                          }
                          className="
                            group/edit
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
                            text-slate-400
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-blue-500/25
                            hover:bg-blue-500/[0.07]
                            hover:text-blue-400
                            hover:shadow-[0_8px_25px_rgba(37,99,235,0.08)]
                          "
                        >
                          <svg
                            className="
                              h-3.5
                              w-3.5
                              transition-transform
                              duration-300
                              group-hover/edit:rotate-[-8deg]
                            "
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

                       

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(service.id)
                          }
                          className="
                            group/delete
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-red-500/[0.10]
                            bg-red-500/[0.04]
                            px-3
                            py-2
                            text-[11px]
                            font-semibold
                            text-red-400
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-red-500/25
                            hover:bg-red-500/[0.09]
                            hover:text-red-300
                            hover:shadow-[0_8px_25px_rgba(239,68,68,0.08)]
                          "
                        >
                          <svg
                            className="
                              h-3.5
                              w-3.5
                              transition-transform
                              duration-300
                              group-hover/delete:scale-110
                            "
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

       

        <div
          className="
            relative
            flex
            flex-col
            gap-4
            border-t
            border-white/[0.05]
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <p className="text-[11px] text-slate-600">
            Page{" "}
            <span className="font-semibold text-slate-400">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-400">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            {/* PREVIOUS */}

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
                bg-white/[0.02]
                px-3
                py-2
                text-[11px]
                font-semibold
                text-slate-500
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-white/[0.12]
                hover:bg-white/[0.04]
                hover:text-slate-300
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:translate-y-0
              "
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>

              Previous
            </button>

            {/* CURRENT PAGE */}

            <div
              className="
                flex
                h-8
                min-w-8
                items-center
                justify-center
                rounded-lg
                border
                border-blue-500/20
                bg-blue-500/[0.10]
                px-2.5
                text-[11px]
                font-bold
                text-blue-400
                shadow-[0_0_20px_rgba(59,130,246,0.08)]
              "
            >
              {page}
            </div>

          

            <button
              type="button"
              disabled={
                page >= totalPages || loading
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
                bg-white/[0.02]
                px-3
                py-2
                text-[11px]
                font-semibold
                text-slate-500
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-white/[0.12]
                hover:bg-white/[0.04]
                hover:text-slate-300
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:translate-y-0
              "
            >
              Next

              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;