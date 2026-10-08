import { useState } from "react";
import toast from "react-hot-toast";
import http from "../../services/api";

const gridBg =
  "[background-image:linear-gradient(rgba(21,224,237,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.055)_1px,transparent_1px)] [background-size:28px_28px]";

const fieldClass = `
  peer
  relative
  w-full
  rounded-xl
  border
  border-[#1a1d1d]
  bg-[#060707]/80
  px-4
  py-3.5
  text-sm
  text-[#eef2f2]
  placeholder:text-[#5c6666]
  outline-none
  transition-all
  duration-300
  hover:border-[#15E0ED]/25
  focus:border-[#15E0ED]/50
  focus:bg-[#15E0ED]/[0.03]
  focus:shadow-[0_0_30px_rgba(21,224,237,0.08)]
`;

const labelClass =
  "mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#5c6666] transition-colors duration-300 group-focus-within:text-[#15E0ED]";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "Attacker",
    email: "attacker@test.local",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await http.post("/feedback", form);

      toast.success("Feedback berhasil dikirim.");

      setForm((current) => ({
        ...current,
        subject: "",
        message: "",
      }));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Gagal mengirim feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-[#15E0ED]/[0.035] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[5%] left-[-180px] h-[360px] w-[360px] rounded-full bg-[#15E0ED]/[0.02] blur-[130px]" />

      {/* Fine background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(21,224,237,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <article className="group relative overflow-hidden rounded-[1.75rem] border border-[#1a1d1d] bg-[#0b0d0d]/80 p-6 backdrop-blur-xl transition-all duration-500 hover:border-[#15E0ED]/25 hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-9">
          {/* Hover grid */}
          <div
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [mask-image:linear-gradient(to_right,black,transparent_75%)] ${gridBg}`}
          />

          {/* Corner glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#15E0ED]/[0.04] blur-3xl transition-all duration-700 group-hover:bg-[#15E0ED]/[0.08]" />

          {/* Corner brackets */}
          <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#15E0ED]/20 transition-all duration-500 group-hover:h-5 group-hover:w-5 group-hover:border-[#15E0ED]/60" />
          <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[#15E0ED]/20 transition-all duration-500 group-hover:h-5 group-hover:w-5 group-hover:border-[#15E0ED]/60" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#15E0ED]/20 transition-all duration-500 group-hover:h-5 group-hover:w-5 group-hover:border-[#15E0ED]/60" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#15E0ED]/20 transition-all duration-500 group-hover:h-5 group-hover:w-5 group-hover:border-[#15E0ED]/60" />

          {/* Left accent line */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-[#15E0ED] via-[#15E0ED] to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

          {/* Bottom accent line */}
          <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#15E0ED] to-transparent opacity-0 transition-all duration-700 group-hover:opacity-20" />

          <div className="relative">
            {/* Header */}
            <div className="mb-9">
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-[#15E0ED]/40" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#15E0ED]">
                  Security Lab
                </span>
                <span className="h-1 w-1 rounded-full bg-[#15E0ED] shadow-[0_0_8px_rgba(21,224,237,0.8)]" />
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.045em] text-[#eef2f2] sm:text-4xl">
                Submit
                <span className="block bg-gradient-to-r from-white via-[#15E0ED] to-white bg-clip-text text-transparent">
                  feedback.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#8a9494]">
                Send a message to the administration team.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="group/field group">
                  <label htmlFor="fb-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="fb-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Name"
                    className={fieldClass}
                  />
                </div>

                <div className="group/field group">
                  <label htmlFor="fb-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="group/field group">
                <label htmlFor="fb-subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="fb-subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  placeholder="Subject"
                  className={fieldClass}
                />
              </div>

              <div className="group/field group">
                <label htmlFor="fb-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="fb-message"
                  rows={10}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Write your feedback..."
                  className={`${fieldClass} resize-y font-mono leading-7`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#15E0ED]/40
                  bg-[#15E0ED]/[0.07]
                  py-3.5
                  font-mono
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#15E0ED]
                  transition-all
                  duration-500
                  hover:border-[#15E0ED]/70
                  hover:bg-[#15E0ED]/[0.12]
                  hover:shadow-[0_0_45px_rgba(21,224,237,0.20)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#15E0ED]/50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
                  {loading && (
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#15E0ED]" />
                  )}
                  {loading ? "Sending..." : "Send Feedback"}
                </span>
              </button>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}