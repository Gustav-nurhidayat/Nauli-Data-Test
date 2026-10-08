import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import { useAuth } from "../../context/AuthContext";

import {
  updateProfile,
  updatePassword,
  uploadAvatar,
} from "../../services/profile.service";



const getAvatarUrl = (avatar?: string | null) => {
  if (!avatar) return null;

  if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
    return avatar;
  }

  const apiUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api";

  const baseUrl = apiUrl.replace(/\/api\/?$/, "");

  return `${baseUrl}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
};

export default function Settings() {
  const { user, refreshProfile } = useAuth();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] =
    useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] =
    useState("");

  const [avatarError, setAvatarError] = useState("");

  const [preview, setPreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!user) return;

    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setPreview(getAvatarUrl(user.avatar));
  }, [user]);

  const initials = useMemo(() => {
    const value = name.trim();

    if (!value) return "U";

    return value
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }, [name]);

  const passwordStrength = useMemo(() => {
    if (!newPassword) {
      return {
        label: "Belum diisi",
        width: "0%",
      };
    }

    if (newPassword.length < 8) {
      return {
        label: "Lemah",
        width: "33%",
      };
    }

    let score = 1;

    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 1) {
      return {
        label: "Cukup lemah",
        width: "40%",
      };
    }

    if (score === 2) {
      return {
        label: "Sedang",
        width: "60%",
      };
    }

    if (score === 3) {
      return {
        label: "Bagus",
        width: "80%",
      };
    }

    return {
      label: "Kuat",
      width: "100%",
    };
  }, [newPassword]);

  const handleProfileSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setProfileError("");
    setProfileSuccess("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setProfileError(
        "Nama dan email wajib diisi."
      );
      return;
    }

    setProfileLoading(true);

    try {
      await updateProfile(
        trimmedName,
        trimmedEmail
      );

      await refreshProfile();

      setProfileSuccess(
        "Profil berhasil diperbarui."
      );
    } catch (error: any) {
      setProfileError(
        error?.response?.data?.message ||
          error?.message ||
          "Gagal memperbarui profil."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword) {
      setPasswordError(
        "Password saat ini dan password baru wajib diisi."
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "Password baru minimal 8 karakter."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "Konfirmasi password tidak cocok."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "Password baru harus berbeda dari password saat ini."
      );
      return;
    }

    setPasswordLoading(true);

    try {
      await updatePassword(
        currentPassword,
        newPassword
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordSuccess(
        "Password berhasil diubah."
      );
    } catch (error: any) {
      setPasswordError(
        error?.response?.data?.message ||
          error?.message ||
          "Gagal mengubah password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError(
        "Foto harus berformat JPG, PNG, atau WEBP."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setAvatarError(
        "Ukuran foto maksimal 2 MB."
      );

      event.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);

    setPreview(localPreview);
    setAvatarLoading(true);

    try {
      await uploadAvatar(file);

      await refreshProfile();
    } catch (error: any) {
      setAvatarError(
        error?.response?.data?.message ||
          error?.message ||
          "Gagal mengupload foto profil."
      );

      setPreview(
        getAvatarUrl(user?.avatar)
      );
    } finally {
      URL.revokeObjectURL(localPreview);
      setAvatarLoading(false);
      event.target.value = "";
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Memuat profil...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Kelola informasi profil dan keamanan akun
          Anda.
        </p>
      </div>

      {/* Profile Card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-white/[0.06] dark:bg-slate-950/50">
        <div className="border-b border-slate-200/70 px-5 py-5 dark:border-white/[0.06] sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Informasi dasar akun Anda.
          </p>
        </div>

        <form
          onSubmit={handleProfileSubmit}
          className="p-5 sm:p-6"
        >
          {/* Avatar */}
          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/[0.08] dark:bg-slate-900">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">
                    {initials}
                  </span>
                )}
              </div>

              {avatarLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Foto Profil
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                JPG, PNG, atau WEBP. Maksimal 2 MB.
              </p>

              <button
                type="button"
                disabled={avatarLoading}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="mt-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.07]"
              >
                {avatarLoading
                  ? "Uploading..."
                  : "Change Photo"}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />

              {avatarError && (
                <p className="mt-2 text-sm text-red-500">
                  {avatarError}
                </p>
              )}
            </div>
          </div>

          {/* Profile Messages */}
          {profileError && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {profileError}
            </div>
          )}

          {profileSuccess && (
            <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
              {profileSuccess}
            </div>
          )}

          {/* Fields */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="settings-name"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Name
              </label>

              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                disabled={profileLoading}
                placeholder="Nama Anda"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="settings-email"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </label>

              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={profileLoading}
                placeholder="email@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="settings-role"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Role
              </label>

              <input
                id="settings-role"
                type="text"
                value={user.role}
                readOnly
                className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-500 outline-none dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-400"
              />

              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                Role hanya dapat diubah melalui User Management.
              </p>
            </div>
          </div>

          {/* Save */}
          <div className="mt-6 flex justify-end border-t border-slate-200/70 pt-5 dark:border-white/[0.06]">
            <button
              type="submit"
              disabled={profileLoading}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {profileLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Security Card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-white/[0.06] dark:bg-slate-950/50">
        <div className="border-b border-slate-200/70 px-5 py-5 dark:border-white/[0.06] sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Security
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Ubah password untuk menjaga keamanan akun.
          </p>
        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="p-5 sm:p-6"
        >
          {passwordError && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
              {passwordSuccess}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {/* Current Password */}
            <div className="md:col-span-2">
              <label
                htmlFor="current-password"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Current Password
              </label>

              <div className="relative">
                <input
                  id="current-password"
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(
                      event.target.value
                    )
                  }
                  disabled={passwordLoading}
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-20 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      (value) => !value
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                >
                  {showCurrentPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="new-password"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  disabled={passwordLoading}
                  autoComplete="new-password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-20 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (value) => !value
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                >
                  {showNewPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              {/* Strength */}
              <div className="mt-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    Password strength
                  </span>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {passwordStrength.label}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{
                      width:
                        passwordStrength.width,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  disabled={passwordLoading}
                  autoComplete="new-password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-20 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              {confirmPassword &&
                newPassword !==
                  confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    Password tidak cocok.
                  </p>
                )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200/70 pt-5 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Minimal 8 karakter. Gunakan kombinasi huruf
              dan angka agar lebih aman.
            </p>

        <button
  type="submit"
  disabled={passwordLoading}
  className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
>
  {passwordLoading ? (
    <>
      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      Updating...
    </>
  ) : (
    "Change Password"
  )}
</button>
          </div>
        </form>
      </section>
    </div>
  );
}