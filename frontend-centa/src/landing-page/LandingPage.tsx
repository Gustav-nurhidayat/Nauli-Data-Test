import { useEffect, useRef, useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import SEO from "../components/SEO";

import {
  sendContactMessage,
} from "../services/contact.service";

import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function LandingPage() {
  

  const servicesReveal = useReveal();
  const whyReveal = useReveal();
  const contactReveal = useReveal();

  

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [faqVisible, setFaqVisible] = useState(false);

  const faqSectionRef = useRef<HTMLDivElement | null>(null);

  

  useEffect(() => {
    const element = faqSectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFaqVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  

  useEffect(() => {
    const id = window.location.hash.replace("#", "");

    if (!id) return;

    const target = document.getElementById(id);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, []);

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        subject:
          `${formData.service || "Project Inquiry"} - ${
            formData.company || "Website Visitor"
          }`,
        message: `
Phone: ${formData.phone}

Company:
${formData.company}

Service:
${formData.service}

Project Details:
${formData.message}
        `.trim(),
      });

      toast.success(
        "Message sent successfully. Our team will contact you soon."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error: any) {
      console.error(
        "CONTACT ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ??
          "Failed sending message."
      );
    }
  };

  

  const services = [
    {
      title: "Software Development",
      description:
        "Pengembangan software custom yang dirancang sesuai kebutuhan bisnis, workflow, dan skala organisasi.",
      tags: ["Custom Software", "API", "Backend"],
    },
    {
      title: "Web Development",
      description:
        "Membangun website dan web application yang modern, responsif, cepat, scalable, dan security-aware.",
      tags: ["Web App", "Frontend", "Backend"],
    },
    {
      title: "Application Development",
      description:
        "Mengembangkan aplikasi digital yang membantu bisnis menciptakan proses kerja lebih efisien dan terintegrasi.",
      tags: ["Application", "Integration", "Automation"],
    },
    {
      title: "Cyber Security",
      description:
        "Mengidentifikasi dan mengurangi risiko keamanan melalui security assessment, penetration testing, dan hardening.",
      tags: ["Pentest", "Assessment", "Hardening"],
    },
    {
      title: "Infrastructure & Cloud",
      description:
        "Membantu merancang dan mengamankan infrastruktur server, network, cloud, dan environment digital.",
      tags: ["Cloud", "Network", "Infrastructure"],
    },
    {
      title: "Game Development",
      description:
        "Pengalaman interaktif dan permainan yang dikembangkan dengan teknologi modern, mulai dari konsep dan rekayasa hingga produk digital yang matang.",
      tags: ["Game", "Development", "Integration"],
    },
  ];

  

  const faqs = [
    {
      question: "Apa saja layanan utama X?",
      answer:
        " X bergerak di bidang software development dan cyber security. Layanan kami mencakup web development, application development, custom software, infrastructure, penetration testing, security assessment, dan security advisory.",
    },
    {
      question: "Apakah X hanya menyediakan layanan cyber security?",
      answer:
        "Tidak. Software engineering merupakan salah satu fokus utama X. Kami mengembangkan website, web application, custom software, dan aplikasi digital, dengan security sebagai bagian penting dari proses engineering.",
    },
    {
      question: "Apakah X bisa mengembangkan aplikasi custom?",
      answer:
        "Ya. Kami dapat membantu mengembangkan aplikasi berdasarkan kebutuhan bisnis, mulai dari perancangan konsep, UI/UX, backend, frontend, database, API integration, deployment, hingga security review.",
    },
    {
      question:
        "Apakah security testing bisa dilakukan pada aplikasi yang sudah ada?",
      answer:
        "Bisa. Kami dapat melakukan assessment terhadap aplikasi atau infrastructure yang sudah berjalan untuk membantu mengidentifikasi vulnerability, configuration issue, dan risiko keamanan lainnya.",
    },
  ];

  

  const headings = [
    "Build secure digital products with confidence",
    "Protect your business from modern cyber threats",
    "Create software that grows with your needs",
    "Empower your team with reliable technology",
  ];

  const [headingIndex, setHeadingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentHeading = headings[headingIndex];

    let speed = isDeleting ? 40 : 80;

    if (
      !isDeleting &&
      charIndex === currentHeading.length
    ) {
      speed = 2000;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentHeading.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setHeadingIndex(
            (prev) => (prev + 1) % headings.length
          );
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    headingIndex,
    isDeleting,
  ]);

return (
  <>
    <SEO
      title="Goestaf Nurhidayat — Engineering Meets Cybersecurity"
      description="X  provides software development, web development, application development, cybersecurity, and secure digital infrastructure solutions."
      canonical="https://example.com/"
    />

    <div className="min-h-screen overflow-hidden text-white">

      

    <main>
  

<section
  id="top"
  className="
    relative
    flex
    min-h-screen
    items-center
    overflow-hidden
    scroll-mt-24
    px-6
    py-24
    sm:px-8
    lg:px-12Cannot find name 'faqSectionRef'.ts(2304)
any
  "
>
  

  <div
    className="
      pointer-events-none
      absolute
      right-[-180px]
      top-[30%]
      h-[420px]
      w-[420px]
      rounded-full
      bg-violet-600/[0.045]
      blur-[140px]
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      left-[-220px]
      top-[15%]
      h-[360px]
      w-[360px]
      rounded-full
      bg-cyan-400/[0.025]
      blur-[130px]
    "
  />

  {/* Top cyan line */}

  <div
    className="
      pointer-events-none
      absolute
      inset-x-0
      top-0
      h-px
      bg-gradient-to-r
      from-transparent
      via-cyan-400/20
      to-transparent
    "
  />

  

  

  <div className="relative z-10 mx-auto w-full max-w-7xl">

   

<div className="mx-auto w-full max-w-5xl text-center">

  
  <div className="relative">

    {/* Typing Heading */}

    <h1
      className="
        min-h-[150px]
        text-5xl
        font-black
        leading-[0.98]
        tracking-[-0.055em]
        text-white
        sm:min-h-[180px]
        sm:text-6xl
        lg:min-h-[185px]
        lg:text-[76px]
      "
    >
      <span
        className="
          bg-gradient-to-r
          from-white
          via-slate-200
          to-white
          bg-clip-text
          text-transparent
        "
      >
        {headings[headingIndex].substring(0, charIndex)}
      </span>

      {/* Typing cursor */}

      <span
        className="
          ml-1
          inline-block
          text-white
          animate-pulse
        "
      >
        |
      </span>
    </h1>

    {/* Accent line */}

    <span
      className="
        absolute
        -bottom-3
        left-1/2
        h-px
        w-24
        -translate-x-1/2
        bg-white/30
      "
    />

  </div>
  

  

  <div className="mx-auto mt-10 max-w-2xl">

    <p
      className="
        text-base
        leading-8
        text-slate-400
        sm:text-lg
      "
    >
      X membantu bisnis membangun software, digital
      products, infrastructure, dan security systems yang
      modern, scalable, dan resilient dengan pendekatan
      security-first untuk menghadapi ancaman digital masa kini.
    </p>

    {/* Security-first indicator */}

    <div
      className="
        mt-4
        flex
        items-center
        justify-center
        gap-2
        text-xs
        font-semibold
        text-slate-400
      "
    >
      <span
        className="
          h-1
          w-1
          rounded-full
          bg-white/60
        "
      />

      Security-first engineering
    </div>

  </div>


  <div
    className="
      mt-9
      flex
      flex-col
      justify-center
      gap-3
      sm:flex-row
    "
  >

    

    <a
  href="#contact"
  className="
    group
    relative
    isolate
    inline-flex
    items-center
    justify-center
    gap-3
    overflow-hidden
    rounded-xl
    border
    border-cyan-300/30
    bg-cyan-400
    px-6
    py-3.5
    text-sm
    font-bold
    text-[#030712]
    shadow-[0_0_30px_rgba(34,211,238,0.10)]
    transition-all
    duration-500
    hover:-translate-y-1
    hover:bg-cyan-300
    hover:shadow-[0_15px_45px_rgba(34,211,238,0.22)]
  "
>
  {/* Moving light */}

  <span
    className="
      pointer-events-none
      absolute
      inset-y-0
      left-[-60%]
      w-[45%]
      skew-x-[-20deg]
      bg-white/30
      blur-md
      transition-all
      duration-700
      group-hover:left-[120%]
    "
  />

  <span className="relative z-10">
    Start a Project
  </span>

  <ArrowRight
    className="
      relative
      z-10
      h-4
      w-4
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</a>

    

    <a
      href="#services"
      className="
        group
        relative
        inline-flex
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-xl
        border
        border-white/[0.10]
        bg-white/[0.025]
        px-6
        py-3.5
        text-sm
        font-semibold
        text-white
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.05]
        hover:shadow-[0_15px_45px_rgba(255,255,255,0.04)]
      "
    >

      {/* Hover grid */}

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
          [background-size:16px_16px]
        "
      />

      <span
        className="
          relative
          z-10
          h-1.5
          w-1.5
          rounded-full
          bg-white/50
          transition-all
          duration-300
          group-hover:bg-white
          group-hover:shadow-[0_0_10px_rgba(255,255,255,0.7)]
        "
      />

      <span className="relative z-10">
       Why X
      </span>

      <ArrowRight
        className="
          relative
          z-10
          h-4
          w-4
          text-slate-500
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:text-white
        "
      />

    </a>

  </div>

</div>
</div>

</section>

     

 

<section
  id="services"
  className="relative scroll-mt-24"
>
 

  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -left-[220px]
      top-[12%]
      h-[520px]
      w-[520px]
      rounded-full
      bg-cyan-400/[0.08]
      blur-[150px]
    "
  />

  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -left-[220px]
      bottom-[5%]
      h-[460px]
      w-[460px]
      rounded-full
      bg-violet-500/[0.025]
      blur-[150px]
    "
  />

  

  <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10 lg:py-32">



<div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

  <div>

    {/* Label */}
   

    {/* Heading */}
    <h2
      className="
        mt-6
        text-4xl
        font-black
        tracking-[-0.045em]
        text-[var(--centa-text)]
        sm:text-5xl
        lg:text-[58px]
        lg:leading-[1.02]
      "
    >
      Technology built

     <span
  className="
    block
    bg-gradient-to-r
    from-white
    via-[var(--centa-cyan)]
    to-cyan-300
    bg-clip-text
    text-transparent
  "
>
  for real businesses.
</span>
    </h2>

  </div>

  {/* Description */}
  <div className="lg:pl-16 lg:pb-1">

    <p className="max-w-xl text-sm leading-7 text-slate-400">
      Dari membangun aplikasi dari nol hingga mengamankan sistem
      yang sudah berjalan, X membantu bisnis mengembangkan
      teknologi yang reliable, scalable, dan security-aware.
    </p>

  </div>

</div>

 

<div
  ref={servicesReveal.ref}
  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
>
  {services.map((service, index) => {

    const fromLeft = index % 2 === 0;

    return (
      <article
        key={service.title}
        style={{
          transitionDelay: servicesReveal.visible
            ? `${index * 90}ms`
            : "0ms",
        }}
        className={`
          group
          relative
          isolate
          h-full
          overflow-hidden
          rounded-[1.75rem]
          border
          border-[#1a1d1d]
          bg-[#0b0d0d]/75
          p-7
          backdrop-blur-xl

          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          hover:-translate-y-0.5
          hover:border-[#15E0ED]/25
          hover:bg-[#0f1414]/90
          hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]

          ${
            servicesReveal.visible
              ? `
                translate-x-0
                translate-y-0
                scale-100
                opacity-100
                blur-0
              `
              : fromLeft
                ? `
                  -translate-x-12
                  translate-y-2
                  scale-[0.97]
                  opacity-0
                  blur-[5px]
                `
                : `
                  translate-x-12
                  translate-y-2
                  scale-[0.97]
                  opacity-0
                  blur-[5px]
                `
          }
        `}
      >

        

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            transition-opacity
            duration-500
            group-hover:opacity-[0.05]

            [background-image:linear-gradient(rgba(34,211,238,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.4)_1px,transparent_1px)]

            [background-size:32px_32px]
          "
        />


        

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-cyan-400/[0.04]
            blur-3xl
            transition-all
            duration-700
            group-hover:scale-125
            group-hover:bg-cyan-400/[0.08]
          "
        />


       

        <div className="relative z-10">

          {/* TITLE */}

          <h3
            className="
              text-xl
              font-bold
              tracking-[-0.02em]
              text-white
              transition-colors
              duration-300
              group-hover:text-cyan-300
            "
          >
            {service.title}
          </h3>


          {/* DESCRIPTION */}

          <p
            className="
              mt-3
              text-[11px]
              leading-5
              text-slate-400
              transition-colors
              duration-300
              group-hover:text-slate-300
            "
          >
            {service.description}
          </p>




          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              pt-4
            "
          >

            <a
              href="#contact"
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="
                group/contact
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-cyan-400/20
                bg-cyan-400/[0.04]
                px-3
                py-2
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-cyan-400

                transition-all
                duration-300

                hover:border-cyan-400/40
                hover:bg-cyan-400/[0.08]
                hover:text-cyan-300
                hover:shadow-[0_0_20px_rgba(34,211,238,0.10)]
              "
            >
              Contact Us

              <ArrowRight
                className="
                  h-3
                  w-3
                  transition-transform
                  duration-300
                  group-hover/contact:translate-x-1
                "
              />
            </a>

          </div>

        </div>


       

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-6
            w-6
            border-l
            border-t
            border-cyan-400/10

            transition-all
            duration-500

            group-hover:h-8
            group-hover:w-8
            group-hover:border-cyan-400/40
          "
        />


       

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-6
            w-6
            border-b
            border-r
            border-cyan-400/10

            transition-all
            duration-500

            group-hover:h-8
            group-hover:w-8
            group-hover:border-cyan-400/40
          "
        />

      </article>
    );
  })}
</div>

</div>

</section>




<section
  id="why"
  className="relative z-[1] py-[100px]"
>
  <div className="mx-auto max-w-[1180px] px-8">

    {/* TITLE */}
    <h2
      className="
        mb-4
        max-w-[640px]
        text-[clamp(26px,3.6vw,40px)]
        font-extrabold
        tracking-[-1px]
        text-[#eef2f2]
      "
    >
      Why X?
    </h2>

    {/* DESCRIPTION */}
    <p
      className="
        mb-14
        max-w-[560px]
        text-base
        leading-relaxed
        text-[#8a9494]
      "
    >
      Built with a focus on innovation, security, and reliability,
      X develops technology designed to solve real-world challenges,
      empowering developers, businesses, and communities with solutions
      built for today and ready for tomorrow.
    </p>

   {/* CARDS */}
<div
  ref={whyReveal.ref}
  className="
    grid
    grid-cols-1
    overflow-hidden
    rounded-xl
    border
    border-[#1a1d1d]
    sm:grid-cols-2
    lg:grid-cols-4
  "
>

 
  <div
    style={{
      transitionDelay: whyReveal.visible ? "0ms" : "0ms",
    }}
    className={`
      group
      bg-[#0b0d0d]
      px-[22px]
      py-7
      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:bg-[#0f1414]

      ${
        whyReveal.visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[4px]"
      }
    `}
  >
    <svg
      className="
        mb-[18px]
        h-[34px]
        w-[34px]
        text-[#15E0ED]
      "
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>

    <h3
      className="
        mb-2
        text-base
        font-bold
        text-[#eef2f2]
      "
    >
      Innovative
    </h3>

    <p
      className="
        text-[13.5px]
        text-[#8a9494]
      "
    >
      Modern technology built to create meaningful solutions.
    </p>
  </div>



  <div
    style={{
      transitionDelay: whyReveal.visible ? "100ms" : "0ms",
    }}
    className={`
      group
      bg-[#0b0d0d]
      px-[22px]
      py-7
      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:bg-[#0f1414]

      ${
        whyReveal.visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[4px]"
      }
    `}
  >
    <svg
      className="
        mb-[18px]
        h-[34px]
        w-[34px]
        text-[#15E0ED]
      "
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.2"
      />

      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.2"
      />

      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.2"
      />

      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.2"
      />
    </svg>

    <h3
      className="
        mb-2
        text-base
        font-bold
        text-[#eef2f2]
      "
    >
      Reliable
    </h3>

    <p
      className="
        text-[13.5px]
        text-[#8a9494]
      "
    >
      Dependable products designed for consistent everyday use.
    </p>
  </div>


  
  <div
    style={{
      transitionDelay: whyReveal.visible ? "200ms" : "0ms",
    }}
    className={`
      group
      bg-[#0b0d0d]
      px-[22px]
      py-7
      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:bg-[#0f1414]

      ${
        whyReveal.visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[4px]"
      }
    `}
  >
    <svg
      className="
        mb-[18px]
        h-[34px]
        w-[34px]
        text-[#15E0ED]
      "
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>

    <h3
      className="
        mb-2
        text-base
        font-bold
        text-[#eef2f2]
      "
    >
      Security-first
    </h3>

    <p
      className="
        text-[13.5px]
        text-[#8a9494]
      "
    >
      Security is considered throughout every product we build.
    </p>
  </div>


  
  <div
    style={{
      transitionDelay: whyReveal.visible ? "300ms" : "0ms",
    }}
    className={`
      group
      bg-[#0b0d0d]
      px-[22px]
      py-7
      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:bg-[#0f1414]

      ${
        whyReveal.visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[4px]"
      }
    `}
  >
    <svg
      className="
        mb-[18px]
        h-[34px]
        w-[34px]
        text-[#15E0ED]
      "
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M7 18a5 5 0 0 1-1-9.9A6 6 0 0 1 17.5 8 4.5 4.5 0 0 1 17 17H7Z" />
    </svg>

    <h3
      className="
        mb-2
        text-base
        font-bold
        text-[#eef2f2]
      "
    >
      Scalable
    </h3>

    <p
      className="
        text-[13.5px]
        text-[#8a9494]
      "
    >
      Solutions designed to grow with people, teams, and businesses.
    </p>
  </div>

</div>
</div>
</section>

      

<section
  id="faq"
  ref={faqSectionRef}
  className="relative"
>
  <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10 lg:py-32">

    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

      

      <div className="lg:sticky lg:top-32 lg:self-start">

        {/* Badge */}
       

        {/* Heading */}
        <h2
          className="
            mt-6
            text-4xl
            font-black
            tracking-[-0.04em]
            text-[#eef2f2]
            sm:text-5xl
          "
        >
          Questions
          <br />

          <span
            className="
              bg-gradient-to-r
              from-white
              via-[#15E0ED]
              to-white
              bg-clip-text
              text-transparent
            "
          >
            before we build.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-md text-sm leading-7 text-[#687272]">
          Beberapa hal yang biasanya ingin diketahui sebelum memulai
          software, web, application, atau security project bersama
          X.
        </p>

        

        <div
          className="
            mt-10
            overflow-hidden
            rounded-3xl
            border
            border-[#1a1d1d]
            bg-[#0b0d0d]/60
            backdrop-blur-xl
          "
        >

       
             
        </div>

      </div>




<div className="space-y-3">

  {faqs.map((faq, index) => {
    const isOpen = openFaq === index;

    return (
      <div
        key={faq.question}
        style={{
          transitionDelay: faqVisible
            ? `${index * 100}ms`
            : "0ms",
        }}
        className={`
          group
          overflow-hidden
          rounded-3xl
          border

        

          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            faqVisible
              ? `
                translate-x-0
                opacity-100
                blur-0
              `
              : `
                translate-x-12
                opacity-0
                blur-[4px]
              `
          }

        

          ${
            isOpen
              ? `
                border-[#15E0ED]/20
                bg-[#15E0ED]/[0.025]
                shadow-[0_15px_50px_rgba(21,224,237,0.045)]
              `
              : `
                border-[#1a1d1d]
                bg-[#0b0d0d]/60
                backdrop-blur-xl
                hover:border-[#15E0ED]/10
                hover:bg-[#0e1111]
              `
          }
        `}
      >

        <button
          type="button"
          onClick={() =>
            setOpenFaq(isOpen ? null : index)
          }
          className="
            flex
            w-full
            items-start
            gap-5
            px-6
            py-6
            text-left
            sm:px-7
          "
        >

         

          <div
            className={`
              mt-0.5
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              text-[10px]
              font-black
              transition-all
              duration-300

              ${
                isOpen
                  ? `
                    border-[#15E0ED]/20
                    bg-[#15E0ED]/10
                    text-[#15E0ED]
                    shadow-[0_0_15px_rgba(21,224,237,0.08)]
                  `
                  : `
                    border-[#1a1d1d]
                    bg-white/[0.015]
                    text-[#3f4949]
                    group-hover:border-[#15E0ED]/10
                    group-hover:text-[#687272]
                  `
              }
            `}
          >
            0{index + 1}
          </div>


        

          <div className="flex-1">

            {/* QUESTION */}

            <div
              className={`
                text-sm
                font-bold
                transition-colors
                duration-300
                sm:text-[15px]

                ${
                  isOpen
                    ? "text-[#15E0ED]"
                    : "text-[#eef2f2]"
                }
              `}
            >
              {faq.question}
            </div>


           

            {isOpen && (
              <div
                className="
                  mt-4
                  max-w-2xl
                  border-t
                  border-[#15E0ED]/10
                  pt-4
                "
              >
                <p
                  className="
                    text-sm
                    leading-7
                    text-[#687272]
                  "
                >
                  {faq.answer}
                </p>
              </div>
            )}

          </div>




          <div
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              transition-all
              duration-300

              ${
                isOpen
                  ? `
                    rotate-180
                    border-[#15E0ED]/20
                    bg-[#15E0ED]/10
                    shadow-[0_0_15px_rgba(21,224,237,0.08)]
                  `
                  : `
                    border-[#1a1d1d]
                    bg-white/[0.015]
                  `
              }
            `}
          >
            <ChevronDown
              className={`
                h-3.5
                w-3.5
                transition-colors

                ${
                  isOpen
                    ? "text-[#15E0ED]"
                    : "text-[#4e5959]"
                }
              `}
            />
          </div>

        </button>

      </div>
    );
  })}




  <div className="flex items-center gap-3 px-2 pt-5">

    <div className="h-px flex-1 bg-[#1a1d1d]" />

    <span
      className="
        text-[9px]
        font-medium
        uppercase
        tracking-[0.18em]
        text-[#3f4949]
      "
    >
      More questions? Let's talk.
    </span>

    <div className="h-px flex-1 bg-[#1a1d1d]" />

  </div>
  </div>
  </div>
  </div>
</section>
 



<section
  id="contact"
  className="
    relative
    z-[1]
    scroll-mt-24
    py-[100px]
  "
>
  <div className="mx-auto max-w-[1180px] px-8">

    

    <div className="max-w-[640px]">
      <h2
        className="
          text-[clamp(26px,3.6vw,40px)]
          font-extrabold
          tracking-[-1px]
          text-[#eef2f2]
        "
      >
        Build the future with us
      </h2>

      <p
        className="
          mt-4
          max-w-[560px]
          text-base
          leading-relaxed
          text-[#8a9494]
        "
      >
        Have a project in mind, need professional cybersecurity, or want to
        work with X? Tell us what you need and our team will get back to
        you.
      </p>
    </div>




    <div
      className="
        mt-7
        grid
        overflow-hidden
        rounded-[14px]
        border
        border-[#1a1d1d]
        bg-[#0b0d0d]
        lg:grid-cols-[1.05fr_0.95fr]
      "
    >



      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
          gap-5
          border-[#1a1d1d]
          p-[30px]
          lg:border-r
        "
      >

        {/* Name */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-bold text-[#eef2f2]"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. John Smith"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="
              w-full
              rounded-lg
              border
              border-[#1a1d1d]
              bg-[#0a0c0c]
              px-[13px]
              py-3
              text-[13px]
              text-[#eef2f2]
              outline-none
              transition-all
              duration-200
              placeholder:text-[#667070]
              focus:border-[#15E0ED]/25
              focus:ring-4
              focus:ring-[#15E0ED]/[0.12]
            "
          />
        </div>


        {/* Email */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-bold text-[#eef2f2]"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. name@company.com"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="
              w-full
              rounded-lg
              border
              border-[#1a1d1d]
              bg-[#0a0c0c]
              px-[13px]
              py-3
              text-[13px]
              text-[#eef2f2]
              outline-none
              transition-all
              duration-200
              placeholder:text-[#667070]
              focus:border-[#15E0ED]/25
              focus:ring-4
              focus:ring-[#15E0ED]/[0.12]
            "
          />
        </div>


        {/* Service */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="service"
            className="text-xs font-bold text-[#eef2f2]"
          >
            Service
          </label>

          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleInputChange}
            className="
              w-full
              appearance-auto
              rounded-lg
              border
              border-[#1a1d1d]
              bg-[#0a0c0c]
              px-[13px]
              py-3
              text-[13px]
              text-[#eef2f2]
              outline-none
              transition-all
              duration-200
              focus:border-[#15E0ED]/25
              focus:ring-4
              focus:ring-[#15E0ED]/[0.12]
            "
          >
            <option
              value=""
              disabled
              className="bg-[#0a0c0c]"
            >
              Select a service
            </option>

            <option value="Cybersecurity Services">
              Cybersecurity Services
            </option>

            <option value="Penetration Testing">
              Penetration Testing
            </option>

            <option value="Software Development">
              Software Development
            </option>

            <option value="Web Development">
              Web Development
            </option>

            <option value="App Development">
              App Development
            </option>

            <option value="Game Development">
              Game Development
            </option>

            <option value="Technology Consulting">
              Technology Consulting
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>


        {/* Message */}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-xs font-bold text-[#eef2f2]"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Tell us a little about your project or requirements."
            required
            value={formData.message}
            onChange={handleInputChange}
            className="
              w-full
              resize-y
              rounded-lg
              border
              border-[#1a1d1d]
              bg-[#0a0c0c]
              px-[13px]
              py-3
              text-[13px]
              leading-relaxed
              text-[#eef2f2]
              outline-none
              transition-all
              duration-200
              placeholder:text-[#667070]
              focus:border-[#15E0ED]/25
              focus:ring-4
              focus:ring-[#15E0ED]/[0.12]
            "
          />
        </div>


        {/* Submit */}

        <button
          type="submit"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-md
            border-0
            bg-[#15E0ED]
            px-[22px]
            py-[11px]
            text-sm
            font-bold
            text-[#00171a]
            transition-all
            duration-200
            hover:-translate-y-[1px]
            hover:shadow-[0_0_26px_rgba(21,224,237,0.55)]
          "
        >
          Send message
        </button>

      </form>




      <div
        className="
          relative
          min-h-full
          overflow-hidden
          bg-[#090b0b]
        "
      >

      {/* Ambient Glow */}

<div
  className="
    pointer-events-none
    absolute
    -bottom-[170px]
    -right-[150px]
    h-[340px]
    w-[340px]
    rounded-full
    bg-[#15E0ED]
    opacity-[0.07]
    blur-[70px]
  "
/>


        {/* Side Content */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            flex-col
            justify-center
            px-9
            py-[42px]
          "
        >

          <div
            className="
              mb-[18px]
              text-xs
              font-extrabold
              uppercase
              tracking-[0.7px]
              text-[#15E0ED]
            "
          >
            LET'S CONNECT
          </div>


          <h3
            className="
              mb-[18px]
              max-w-[360px]
              text-[30px]
              font-extrabold
              leading-[1.1]
              tracking-[-0.7px]
              text-[#eef2f2]
            "
          >
            Let's build something that matters.
          </h3>


          <p
            className="
              max-w-[390px]
              text-sm
              leading-[1.7]
              text-[#8a9494]
            "
          >
            Whether you need a security assessment, a custom application,
            a website, a game, or a complete digital solution, our team is
            ready to help.
          </p>


          {/* Accent Line */}

          <div
            className="
              my-7
              h-px
              w-[54px]
              bg-[#15E0ED]
            "
          />


          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.7px]
              text-[#7e8888]
            "
          >
            Creating products people love.
          </span>

        </div>
      </div>

    </div>


<div
  ref={contactReveal.ref}
  className="mt-6 flex flex-wrap gap-4"
>

  

  <a
    style={{
      transitionDelay: contactReveal.visible
        ? "0ms"
        : "0ms",
    }}
    href="https://wa.me/62895320756331"
    target="_blank"
    rel="noreferrer"
    className={`
      group
      flex
      w-[250px]
      items-center
      gap-3
      rounded-xl
      border
      border-[#1a1d1d]
      bg-[#0b0d0d]
      px-4
      py-3.5

      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]

      hover:-translate-y-0.5
      hover:border-emerald-400/25
      hover:bg-emerald-400/[0.02]

      ${
        contactReveal.visible
          ? "translate-x-0 opacity-100 blur-0"
          : "-translate-x-12 opacity-0 blur-[5px]"
      }
    `}
  >

    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        border-emerald-400/15
        bg-emerald-400/[0.05]
      "
    >
      <FaWhatsapp
        className="h-[17px] w-[17px] text-emerald-400"
      />
    </div>

    <div className="min-w-0 flex-1">

      <div
        className="
          font-mono
          text-[8px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-[#4f5959]
        "
      >
        WhatsApp
      </div>

      <div className="mt-1 text-xs font-semibold text-[#eef2f2]">
        Chat with me
      </div>

    </div>

    <ArrowRight
      className="
        h-3.5
        w-3.5
        shrink-0
        text-[#414949]
        transition-all
        group-hover:translate-x-1
        group-hover:text-emerald-400
      "
    />

  </a>




  <a
    style={{
      transitionDelay: contactReveal.visible
        ? "100ms"
        : "0ms",
    }}
    href="mailto:nurhidayatgustaf@gmail.com"
    className={`
      group
      flex
      w-[250px]
      items-center
      gap-3
      rounded-xl
      border
      border-[#1a1d1d]
      bg-[#0b0d0d]
      px-4
      py-3.5

      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]

      hover:-translate-y-0.5
      hover:border-[#15E0ED]/25
      hover:bg-[#15E0ED]/[0.02]

      ${
        contactReveal.visible
          ? "translate-x-0 opacity-100 blur-0"
          : "translate-x-12 opacity-0 blur-[5px]"
      }
    `}
  >

    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        border-[#15E0ED]/15
        bg-[#15E0ED]/[0.05]
      "
    >
      <FaEnvelope
        className="h-[17px] w-[17px] text-[#15E0ED]"
      />
    </div>

    <div className="min-w-0 flex-1">

      <div
        className="
          font-mono
          text-[8px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-[#4f5959]
        "
      >
        Email
      </div>

      <div className="mt-1 truncate text-xs font-semibold text-[#eef2f2]">
        My Email
      </div>

    </div>

    <ArrowRight
      className="
        h-3.5
        w-3.5
        shrink-0
        text-[#414949]
        transition-all
        group-hover:translate-x-1
        group-hover:text-[#15E0ED]
      "
    />

  </a>


  

  <a
    style={{
      transitionDelay: contactReveal.visible
        ? "200ms"
        : "0ms",
    }}
    href="https://instagram.com/gustafboy"
    target="_blank"
    rel="noreferrer"
    className={`
      group
      flex
      w-[250px]
      items-center
      gap-3
      rounded-xl
      border
      border-[#1a1d1d]
      bg-[#0b0d0d]
      px-4
      py-3.5

      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]

      hover:-translate-y-0.5
      hover:border-violet-400/25
      hover:bg-violet-400/[0.02]

      ${
        contactReveal.visible
          ? "translate-x-0 opacity-100 blur-0"
          : "-translate-x-12 opacity-0 blur-[5px]"
      }
    `}
  >

    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        border-violet-400/15
        bg-violet-400/[0.05]
      "
    >
      <FaInstagram
        className="h-[17px] w-[17px] text-violet-400"
      />
    </div>

    <div className="min-w-0 flex-1">

      <div
        className="
          font-mono
          text-[8px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-[#4f5959]
        "
      >
        Instagram
      </div>

      <div className="mt-1 text-xs font-semibold text-[#eef2f2]">
        Follow Me
      </div>

    </div>

    <ArrowRight
      className="
        h-3.5
        w-3.5
        shrink-0
        text-[#414949]
        transition-all
        group-hover:translate-x-1
        group-hover:text-violet-400
      "
    />

  </a>


</div>

</div>
</section>
</main>

</div>
 </>
);
}