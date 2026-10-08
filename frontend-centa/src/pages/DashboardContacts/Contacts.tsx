import { useEffect, useState } from "react";
import {
  Mail,
  Trash2,
  RefreshCw,
  Eye,
  X,
  Inbox,
  Clock3,
  User,
  ArrowUpRight,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllContactMessages,
  deleteContactMessage,
} from "../../services/contact.service";

import type { ContactMessage } from "../../types/contact";

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedContact, setSelectedContact] =
    useState<ContactMessage | null>(null);

  const loadContacts = async () => {
    try {
      setLoading(true);

      const response = await getAllContactMessages();

      if (!response.success) {
        throw new Error("Gagal mengambil pesan contact.");
      }

      setContacts(response.data);
    } catch (error: any) {
      console.error("GET CONTACT ERROR:", error);

      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Gagal memuat pesan contact."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Yakin ingin menghapus pesan ini?"
    );

    if (!confirmed) return;

    try {
      await deleteContactMessage(id);

      setContacts((prev) =>
        prev.filter((contact) => contact.id !== id)
      );

      toast.success("Pesan berhasil dihapus.");
    } catch (error: any) {
      console.error("DELETE CONTACT ERROR:", error);

      toast.error(
        error?.response?.data?.message ??
          "Gagal menghapus pesan."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ====================================================== */}

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
        {/* Soft glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-blue-500/[0.07]
            blur-3xl
            dark:bg-blue-400/[0.06]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-28
            right-[20%]
            h-56
            w-56
            rounded-full
            bg-indigo-500/[0.045]
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
            lg:items-center
            lg:justify-between
            lg:p-9
          "
        >
          <div>
            {/* Label */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Centa Administration
              </span>
            </div>

            {/* Title */}
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
              Feedback Dashboard
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
                sm:text-[15px]
              "
            >
              Manage incoming messages and communication
              submitted through the Centa website.
            </p>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={loadContacts}
            disabled={loading}
            className="
              group
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-500/20
              hover:bg-blue-500/[0.04]
              hover:text-blue-500
              hover:shadow-lg
              hover:shadow-blue-500/5
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-white/[0.08]
              dark:bg-white/[0.03]
              dark:text-slate-300
              dark:hover:border-blue-400/20
              dark:hover:bg-blue-400/[0.05]
              dark:hover:text-blue-400
            "
          >
            <RefreshCw
              size={15}
              className={`
                transition-transform
                duration-500
                ${loading ? "animate-spin" : "group-hover:rotate-180"}
              `}
            />

            Refresh
          </button>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-3">
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
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-blue-500/5
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
            "
          />

          <div className="relative flex items-start justify-between">
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
              <Inbox size={19} />
            </div>

            <span
              className="
                rounded-full
                bg-blue-500/[0.06]
                px-2.5
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-blue-500
              "
            >
              Inbox
            </span>
          </div>

          <div className="relative mt-7">
            <p
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              {contacts.length}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Total messages
            </p>
          </div>
        </div>

        {/* Latest */}
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
              pointer-events-none
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

          <div className="relative flex items-start justify-between">
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
              <Clock3 size={19} />
            </div>

            <span
              className="
                rounded-full
                bg-violet-500/[0.06]
                px-2.5
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-violet-500
              "
            >
              Activity
            </span>
          </div>

          <div className="relative mt-7">
            <p
              className="
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {contacts.length > 0
                ? "Messages available"
                : "No recent activity"}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Latest website activity
            </p>
          </div>
        </div>

        {/* Communication */}
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

          <div className="relative flex items-start justify-between">
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
              <Mail size={19} />
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
              Website
            </span>
          </div>

          <div className="relative mt-7">
            <p
              className="
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Direct communication
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Messages from visitors
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MESSAGE LIST
      ====================================================== */}

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
        {/* Section Header */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200/70
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.06]
          "
        >
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
                Incoming Messages
              </h2>

              <p
                className="
                  mt-0.5
                  text-[11px]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Messages submitted through the website
              </p>
            </div>
          </div>

          <span
            className="
              inline-flex
              w-fit
              items-center
              gap-1.5
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-3
              py-1.5
              text-[10px]
              font-semibold
              text-slate-500
              dark:border-white/[0.06]
              dark:bg-white/[0.03]
              dark:text-slate-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {contacts.length} messages
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-200/70
                  bg-slate-50/60
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                  dark:border-white/[0.06]
                  dark:bg-white/[0.02]
                  dark:text-slate-500
                "
              >
                <th className="px-5 py-4">
                  Sender
                </th>

                <th className="px-5 py-4">
                  Subject
                </th>

                <th className="px-5 py-4">
                  Message
                </th>

                <th className="px-5 py-4">
                  Received
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
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
                        "
                      >
                        <RefreshCw
                          size={18}
                          className="animate-spin"
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
                        Loading messages
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        Fetching the latest contact data...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-slate-100
                          text-slate-400
                          ring-1
                          ring-slate-200
                          dark:bg-white/[0.04]
                          dark:text-slate-500
                          dark:ring-white/[0.06]
                        "
                      >
                        <Inbox size={21} />
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
                        No messages yet
                      </p>

                      <p
                        className="
                          mt-1
                          max-w-xs
                          text-xs
                          leading-5
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        Messages submitted through the
                        website will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => {
                  const initials =
                    contact.name
                      ?.split(/\s+/)
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "?";

                  return (
                    <tr
                      key={contact.id}
                      className="
                        group/row
                        border-b
                        border-slate-100
                        transition-all
                        duration-200
                        hover:bg-slate-50/70
                        dark:border-white/[0.04]
                        dark:hover:bg-white/[0.025]
                      "
                    >
                      {/* Sender */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-slate-100
                              text-[11px]
                              font-bold
                              text-slate-600
                              ring-1
                              ring-slate-200
                              transition-all
                              duration-300
                              group-hover/row:bg-blue-500/10
                              group-hover/row:text-blue-500
                              group-hover/row:ring-blue-500/10
                              dark:bg-white/[0.05]
                              dark:text-slate-300
                              dark:ring-white/[0.06]
                              dark:group-hover/row:bg-blue-400/10
                              dark:group-hover/row:text-blue-400
                              dark:group-hover/row:ring-blue-400/10
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
                                text-slate-800
                                dark:text-slate-200
                              "
                            >
                              {contact.name}
                            </p>

                            <p
                              className="
                                mt-0.5
                                truncate
                                text-[11px]
                                text-slate-400
                                dark:text-slate-500
                              "
                            >
                              {contact.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="max-w-[220px] px-5 py-4">
                        <p
                          className="
                            truncate
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                          "
                        >
                          {contact.subject || "Tanpa subject"}
                        </p>
                      </td>

                      {/* Message */}
                      <td className="max-w-[300px] px-5 py-4">
                        <p
                          className="
                            truncate
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          {contact.message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Clock3
                            size={13}
                            className="
                              text-slate-400
                              dark:text-slate-500
                            "
                          />

                          <span
                            className="
                              text-xs
                              text-slate-500
                              dark:text-slate-400
                            "
                          >
                            {new Date(
                              contact.createdAt
                            ).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedContact(contact)
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              text-slate-500
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:border-blue-500/20
                              hover:bg-blue-500/[0.06]
                              hover:text-blue-500
                              hover:shadow-lg
                              hover:shadow-blue-500/5
                              dark:border-white/[0.07]
                              dark:bg-white/[0.02]
                              dark:text-slate-400
                              dark:hover:border-blue-400/20
                              dark:hover:bg-blue-400/[0.06]
                              dark:hover:text-blue-400
                            "
                            title="Lihat pesan"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(contact.id)
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              text-slate-400
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:border-rose-500/20
                              hover:bg-rose-500/[0.06]
                              hover:text-rose-500
                              hover:shadow-lg
                              hover:shadow-rose-500/5
                              dark:border-white/[0.07]
                              dark:bg-white/[0.02]
                              dark:text-slate-500
                              dark:hover:border-rose-400/20
                              dark:hover:bg-rose-400/[0.06]
                              dark:hover:text-rose-400
                            "
                            title="Hapus pesan"
                          >
                            <Trash2 size={15} />
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
        {!loading && contacts.length > 0 && (
          <div
            className="
              flex
              flex-col
              gap-2
              border-t
              border-slate-200/70
              px-5
              py-3.5
              sm:flex-row
              sm:items-center
              sm:justify-between
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
              Showing {contacts.length} contact messages
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1
                text-[11px]
                font-medium
                text-slate-400
                dark:text-slate-500
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Contact system operational
            </span>
          </div>
        )}
      </section>

      {/* =====================================================
          DETAIL MODAL
      ====================================================== */}

      {selectedContact && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-md
          "
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="
              relative
              w-full
              max-w-xl
              overflow-hidden
              rounded-3xl
              border
              border-slate-200/70
              bg-white
              shadow-2xl
              dark:border-white/[0.08]
              dark:bg-slate-950
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Glow */}
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-52
                w-52
                rounded-full
                bg-blue-500/[0.07]
                blur-3xl
              "
            />

            {/* Modal Header */}
            <div
              className="
                relative
                flex
                items-start
                justify-between
                border-b
                border-slate-200/70
                p-6
                dark:border-white/[0.06]
              "
            >
              <div className="flex items-center gap-3">
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
                  "
                >
                  <Mail size={18} />
                </div>

                <div>
                  <h2
                    className="
                      text-base
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Contact Message
                  </h2>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Message details
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-400
                  transition-all
                  hover:border-slate-300
                  hover:bg-slate-50
                  hover:text-slate-600
                  dark:border-white/[0.07]
                  dark:hover:border-white/[0.12]
                  dark:hover:bg-white/[0.04]
                  dark:hover:text-slate-200
                "
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="relative space-y-5 p-6">
              {/* Sender */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200/70
                  bg-slate-50/70
                  p-4
                  dark:border-white/[0.06]
                  dark:bg-white/[0.025]
                "
              >
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
                    text-sm
                    font-bold
                    text-blue-500
                  "
                >
                  {selectedContact.name
                    ?.split(/\s+/)
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "?"}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {selectedContact.name}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {selectedContact.email}
                  </p>
                </div>

                <User
                  size={15}
                  className="
                    ml-auto
                    shrink-0
                    text-slate-400
                    dark:text-slate-500
                  "
                />
              </div>

              {/* Subject */}
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Subject
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {selectedContact.subject || "Tanpa subject"}
                </p>
              </div>

              {/* Message */}
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Message
                </p>

                <div
                  className="
                    mt-2
                    rounded-2xl
                    border
                    border-slate-200/70
                    bg-slate-50/70
                    p-4
                    text-sm
                    leading-6
                    text-slate-700
                    dark:border-white/[0.06]
                    dark:bg-white/[0.025]
                    dark:text-slate-300
                  "
                >
                  <p className="whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-slate-200/70
                  pt-4
                  dark:border-white/[0.06]
                "
              >
                <div className="flex items-center gap-2">
                  <Clock3
                    size={14}
                    className="text-slate-400"
                  />

                  <span
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Received
                  </span>
                </div>

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  {new Date(
                    selectedContact.createdAt
                  ).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="
                flex
                justify-end
                border-t
                border-slate-200/70
                p-4
                dark:border-white/[0.06]
              "
            >
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-600
                  transition-all
                  hover:border-slate-300
                  hover:bg-slate-50
                  dark:border-white/[0.08]
                  dark:text-slate-300
                  dark:hover:bg-white/[0.04]
                "
              >
                Close
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;