import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  Users as UsersIcon,
  ChevronLeft,
  ChevronRight,
  UserRound,
} from "lucide-react";

import {
  getUsers,
  deleteUser,
} from "../../services/user.service";

import type { User } from "../../types/user";
import { useAuth } from "../../context/AuthContext";

const Users = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

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

  // =========================================================
  // ACCESS GUARD
  // =========================================================

  useEffect(() => {
    if (user && user.role !== "SUPER_ADMIN") {
      toast.error("Akses hanya untuk SUPER_ADMIN");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // =========================================================
  // LOAD USERS
  // =========================================================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers({
        page,
        limit: pagination.limit,
        search: debouncedSearch || undefined,
      });

      setUsers(response.data ?? []);
      setPagination(response.pagination);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        toast.error("Sesi login telah berakhir");

        logout();
        navigate("/login");

        return;
      }

      if (status === 403) {
        toast.error(
          "Anda tidak memiliki akses ke User Management"
        );

        navigate("/dashboard");

        return;
      }

      toast.error(
        error?.response?.data?.message ??
          "Gagal memuat user"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const handleDelete = async (id: string) => {
    if (user?.id === id) {
      toast.error(
        "Anda tidak dapat menghapus akun sendiri"
      );

      return;
    }

    const confirmed = window.confirm(
      "Yakin ingin menghapus user ini?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      toast.success("User berhasil dihapus");

      if (users.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }

      await loadUsers();
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        toast.error("Sesi login telah berakhir");

        logout();
        navigate("/login");

        return;
      }

      if (status === 403) {
        toast.error(
          "Anda tidak memiliki izin menghapus user"
        );

        return;
      }

      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus user"
      );
    }
  };

  // =========================================================
  // LOAD WHEN PAGE / SEARCH CHANGES
  // =========================================================

  useEffect(() => {
    loadUsers();
  }, [page, debouncedSearch]);

  // =========================================================
  // SEARCH DEBOUNCE
  // =========================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================================================
  // ACCESS
  // =========================================================

  if (!user) {
    return null;
  }

  if (user.role !== "SUPER_ADMIN") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200/70
            bg-white
            p-8
            text-center
            shadow-xl
            dark:border-white/[0.06]
            dark:bg-slate-950/60
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-red-500/[0.07]
              blur-3xl
            "
          />

          <div
            className="
              relative
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-red-500/10
              text-red-500
              ring-1
              ring-red-500/10
            "
          >
            <ShieldCheck size={24} />
          </div>

          <h2
            className="
              relative
              mt-5
              text-xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Access Denied
          </h2>

          <p
            className="
              relative
              mt-2
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            Hanya SUPER_ADMIN yang dapat
            mengakses User Management.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              relative
              mt-6
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/10
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-blue-500
              hover:shadow-blue-500/20
            "
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-blue-500/10
              bg-blue-500/10
              text-blue-500
            "
          >
            <UsersIcon
              size={20}
              className="animate-pulse"
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
            Loading users
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Menyiapkan User Management...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-6">

      {/* ====================================================
          HEADER
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
        {/* Subtle Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-blue-500/[0.08]
            blur-3xl
            dark:bg-blue-400/[0.06]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            right-[20%]
            h-56
            w-56
            rounded-full
            bg-indigo-500/[0.05]
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            p-6
            sm:p-8
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:p-9
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-500/10
                bg-blue-500/[0.05]
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-blue-500
                dark:border-blue-400/10
                dark:bg-blue-400/[0.05]
                dark:text-blue-400
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-blue-500
                  shadow-[0_0_8px_rgba(59,130,246,0.45)]
                "
              />

              Access Control
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-4xl
              "
            >
              User Management
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage administrator accounts,
              roles, and access permissions
              across Centa Limited.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/users/create")
            }
            className="
              group
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/10
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-blue-500
              hover:shadow-blue-500/20
            "
          >
            <Plus
              size={16}
              className="transition-transform duration-200 group-hover:rotate-90"
            />

            New User
          </button>
        </div>
      </section>

      {/* ====================================================
          STATS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-3
        "
      >
        {/* Total */}

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
            hover:-translate-y-0.5
            hover:shadow-lg
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-blue-500/[0.07]
              blur-2xl
              transition-opacity
              duration-300
              group-hover:bg-blue-500/[0.10]
            "
          />

          <div className="relative flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-500
                ring-1
                ring-blue-500/10
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <UsersIcon size={19} />
            </div>

            <div>
              <p
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {pagination.total}
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Total administrators
              </p>
            </div>
          </div>
        </div>

        {/* Current Page */}

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
            hover:-translate-y-0.5
            hover:shadow-lg
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-indigo-500/[0.07]
              blur-2xl
            "
          />

          <div className="relative flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/10
                text-indigo-500
                ring-1
                ring-indigo-500/10
              "
            >
              <UserRound size={19} />
            </div>

            <div>
              <p
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {users.length}
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Users on this page
              </p>
            </div>
          </div>
        </div>

        {/* Page */}

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
            hover:-translate-y-0.5
            hover:shadow-lg
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >
          <div
            className="
              pointer-events-none
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

          <div className="relative flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-500
                ring-1
                ring-emerald-500/10
              "
            >
              <ShieldCheck size={19} />
            </div>

            <div>
              <p
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {pagination.totalPages || 1}
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Available pages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SEARCH
      ===================================================== */}

      <section
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-slate-200/70
          bg-white
          p-4
          shadow-sm
          dark:border-white/[0.06]
          dark:bg-slate-950/50
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="relative w-full sm:max-w-md">
          <Search
            size={17}
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50/70
              py-2.5
              pl-10
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              focus:border-blue-500/30
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/[0.06]
              dark:border-white/[0.06]
              dark:bg-white/[0.03]
              dark:text-white
              dark:focus:bg-white/[0.04]
            "
          />
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-slate-400
            dark:text-slate-500
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-500
            "
          />

          Super Admin Access
        </div>
      </section>

      {/* ====================================================
          TABLE
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
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200/70
            px-5
            py-4
            dark:border-white/[0.06]
          "
        >
          <div>
            <h2
              className="
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Administrator Accounts
            </h2>

            <p
              className="
                mt-0.5
                text-[11px]
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage users and access roles
            </p>
          </div>

          <span
            className="
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-slate-500
              dark:border-white/[0.06]
              dark:bg-white/[0.03]
              dark:text-slate-400
            "
          >
            {pagination.total} accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-200/70
                  bg-slate-50/60
                  text-[11px]
                  uppercase
                  tracking-wider
                  text-slate-400
                  dark:border-white/[0.06]
                  dark:bg-white/[0.02]
                  dark:text-slate-500
                "
              >
                <th className="px-5 py-3.5 font-semibold">
                  User
                </th>

                <th className="px-5 py-3.5 font-semibold">
                  Email
                </th>

                <th className="px-5 py-3.5 font-semibold">
                  Role
                </th>

                <th className="px-5 py-3.5 font-semibold">
                  Created
                </th>

                <th className="px-5 py-3.5 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
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
                          dark:bg-white/[0.05]
                          dark:text-slate-500
                        "
                      >
                        <UsersIcon size={19} />
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
                        No users found
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        Tidak ada administrator
                        yang cocok dengan pencarian.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((item) => {
                  const isCurrentUser =
                    user.id === item.id;

                  const isSuperAdmin =
                    item.role === "SUPER_ADMIN";

                  return (
                    <tr
                      key={item.id}
                      className="
                        group
                        border-b
                        border-slate-100
                        transition-all
                        duration-200
                        hover:bg-slate-50/70
                        dark:border-white/[0.04]
                        dark:hover:bg-white/[0.025]
                      "
                    >
                      {/* USER */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              relative
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              text-xs
                              font-bold
                              ring-1
                              transition-all
                              duration-200
                              group-hover:scale-105
                              ${
                                isSuperAdmin
                                  ? `
                                    bg-purple-500/10
                                    text-purple-500
                                    ring-purple-500/10
                                  `
                                  : `
                                    bg-blue-500/10
                                    text-blue-500
                                    ring-blue-500/10
                                  `
                              }
                            `}
                          >
                            {item.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}

                            {isCurrentUser && (
                              <span
                                className="
                                  absolute
                                  -right-0.5
                                  -top-0.5
                                  h-2.5
                                  w-2.5
                                  rounded-full
                                  border-2
                                  border-white
                                  bg-emerald-500
                                  dark:border-slate-950
                                "
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <p
                                className="
                                  truncate
                                  text-sm
                                  font-semibold
                                  text-slate-900
                                  dark:text-white
                                "
                              >
                                {item.name}
                              </p>

                              {isCurrentUser && (
                                <span
                                  className="
                                    shrink-0
                                    rounded-full
                                    bg-emerald-500/10
                                    px-2
                                    py-0.5
                                    text-[9px]
                                    font-bold
                                    text-emerald-500
                                  "
                                >
                                  YOU
                                </span>
                              )}
                            </div>

                            <p
                              className="
                                mt-0.5
                                text-[10px]
                                text-slate-400
                                dark:text-slate-500
                              "
                            >
                              ID: {item.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}

                      <td className="px-5 py-4">
                        <span
                          className="
                            text-sm
                            text-slate-600
                            dark:text-slate-300
                          "
                        >
                          {item.email}
                        </span>
                      </td>

                      {/* ROLE */}

                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            ${
                              isSuperAdmin
                                ? `
                                  border-purple-500/10
                                  bg-purple-500/10
                                  text-purple-500
                                `
                                : `
                                  border-blue-500/10
                                  bg-blue-500/10
                                  text-blue-500
                                `
                            }
                          `}
                        >
                          <ShieldCheck size={11} />

                          {isSuperAdmin
                            ? "SUPER ADMIN"
                            : "ADMIN"}
                        </span>
                      </td>

                      {/* CREATED */}

                      <td
                        className="
                          whitespace-nowrap
                          px-5
                          py-4
                        "
                      >
                        <span
                          className="
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            justify-end
                            gap-1.5
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/dashboard/users/${item.id}/edit`
                              )
                            }
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-400
                              transition-all
                              duration-200
                              hover:bg-blue-500/10
                              hover:text-blue-500
                              hover:shadow-[0_0_18px_rgba(59,130,246,0.08)]
                              dark:text-slate-500
                              dark:hover:text-blue-400
                            "
                            title="Edit user"
                          >
                            <Pencil size={14} />
                          </button>

                          {!isCurrentUser ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-400
                                transition-all
                                duration-200
                                hover:bg-red-500/10
                                hover:text-red-500
                                hover:shadow-[0_0_18px_rgba(239,68,68,0.08)]
                                dark:text-slate-500
                                dark:hover:text-red-400
                              "
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          ) : (
                            <span
                              className="
                                flex
                                h-8
                                items-center
                                px-2
                                text-[10px]
                                font-medium
                                text-slate-400
                                dark:text-slate-600
                              "
                            >
                              Protected
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ==================================================
            PAGINATION
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-slate-200/70
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.06]
          "
        >
          <p
            className="
              text-[11px]
              text-slate-400
              dark:text-slate-500
            "
          >
            Page{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {pagination.totalPages || 1}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
              className="
                flex
                h-8
                items-center
                gap-1
                rounded-lg
                border
                border-slate-200
                px-2.5
                text-xs
                font-medium
                text-slate-500
                transition-all
                hover:bg-slate-50
                hover:text-slate-700
                disabled:pointer-events-none
                disabled:opacity-40
                dark:border-white/[0.06]
                dark:text-slate-400
                dark:hover:bg-white/[0.04]
                dark:hover:text-slate-200
              "
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            <button
              type="button"
              disabled={
                page >= pagination.totalPages
              }
              onClick={() =>
                setPage((prev) => prev + 1)
              }
              className="
                flex
                h-8
                items-center
                gap-1
                rounded-lg
                border
                border-slate-200
                px-2.5
                text-xs
                font-medium
                text-slate-500
                transition-all
                hover:bg-slate-50
                hover:text-slate-700
                disabled:pointer-events-none
                disabled:opacity-40
                dark:border-white/[0.06]
                dark:text-slate-400
                dark:hover:bg-white/[0.04]
                dark:hover:text-slate-200
              "
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
