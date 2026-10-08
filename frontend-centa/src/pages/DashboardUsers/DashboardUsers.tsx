import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ShieldCheck,
  UserPlus,
  Users,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/user.service";

import type {
  User,
  UserPayload,
  Role,
  Pagination,
} from "../../types/user";

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingUser, setEditingUser] =
    useState<User | null>(null);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<{
  name: string;
  email: string;
  password: string;
  role: Role;
}>({
  name: "",
  email: "",
  password: "",
  role: "ADMIN",
});

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers({
        page: 1,
        limit: 20,
        search: search || undefined,
      });

      setUsers(response.data ?? []);
      setPagination(response.pagination ?? null);
    } catch (error: any) {
      console.error("LOAD USERS ERROR:", error);

      toast.error(
        error?.response?.data?.message ??
          "Gagal memuat pengguna."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search]);

  const openCreateModal = () => {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
    });

    setModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingUser(null);
  };

  const handleChange = (
  field: "name" | "email" | "password" | "role",
  value: string
) => {
  setForm((prev) => ({
    ...prev,
    [field]:
      field === "role"
        ? (value as Role)
        : value,
  }));
};

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Nama wajib diisi.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email wajib diisi.");
      return;
    }

    if (
      !editingUser &&
      !form.password?.trim()
    ) {
      toast.error(
        "Password wajib diisi untuk user baru."
      );
      return;
    }

    try {
      setSaving(true);

      if (editingUser) {
        const payload: UserPayload = {
          name: form.name,
          email: form.email,
          role: form.role,
        };

        if (form.password?.trim()) {
          payload.password = form.password;
        }

        await updateUser(
          editingUser.id,
          payload
        );

        toast.success(
          "Pengguna berhasil diperbarui."
        );
      } else {
        await createUser({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });

        toast.success(
          "Pengguna berhasil ditambahkan."
        );
      }

      closeModal();
      await loadUsers();
    } catch (error: any) {
      console.error(
        "SAVE USER ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ??
          "Gagal menyimpan pengguna."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    user: User
  ) => {
    const confirmed = window.confirm(
      `Hapus pengguna "${user.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteUser(user.id);

      toast.success(
        "Pengguna berhasil dihapus."
      );

      await loadUsers();
    } catch (error: any) {
      console.error(
        "DELETE USER ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus pengguna."
      );
    }
  };

  return (
    <>
      <section className="space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
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
          {/* Ambient glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-indigo-500/[0.07]
              blur-3xl
              dark:bg-indigo-400/[0.06]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              right-[25%]
              h-56
              w-56
              rounded-full
              bg-blue-500/[0.05]
              blur-3xl
            "
          />

          <div className="relative z-10 p-6 sm:p-8">

            <div
              className="
                flex
                flex-col
                gap-6
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              {/* Heading */}

              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-indigo-500/10
                    bg-indigo-500/[0.06]
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-indigo-500
                    dark:border-indigo-400/10
                    dark:bg-indigo-400/[0.06]
                    dark:text-indigo-400
                  "
                >
                  <Users size={12} />

                  User Management
                </div>

                <h1
                  className="
                    mt-4
                    text-3xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    sm:text-4xl
                    dark:text-white
                  "
                >
                  Administrator Accounts
                </h1>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Manage administrator accounts,
                  access levels, and user permissions
                  across Centa Limited.
                </p>

              </div>

              {/* Create */}

              <button
                type="button"
                onClick={openCreateModal}
                className="
                  group
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-indigo-500
                  hover:shadow-lg
                  hover:shadow-indigo-500/20
                  active:translate-y-0
                  dark:bg-indigo-500
                  dark:hover:bg-indigo-400
                "
              >
                <Plus
                  size={15}
                  className="
                    transition-transform
                    duration-200
                    group-hover:rotate-90
                  "
                />

                Add Administrator
              </button>

            </div>

          </div>
        </div>


        {/* =====================================================
            OVERVIEW
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          "
        >

          {/* Total Users */}

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
              hover:shadow-indigo-500/[0.05]
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
                transition-all
                duration-300
                group-hover:bg-indigo-500/[0.11]
              "
            />

            <div
              className="
                relative
                flex
                items-start
                justify-between
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-500/10
                  text-indigo-500
                  ring-1
                  ring-indigo-500/10
                  transition-transform
                  duration-300
                  group-hover:scale-105
                  dark:text-indigo-400
                "
              >
                <Users size={19} />
              </div>

              <span
                className="
                  rounded-full
                  bg-indigo-500/[0.06]
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-indigo-500
                  dark:text-indigo-400
                "
              >
                Accounts
              </span>

            </div>

            <div className="relative mt-6">

              <p
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {pagination?.total ?? users.length}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Registered administrators
              </p>

            </div>

          </div>


          {/* Current Role */}

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
              hover:shadow-emerald-500/[0.05]
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
                transition-all
                duration-300
                group-hover:bg-emerald-500/[0.11]
              "
            />

            <div
              className="
                relative
                flex
                items-start
                justify-between
              "
            >

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
                "
              >
                <ShieldCheck size={19} />
              </div>

              <span
                className="
                  rounded-full
                  bg-emerald-500/[0.06]
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

            <div className="relative mt-6">

              <p
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                Admin Control
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Role-based account management
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            SEARCH
        ====================================================== */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            shadow-sm
            transition-all
            duration-300
            focus-within:border-indigo-500/20
            focus-within:shadow-lg
            focus-within:shadow-indigo-500/[0.04]
            dark:border-white/[0.06]
            dark:bg-slate-950/50
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              w-32
              bg-indigo-500/[0.02]
              opacity-0
              blur-2xl
              transition-opacity
              duration-300
              group-focus-within:opacity-100
            "
          />

          <div
            className="
              relative
              flex
              items-center
              gap-3
              px-4
              py-3.5
            "
          >

            <Search
              size={17}
              className="
                shrink-0
                text-slate-400
                transition-colors
                duration-200
                group-focus-within:text-indigo-500
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search administrators by name or email..."
              className="
                w-full
                bg-transparent
                text-sm
                text-slate-900
                outline-none
                placeholder:text-slate-400
                dark:text-white
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-600
                  dark:hover:bg-white/[0.06]
                  dark:hover:text-slate-200
                "
              >
                <X size={14} />
              </button>
            )}

          </div>
        </div>


        {/* =====================================================
            USERS TABLE
        ====================================================== */}

        <div
          className="
            relative
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

          {/* Table Header */}

          <div
            className="
              flex
              flex-col
              gap-2
              border-b
              border-slate-200/70
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
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
                Administrator Directory
              </h2>

              <p
                className="
                  mt-0.5
                  text-[11px]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Manage accounts and access roles
              </p>

            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                self-start
                rounded-full
                bg-slate-100
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-slate-500
                sm:self-auto
                dark:bg-white/[0.04]
                dark:text-slate-400
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_8px_rgba(16,185,129,0.35)]
                "
              />

              System active
            </div>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px] text-left">

              <thead>

                <tr
                  className="
                    border-b
                    border-slate-200/70
                    bg-slate-50/60
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                    dark:border-white/[0.06]
                    dark:bg-white/[0.015]
                    dark:text-slate-500
                  "
                >

                  <th className="px-5 py-3.5 font-bold">
                    Administrator
                  </th>

                  <th className="px-5 py-3.5 font-bold">
                    Email
                  </th>

                  <th className="px-5 py-3.5 font-bold">
                    Role
                  </th>

                  <th className="px-5 py-3.5 font-bold">
                    Created
                  </th>

                  <th className="px-5 py-3.5 text-right font-bold">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-5 py-16"
                    >

                      <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                        "
                      >

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-500/10
                            text-indigo-500
                          "
                        >
                          <Users
                            size={18}
                            className="animate-pulse"
                          />
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
                          Loading administrators
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-400
                          "
                        >
                          Fetching account data...
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : users.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-5 py-16"
                    >

                      <div
                        className="
                          flex
                          flex-col
                          items-center
                          text-center
                        "
                      >

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
                          <UserPlus size={19} />
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
                          No administrators found
                        </p>

                        <p
                          className="
                            mt-1
                            max-w-sm
                            text-xs
                            leading-5
                            text-slate-400
                          "
                        >
                          Try another search term or
                          create a new administrator account.
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  users.map((item) => {

                    const initials = item.name
                      .split(/\s+/)
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    const isSuperAdmin =
                      item.role === "SUPER_ADMIN";

                    return (

                      <tr
                        key={item.id}
                        className="
                          group/row
                          relative
                          border-b
                          border-slate-100
                          transition-all
                          duration-200
                          hover:bg-slate-50/70
                          dark:border-white/[0.045]
                          dark:hover:bg-white/[0.025]
                        "
                      >

                        {/* User */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

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
                                bg-gradient-to-br
                                from-indigo-500/15
                                to-blue-500/10
                                text-[11px]
                                font-bold
                                text-indigo-600
                                ring-1
                                ring-indigo-500/10
                                transition-all
                                duration-300
                                group-hover/row:shadow-[0_0_18px_rgba(99,102,241,0.10)]
                                dark:text-indigo-400
                              "
                            >
                              {initials}
                            </div>

                            <div className="min-w-0">

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


                        {/* Email */}

                        <td className="px-5 py-4">

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-slate-600
                              dark:text-slate-300
                            "
                          >

                            <Mail
                              size={13}
                              className="
                                shrink-0
                                text-slate-400
                              "
                            />

                            {item.email}

                          </div>

                        </td>


                        {/* Role */}

                        <td className="px-5 py-4">

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              px-2.5
                              py-1.5
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.08em]
                              ${
                                isSuperAdmin
                                  ? `
                                    border-red-500/10
                                    bg-red-500/[0.06]
                                    text-red-500
                                  `
                                  : `
                                    border-indigo-500/10
                                    bg-indigo-500/[0.06]
                                    text-indigo-500
                                  `
                              }
                            `}
                          >

                            <ShieldCheck size={11} />

                            {isSuperAdmin
                              ? "Super Admin"
                              : "Administrator"}

                          </span>

                        </td>


                        {/* Date */}

                        <td
                          className="
                            whitespace-nowrap
                            px-5
                            py-4
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          {new Date(
                            item.createdAt
                          ).toLocaleString("id-ID")}
                        </td>


                        {/* Actions */}

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
                                openEditModal(item)
                              }
                              className="
                                group/action
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-transparent
                                text-slate-400
                                transition-all
                                duration-200
                                hover:border-indigo-500/10
                                hover:bg-indigo-500/[0.07]
                                hover:text-indigo-500
                                hover:shadow-[0_0_14px_rgba(99,102,241,0.08)]
                                dark:hover:text-indigo-400
                              "
                              title="Edit"
                            >
                              <Pencil
                                size={14}
                                className="
                                  transition-transform
                                  duration-200
                                  group-hover/action:scale-110
                                "
                              />
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(item)
                              }
                              className="
                                group/action
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-transparent
                                text-slate-400
                                transition-all
                                duration-200
                                hover:border-red-500/10
                                hover:bg-red-500/[0.07]
                                hover:text-red-500
                                hover:shadow-[0_0_14px_rgba(239,68,68,0.07)]
                              "
                              title="Delete"
                            >
                              <Trash2
                                size={14}
                                className="
                                  transition-transform
                                  duration-200
                                  group-hover/action:scale-110
                                "
                              />
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  })

                )}

              </tbody>

            </table>

          </div>


          {/* Footer */}

          {pagination && (

            <div
              className="
                flex
                flex-col
                gap-2
                border-t
                border-slate-200/70
                px-5
                py-3.5
                text-[11px]
                text-slate-400
                sm:flex-row
                sm:items-center
                sm:justify-between
                dark:border-white/[0.06]
              "
            >

              <span>
                Showing {users.length} of{" "}
                {pagination.total} administrators
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-slate-400
                "
              >
                <ArrowUpRight size={12} />

                Account management
              </span>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          MODAL
      ====================================================== */}

      {modalOpen && (

        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/55
            p-4
            backdrop-blur-md
          "
          onClick={closeModal}
        >

          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-[26px]
              border
              border-slate-200/70
              bg-white
              shadow-2xl
              dark:border-white/[0.08]
              dark:bg-slate-950
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-indigo-500/[0.08]
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                items-center
                justify-between
                border-b
                border-slate-200/70
                px-6
                py-5
                dark:border-white/[0.06]
              "
            >

              <div>

                <div
                  className="
                    inline-flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-500/10
                    text-indigo-500
                  "
                >
                  {editingUser ? (
                    <Pencil size={15} />
                  ) : (
                    <UserPlus size={16} />
                  )}
                </div>

                <h3
                  className="
                    mt-4
                    text-lg
                    font-bold
                    tracking-tight
                    text-slate-900
                    dark:text-white
                  "
                >
                  {editingUser
                    ? "Edit Administrator"
                    : "Create Administrator"}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {editingUser
                    ? "Update administrator account information."
                    : "Create a new administrator account for Centa."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                  dark:hover:bg-white/[0.06]
                  dark:hover:text-white
                "
              >
                <X size={17} />
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="
                relative
                space-y-5
                p-6
              "
            >

              {/* Name */}

              <div className="space-y-2">

                <label
                  className="
                    text-xs
                    font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  Full Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-slate-400
                    focus:border-indigo-500/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-500/[0.06]
                    dark:border-white/[0.07]
                    dark:bg-white/[0.03]
                    dark:text-white
                    dark:focus:bg-white/[0.045]
                  "
                  placeholder="Administrator name"
                />

              </div>


              {/* Email */}

              <div className="space-y-2">

                <label
                  className="
                    text-xs
                    font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  Email Address
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-slate-400
                    focus:border-indigo-500/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-500/[0.06]
                    dark:border-white/[0.07]
                    dark:bg-white/[0.03]
                    dark:text-white
                    dark:focus:bg-white/[0.045]
                  "
                  placeholder="admin@centa.ltd"
                />

              </div>


              {/* Password */}

              <div className="space-y-2">

                <label
                  className="
                    text-xs
                    font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  Password
                </label>

                <input
                  type="password"
                  value={form.password ?? ""}
                  onChange={(e) =>
                    handleChange(
                      "password",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-slate-400
                    focus:border-indigo-500/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-500/[0.06]
                    dark:border-white/[0.07]
                    dark:bg-white/[0.03]
                    dark:text-white
                    dark:focus:bg-white/[0.045]
                  "
                  placeholder={
                    editingUser
                      ? "Leave empty to keep current password"
                      : "Enter password"
                  }
                />

              </div>


              {/* Role */}

              <div className="space-y-2">

                <label
                  className="
                    text-xs
                    font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  Access Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    handleChange(
                      "role",
                      e.target.value as Role
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200
                    focus:border-indigo-500/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-500/[0.06]
                    dark:border-white/[0.07]
                    dark:bg-white/[0.03]
                    dark:text-white
                    dark:focus:bg-white/[0.045]
                  "
                >

                  <option value="ADMIN">
                    Administrator
                  </option>

                  <option value="SUPER_ADMIN">
                    Super Administrator
                  </option>

                </select>

              </div>


              {/* Actions */}

              <div
                className="
                  flex
                  justify-end
                  gap-3
                  border-t
                  border-slate-200/70
                  pt-5
                  dark:border-white/[0.06]
                "
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-slate-600
                    transition-all
                    hover:bg-slate-50
                    dark:border-white/[0.08]
                    dark:text-slate-300
                    dark:hover:bg-white/[0.04]
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-xl
                    bg-indigo-600
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-indigo-500
                    hover:shadow-lg
                    hover:shadow-indigo-500/20
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    dark:bg-indigo-500
                    dark:hover:bg-indigo-400
                  "
                >
                  {saving
                    ? "Saving..."
                    : editingUser
                    ? "Save Changes"
                    : "Create Account"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}
    </>
  );
};

export default DashboardUsers;