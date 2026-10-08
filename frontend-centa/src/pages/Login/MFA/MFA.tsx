import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { verifyMfa } from "../../../services/auth.service";
import { useAuth } from "../../../context/AuthContext";

export default function MFA() {
  const navigate = useNavigate();

  const { completeLogin } = useAuth();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  /*
   * User sementara disimpan saat login
   * sebelum MFA berhasil.
   */
  const storedUser =
    sessionStorage.getItem("mfaUser");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  /*
   * Jangan panggil navigate() langsung
   * saat render.
   */
  useEffect(() => {
    if (!user) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [user, navigate]);

  /*
   * Tunggu redirect kalau mfaUser tidak ada.
   */
  if (!user) {
    return null;
  }

  const handleVerify = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!code.trim()) {
    toast.error("Masukkan kode MFA.");
    return;
  }

  if (code.length !== 4) {
    toast.error("Kode MFA harus 4 digit.");
    return;
  }

  try {
    setLoading(true);

    console.log("MFA: VERIFY START");

    await verifyMfa({
      userId: user.id,
      email: user.email,
      role: user.role,
      code,
    });

    console.log("MFA: VERIFY SUCCESS");

    await completeLogin(user);

    console.log("MFA: AUTH COMPLETE");

    sessionStorage.removeItem("mfaUser");

    toast.success("MFA berhasil. Selamat datang.");

    /*
     * Beri React waktu untuk commit:
     * authenticated = true
     */
    setTimeout(() => {
      console.log("MFA: REDIRECT DASHBOARD");
      navigate("/dashboard", {
        replace: true,
      });
    }, 100);

  } catch (error: any) {
    console.error("MFA ERROR:", error);

    toast.error(
      error?.response?.data?.message ??
        "Kode MFA salah."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="
        fixed
        inset-0
        flex
        items-center
        justify-center
        bg-[#030712]
        p-6
      "
    >

      {/* Background */}
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

      {/* Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-[420px]
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-8
          shadow-2xl
          backdrop-blur-xl
        "
      >

        {/* Header */}
        <div className="mb-8 text-center">

          <h1
            className="
              text-3xl
              font-black
              tracking-wide
              text-white
            "
          >
            MFA VERIFICATION
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-gray-400
            "
          >
            Additional authentication required
          </p>

          <p
            className="
              mt-2
              text-xs
              text-gray-500
            "
          >
            {user.email}
          </p>

        </div>

        {/* MFA Form */}
        <form
          onSubmit={handleVerify}
          className="
            flex
            flex-col
            gap-5
          "
        >

          {/* Code */}
          <div>

            <label
              className="
                text-xs
                font-semibold
                text-gray-300
              "
            >
              Verification Code
            </label>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              value={code}
              onChange={(e) =>
                setCode(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Enter MFA code"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                text-center
                text-xl
                tracking-[0.5em]
                text-white
                outline-none
                transition
                focus:border-blue-500
              "
              autoFocus
            />

          </div>

          {/* Verify */}
          <button
            type="submit"
            disabled={
              loading ||
              code.length !== 4
            }
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              py-3.5
              font-semibold
              text-white
              transition
              hover:from-blue-500
              hover:to-purple-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Verifying..."
              : "Verify MFA"}
          </button>

        </form>

        {/* Back */}
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(
              "mfaUser"
            );

            navigate("/login", {
              replace: true,
            });
          }}
          className="
            mt-5
            w-full
            text-center
            text-xs
            text-gray-500
            transition
            hover:text-gray-300
          "
        >
          Back to login
        </button>

      </div>
    </div>
  );
}