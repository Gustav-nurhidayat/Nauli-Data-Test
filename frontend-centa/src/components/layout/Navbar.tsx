import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  /*
   * =====================================================
   * SERVICES NAVIGATION
   * =====================================================
   *
   * If already on landing page:
   *   -> smooth scroll to #services
   *
   * If on another public page:
   *   -> navigate back to landing page with #services
   */
  const handleServicesClick = () => {
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate("/#services");
  };

  const navLinkClass = (path: string) => `
    relative
    flex
    items-center
    h-full
    text-[13px]
    font-semibold
    tracking-[-0.01em]
    transition-all
    duration-200

    ${
      isActive(path)
        ? "text-white"
        : "text-slate-400 hover:text-white"
    }
  `;

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-500

        ${
          isScrolled
            ? `
              border-b
              border-white/[0.08]
              bg-slate-950/65
              shadow-[0_12px_45px_rgba(2,6,23,0.22)]
              backdrop-blur-2xl
            `
            : `
              bg-transparent
            `
        }
      `}
    >
      {/* =====================================================
          AMBIENT NAVBAR GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-24
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-[18%]
            top-[-5rem]
            h-32
            w-64
            rounded-full
            bg-cyan-400/[0.06]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[20%]
            top-[-6rem]
            h-36
            w-72
            rounded-full
            bg-violet-500/[0.055]
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          flex
          h-[82px]
          max-w-[1440px]
          items-center
          justify-between
          gap-8
          px-6
          lg:px-10
          xl:px-12
        "
      >
        {/* =====================================================
            BRAND
        ====================================================== */}

        <Link
          to="/"
          className="
            group
            flex
            shrink-0
            items-baseline
            gap-3
          "
        >
          <span
            className="
              text-xl
              font-black
              tracking-[0.12em]
              text-white
              transition-colors
              duration-300
              group-hover:text-slate-100
              sm:text-2xl
              lg:text-[27px]
            "
          >
            CENTA
          </span>

          <span
            className="
              text-xl
              font-black
              tracking-[0.12em]
              text-cyan-400
              transition-colors
              duration-300
              group-hover:text-cyan-300
              sm:text-2xl
              lg:text-[27px]
            "
          >
            LIMITED
          </span>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav
          className="
            hidden
            h-full
            items-center
            gap-8
            lg:flex
          "
        >
          {/* HOME */}

          <Link
            to="/"
            className={navLinkClass("/")}
          >
            Home

            {isActive("/") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.8)]
                "
              />
            )}
          </Link>

          {/* ARTICLES */}

          <Link
            to="/articles"
            className={navLinkClass("/articles")}
          >
            Articles

            {isActive("/articles") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.8)]
                "
              />
            )}
          </Link>

          {/* APPROACH */}

          <Link
            to="/approach"
            className={navLinkClass("/approach")}
          >
            Approach

            {isActive("/approach") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.8)]
                "
              />
            )}
          </Link>

          {/* TEAM */}

          <Link
            to="/team"
            className={navLinkClass("/team")}
          >
            Team

            {isActive("/team") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.8)]
                "
              />
            )}
          </Link>

          {/* =================================================
              SERVICES
          ================================================== */}

          <button
            type="button"
            onClick={handleServicesClick}
            className="
              flex
              h-full
              items-center
              border-0
              bg-transparent
              p-0
              text-[13px]
              font-semibold
              tracking-[-0.01em]
              text-slate-400
              transition-colors
              duration-200
              hover:text-white
            "
          >
            Services
          </button>

          {/* ABOUT */}

          <a
            href="/#about"
            className="
              flex
              h-full
              items-center
              text-[13px]
              font-semibold
              tracking-[-0.01em]
              text-slate-400
              transition-colors
              duration-200
              hover:text-white
            "
          >
            About
          </a>

         
         {/* FAQ */}

          <a
            href="/#faq"
            className="
              flex
              h-full
              items-center
              text-[13px]
              font-semibold
              tracking-[-0.01em]
              text-slate-400
              transition-colors
              duration-200
              hover:text-white
            "
          >
            FAQ
          </a>
        </nav>

      
    {/* CONTACT US */}

<a
  href="/#contact"
  className="
    flex
    h-full
    items-center
    text-[13px]
    font-semibold
    tracking-[-0.01em]
    text-slate-400
    transition-colors
    duration-200
    hover:text-white
  "
>
  Contact Us
</a>
      
      
        {/* =====================================================
            CTA
        ====================================================== */}

        <a
          href="/#contact"
          className="
            group
            hidden
            items-center
            gap-2.5
            rounded-2xl
            border
            border-cyan-300/20
            bg-gradient-to-r
            from-cyan-300
            via-cyan-200
            to-sky-300
            px-5
            py-3
            text-[11px]
            font-black
            tracking-wide
            text-slate-950
            shadow-[0_8px_30px_rgba(34,211,238,0.12)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_12px_40px_rgba(34,211,238,0.22)]
            lg:inline-flex
          "
        >
          Let's Work Together

          <ArrowRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </a>

        {/* =====================================================
            MOBILE BUTTON
        ====================================================== */}

        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={() =>
            setMobileMenuOpen((open) => !open)
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.09]
            bg-white/[0.045]
            text-slate-300
            shadow-[0_8px_25px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-cyan-300/20
            hover:bg-cyan-300/[0.06]
            hover:text-white
            lg:hidden
          "
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-white/[0.07]
          bg-slate-950/90
          shadow-[0_20px_60px_rgba(2,6,23,0.3)]
          backdrop-blur-2xl
          transition-all
          duration-300
          lg:hidden

          ${
            mobileMenuOpen
              ? "max-h-[520px] opacity-100"
              : "max-h-0 border-t-transparent opacity-0"
          }
        `}
      >
        <nav
          className="
            mx-auto
            flex
            max-w-[1440px]
            flex-col
            gap-1.5
            px-6
            py-5
          "
        >
          {/* HOME */}

          <Link
            to="/"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            Home
          </Link>

          {/* ARTICLES */}

          <Link
            to="/articles"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            Articles
          </Link>

          {/* APPROACH */}

          <Link
            to="/approach"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            Approach
          </Link>

          {/* TEAM */}

          <Link
            to="/team"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            Team
          </Link>

          {/* =================================================
              SERVICES
          ================================================== */}

          <button
            type="button"
            onClick={handleServicesClick}
            className="
              rounded-2xl
              px-4
              py-3.5
              text-left
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            Services
          </button>

          {/* ABOUT */}

          <a
            href="/#about"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            About
          </a>

          {/* FAQ */}

          <a
            href="/#faq"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-300
              transition-all
              hover:bg-white/[0.045]
              hover:text-white
            "
          >
            FAQ
          </a>

         
         
         {/* CONTACT US */}

<a
  href="/#contact"
  className="
    rounded-2xl
    px-4
    py-3.5
    text-sm
    font-semibold
    text-slate-300
    transition-all
    hover:bg-white/[0.045]
    hover:text-white
  "
>
  Contact Us
</a>
         
          {/* CTA */}

          <a
            href="/#contact"
            className="
              mt-2
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-cyan-300
              to-sky-300
              px-4
              py-3.5
              text-sm
              font-black
              text-slate-950
              shadow-[0_10px_35px_rgba(34,211,238,0.12)]
              transition-all
              hover:shadow-[0_12px_40px_rgba(34,211,238,0.2)]
            "
          >
            Let's Work Together

            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}