export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-cyan-400/20
                bg-cyan-400/10
                text-cyan-400
                font-bold
              ">
                C
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-[0.3em] text-white">
                  CENTA
                </h3>
                <p className="text-[10px] tracking-[0.35em] text-white/40">
                  LIMITED
                </p>
              </div>
            </div>


            <p className="
              mt-6
              max-w-md
              text-sm
              leading-7
              text-white/50
            ">
              Software engineering, web & application development,
              infrastructure, dan cyber security untuk membantu bisnis
              membangun teknologi yang modern, reliable, dan secure.
            </p>


            <p className="
              mt-6
              text-xs
              uppercase
              tracking-[0.25em]
              text-cyan-400/70
            ">
              Build. Secure. Scale.
            </p>
          </div>


          {/* Company */}
          <div>
            <h4 className="
              text-xs
              font-semibold
              tracking-[0.25em]
              text-white
            ">
              COMPANY
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-white/50">
              <li>
                <a href="/about" className="hover:text-cyan-400">
                  About
                </a>
              </li>

              <li>
                <a href="/approach" className="hover:text-cyan-400">
                  Approach
                </a>
              </li>

              <li>
                <a href="/team" className="hover:text-cyan-400">
                  Team
                </a>
              </li>

              <li>
                <a href="/faq" className="hover:text-cyan-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>


          {/* Services */}
          <div>
            <h4 className="
              text-xs
              font-semibold
              tracking-[0.25em]
              text-white
            ">
              SERVICES
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-white/50">
              <li className="hover:text-cyan-400 cursor-pointer">
                Software Development
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Web & Application
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Cyber Security
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Infrastructure
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Security Advisory
              </li>
            </ul>
          </div>

        </div>


        {/* Divider */}
        <div className="
          my-10
          h-px
          bg-white/10
        " />


        {/* Bottom */}
        <div className="
          flex
          flex-col
          gap-4
          text-xs
          text-white/40
          md:flex-row
          md:items-center
          md:justify-between
        ">

          <p>
            © 2026 Centa Limited. All rights reserved.
          </p>


          <div className="flex gap-6">
            <a
              href="mailto:info@centalimited.com"
              className="hover:text-cyan-400"
            >
              info@centalimited.com
            </a>

            <span>
              Indonesia
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}