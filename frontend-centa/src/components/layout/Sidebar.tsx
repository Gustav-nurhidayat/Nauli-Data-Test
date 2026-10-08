import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  BriefcaseBusiness,
  Mail,
  UsersRound,
  Building2,
  Settings2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

 const menuGroups = [
  {
    label: "Main",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Content",
    items: [
      {
        name: "Articles",
        path: "/dashboard/articles",
        icon: FileText,
      },
      {
        name: "Categories",
        path: "/dashboard/categories",
        icon: FolderOpen,
      },
      {
        name: "Services",
        path: "/dashboard/services",
        icon: BriefcaseBusiness,
      },
      {
        name: "Feedback",
        path: "/dashboard/contacts",
        icon: Mail,
      },
      {
        name: "Team",
        path: "/dashboard/team",
        icon: UsersRound,
      },
      {
        name: "About",
        path: "/dashboard/about",
        icon: Building2,
      },
    ],
  },

  ...(isSuperAdmin
    ? [
        {
          label: "System",
          items: [
            {
              name: "User Management",
              path: "/dashboard/users",
              icon: UsersRound,
            },
            {
              name: "Settings",
              path: "/dashboard/settings",
              icon: Settings2,
            },
          ],
        },
      ]
    : []),
];
  const handleLogout = () => {
    logout();
  };

  return (
<aside
  className="
    sticky
    top-0
    h-screen
    w-[260px]
    shrink-0
    overflow-hidden

    border-r
    border-slate-200/70
    bg-white

    dark:border-white/[0.06]
    dark:bg-[#070b14]
  "
>
      {/* Background Decoration */}
      <div
        className="
          pointer-events-none
          absolute
          top-0
          right-0
          w-40
          h-40
          rounded-full
          bg-blue-500/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-20
          left-0
          w-32
          h-32
          rounded-full
          bg-indigo-500/20
          blur-3xl
        "
      />

     <div className="relative z-10 flex h-full flex-col">
        {/* Logo / Branding */}
        <div
  className="
    flex
    h-[72px]
    shrink-0
    items-center
    border-b
    border-slate-200/70
    px-5
    dark:border-white/[0.06]
  "
>
          <div>
            <div
              className="
                text-2xl
                font-extrabold
                tracking-tight

                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              Secure Admin
            </div>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Management System
            </p>
          </div>
        </div>

       

      {/* Navigation */}
<nav
  className="
    flex-1
    overflow-y-auto
    px-3
    py-5
  "
>
  <div className="space-y-10">
    {menuGroups.map((group) => (
      <div key={group.label}>
        {/* Group Title */}
        <p
          className="
            mb-2
            px-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-slate-400
            dark:text-slate-500
          "
        >
          {group.label}
        </p>

        {/* Group Menu */}
        <div className="space-y-2">
          {group.items.map((menu) => {
            const Icon = menu.icon;

            return (
            <NavLink
  key={menu.path}
  to={menu.path}
  end={menu.path === "/dashboard"}
  className={({ isActive }) =>
    `
    group
    relative
    flex
    items-center
    gap-3
    rounded-lg
    px-3
    py-2.5

    text-sm
    font-medium

    transition-all
    duration-200

    ${
      isActive
        ? `
          bg-blue-500/[0.08]
          text-blue-600
          shadow-[inset_0_0_0_1px_rgba(59,130,246,0.10)]

          dark:bg-blue-400/[0.08]
          dark:text-blue-400
        `
        : `
          text-slate-600
          dark:text-slate-400

          hover:bg-slate-100/80
          hover:text-slate-900

          dark:hover:bg-white/[0.04]
          dark:hover:text-white
        `
    }
    `
  }
>
  {({ isActive }) => (
    <>
      {isActive && (
        <span
          className="
            absolute
            left-0
            top-1/2
            h-5
            w-0.5
            -translate-y-1/2
            rounded-full
            bg-blue-500
            dark:bg-blue-400
          "
        />
      )}

      <Icon
        size={17}
        strokeWidth={2}
        className="
          shrink-0
          transition-transform
          duration-200
          group-hover:scale-105
        "
      />

      <span className="truncate">
        {menu.name}
      </span>
    </>
  )}
</NavLink>
            );
          })}
        </div>
      </div>
    ))}
  </div>
</nav>

        {/* User Footer */}
        <div
          className="
            shrink-0
            border-t
            border-slate-200
            dark:border-slate-800
            p-4
          "
        >
          <div className="flex items-center gap-3 px-2">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full

                bg-blue-500/10
                text-blue-600
                dark:text-blue-400
              "
            >
              <ShieldCheck size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-xs
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {user?.name || "Admin Centa"}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {isSuperAdmin
                  ? "Super Admin"
                  : "Administrator"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500/10
              px-3
              py-2.5

              text-xs
              font-semibold
              text-red-500

              transition-all
              duration-200

              hover:border-red-500/20
              hover:bg-red-500/10
            "
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
