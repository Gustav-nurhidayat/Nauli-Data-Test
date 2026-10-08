import React, { useEffect, useState } from "react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const ServicePublicPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] =
    useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://37.1.208.64:3000/api/services"
        );

        if (!response.ok) {
          throw new Error("Network error");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Gagal mengambil data service:", error);

        // Fallback data
        setServices([
          {
            id: 1,
            title: "Web Development",
            description:
              "Building modern, scalable, and high-performance website solutions designed to accelerate business growth.",
          },
          {
            id: 2,
            title: "Cyber Security",
            description:
              "Security testing, vulnerability assessment, and protection strategies to secure your digital infrastructure.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleOpenOrderModal = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://37.1.208.64:3000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: selectedService.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            notes: formData.notes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      alert(
        `Order untuk "${selectedService.title}" berhasil dikirim!`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
      });

      handleCloseModal();
    } catch (error) {
      console.error("Error order:", error);
      alert(
        "Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#00BFFF]/10 blur-[140px]" />

        <div className="absolute right-[-200px] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/20 bg-[#00BFFF]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00BFFF]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00BFFF]" />
            Our Expertise
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Services{" "}
            <span className="bg-gradient-to-r from-[#00BFFF] to-cyan-300 bg-clip-text text-transparent">
              & Solutions
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Solusi digital profesional dari{" "}
            <span className="font-semibold text-slate-200">
              Centa Limited
            </span>{" "}
            untuk membantu bisnis berkembang, beradaptasi, dan tetap aman di
            era digital.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            ["01", "Expertise"],
            ["24/7", "Support"],
            ["100%", "Dedicated"],
            ["∞", "Scalable"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-[#080d1d]/80 px-5 py-5 text-center backdrop-blur-sm"
            >
              <div className="text-xl font-bold text-[#00BFFF]">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ================= SERVICES ================= */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.025] p-8"
              >
                <div className="mb-7 h-10 w-10 rounded-xl bg-white/10" />
                <div className="mb-4 h-6 w-2/3 rounded bg-white/10" />
                <div className="mb-2 h-4 w-full rounded bg-white/5" />
                <div className="mb-8 h-4 w-4/5 rounded bg-white/5" />
                <div className="h-11 w-full rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
              —
            </div>

            <h3 className="text-lg font-bold text-white">
              No Services Available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Belum ada layanan yang tersedia saat ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((item, index) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#00BFFF]/30 hover:bg-white/[0.045] hover:shadow-[0_20px_80px_rgba(0,191,255,0.08)] sm:p-8"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#00BFFF]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* Card Header */}
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/10 text-sm font-bold text-[#00BFFF]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Service
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#00BFFF]">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                  {/* Divider */}
                  <div className="my-7 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                  {/* CTA */}
                  <button
                    onClick={() => handleOpenOrderModal(item)}
                    className="group/btn flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF] hover:text-[#050816]"
                  >
                    <span>Order / Konsultasi</span>

                    <span className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ================= BOTTOM CTA ================= */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-[#00BFFF]/20 bg-gradient-to-br from-[#00BFFF]/10 via-white/[0.02] to-transparent p-8 sm:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00BFFF]/10 blur-[100px]" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00BFFF]">
                Let's Build Something
              </div>

              <h2 className="max-w-xl text-2xl font-bold sm:text-3xl">
                Punya project atau kebutuhan khusus?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Diskusikan kebutuhan Anda bersama tim Centa Limited dan
                temukan solusi digital yang tepat.
              </p>
            </div>

            <button
              onClick={() => {
                if (services.length > 0) {
                  handleOpenOrderModal(services[0]);
                }
              }}
              className="shrink-0 rounded-xl bg-[#00BFFF] px-6 py-3.5 text-sm font-bold text-[#050816] shadow-lg shadow-[#00BFFF]/10 transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              Start a Conversation →
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && selectedService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="relative my-8 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#080d1d] shadow-2xl shadow-black/50">
            {/* Modal Glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#00BFFF]/10 blur-3xl" />

            <div className="relative p-6 sm:p-8">
              {/* Close */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                ×
              </button>

              {/* Modal Header */}
              <div className="mb-7 pr-10">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#00BFFF]/20 bg-[#00BFFF]/10 text-[#00BFFF]">
                  +
                </div>

                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#00BFFF]">
                  Service Request
                </p>

                <h3 className="text-2xl font-bold text-white">
                  Let's work together.
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Requesting:
                  <span className="ml-1 font-medium text-slate-300">
                    {selectedService.title}
                  </span>
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleOrderSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00BFFF]/50 focus:bg-[#00BFFF]/[0.03] focus:ring-2 focus:ring-[#00BFFF]/10"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00BFFF]/50 focus:bg-[#00BFFF]/[0.03] focus:ring-2 focus:ring-[#00BFFF]/10"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    WhatsApp / Phone
                  </label>

                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00BFFF]/50 focus:bg-[#00BFFF]/[0.03] focus:ring-2 focus:ring-[#00BFFF]/10"
                    placeholder="+62 812 3456 7890"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Project Details
                  </label>

                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00BFFF]/50 focus:bg-[#00BFFF]/[0.03] focus:ring-2 focus:ring-[#00BFFF]/10"
                    placeholder="Tell us about your project, requirements, timeline, or budget..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00BFFF] py-3.5 text-sm font-bold text-[#050816] transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#050816]/30 border-t-[#050816]" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Send Service Request
                      <span>→</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] leading-5 text-slate-600">
                  Dengan mengirim form ini, Anda menyetujui bahwa tim Centa
                  Limited dapat menghubungi Anda terkait kebutuhan project.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicePublicPage;
