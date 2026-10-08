import React, { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/auth.service";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    toast.error("Isi semua kolom!");
    return;
  }

  try {
    const response = await loginService({
      email,
      password,
    });

    if (response.data.mfaRequired) {
      sessionStorage.setItem(
        "mfaUser",
        JSON.stringify(response.data.user)
      );

      toast.success(
        "Password benar. Verifikasi MFA."
      );

      navigate("/login/mfa");

      return;
    }

    toast.error(
      "MFA diperlukan."
    );
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ??
        "Email atau password salah."
    );
  }
};

  const handleForgotPassword = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      toast.error(
        "Harap masukkan email."
      );
      return;
    }

    toast(
      "Fitur reset password belum tersedia.",
      {
        icon: "ℹ️",
      }
    );

    setForgotEmail("");
    setIsForgotOpen(false);
  };

  return (
    <div
      className="
        fixed
        inset-0
        overflow-hidden
        flex
        items-center
        justify-center
        p-6
        bg-[#030712]
      "
    >
      {/* Background */}
      <div className="absolute inset-0">

        {/* Main Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-slate-950
            via-[#071220]
            to-black
          "
        />

        {/* Cyber Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[linear-gradient(rgba(0,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,.08)_1px,transparent_1px)]
            bg-[size:45px_45px]
          "
        />

        {/* Scanline */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[linear-gradient(transparent_50%,rgba(0,255,255,.04)_50%)]
            bg-[length:100%_4px]
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[420px]">

        {/* Login Card */}
        <div
          className="
            w-full
            rounded-3xl
            border
            border-white/10
            bg-white/10
            p-8
            shadow-2xl
            backdrop-blur-xl
          "
        >

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              mb-8
              flex
              items-center
              gap-2
              text-sm
              text-gray-400
              transition
              hover:text-blue-400
            "
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </button>

          {/* Header */}
          <div className="mb-10 text-center">

            <h1
              className="
                text-4xl
                font-black
                tracking-wide
                text-white
              "
            >
              Security Lab
            </h1>

            <p
              className="
                mt-3
                text-sm
                text-gray-400
              "
            >
              Secure Admin Dashboard
            </p>

          </div>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="
              flex
              flex-col
              gap-5
            "
          >

            {/* Email */}
            <div>

              <label
                className="
                  text-xs
                  font-semibold
                  text-gray-300
                "
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@centa.local"
                autoComplete="username"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/40
                  px-4
                  py-3
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-blue-500
                "
                required
              />

            </div>

            {/* Password */}
            <div>

              <label
                className="
                  text-xs
                  font-semibold
                  text-gray-300
                "
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Masukkan password"
                autoComplete="current-password"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/40
                  px-4
                  py-3
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-blue-500
                "
                required
              />

            </div>

            {/* Remember + Forgot */}
            <div
              className="
                flex
                items-center
                justify-between
                text-xs
              "
            >

              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-400
                "
              >

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(
                      e.target.checked
                    )
                  }
                />

                Ingat saya

              </label>

              <button
                type="button"
                onClick={() =>
                  setIsForgotOpen(true)
                }
                className="
                  text-blue-400
                  transition
                  hover:text-blue-300
                "
              >
                Lupa password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                mt-3
                w-full
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-blue-900/40
                transition
                hover:from-blue-500
                hover:to-purple-500
              "
            >
              Login
            </button>

          </form>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/60
            p-6
            backdrop-blur-sm
          "
        >

          <div
            className="
              relative
              w-full
              max-w-md
              rounded-2xl
              border
              border-white/10
              bg-gray-900
              p-8
              shadow-2xl
            "
          >

            {/* Close */}
            <button
              type="button"
              onClick={() =>
                setIsForgotOpen(false)
              }
              className="
                absolute
                right-5
                top-5
                text-gray-400
                transition
                hover:text-white
              "
            >
              <X size={18} />
            </button>

            <h2
              className="
                mb-5
                text-xl
                font-bold
                text-white
              "
            >
              Reset Password
            </h2>

            <form
              onSubmit={handleForgotPassword}
              className="
                flex
                flex-col
                gap-4
              "
            >

              <input
                type="email"
                value={forgotEmail}
                onChange={(e) =>
                  setForgotEmail(
                    e.target.value
                  )
                }
                placeholder="admin@centa.local"
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-black/40
                  px-4
                  py-3
                  text-white
                  outline-none
                "
                required
              />

              <button
                type="submit"
                className="
                  rounded-xl
                  bg-blue-600
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                Kirim Link Reset
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Login;