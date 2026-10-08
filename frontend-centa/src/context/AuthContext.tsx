import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getProfile } from "../services/auth.service";

import type { AuthUser } from "../types/auth";

type AuthContextType = {
  user: AuthUser | null;
  authenticated: boolean;
  loading: boolean;

  completeLogin: (newUser: AuthUser) => Promise<void>;

  logout: () => void;

  refreshProfile: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [authenticated, setAuthenticated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  /**
   * Dipanggil setelah MFA berhasil.
   *
   * Backend sudah membuat cookie:
   * adm_sess
   *
   * Jadi frontend tidak perlu menyimpan token.
   */
  const completeLogin = async () => {
  const response = await getProfile();

  setUser(response.data);
  setAuthenticated(true);

  localStorage.setItem("user", JSON.stringify(response.data));
};
  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("mfaUser");

    setUser(null);
    setAuthenticated(false);
  };

  /**
   * Ambil profile menggunakan cookie adm_sess.
   */
  const refreshProfile = async (): Promise<void> => {
    const response = await getProfile();

    setUser(response.data);
    setAuthenticated(true);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );
  };

  /**
   * Saat aplikasi pertama kali dibuka.
   *
   * Kalau browser masih punya adm_sess,
   * /auth/profile akan berhasil.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshProfile();
      } catch (error) {
        console.log(
          "Belum authenticated."
        );

        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        completeLogin,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}