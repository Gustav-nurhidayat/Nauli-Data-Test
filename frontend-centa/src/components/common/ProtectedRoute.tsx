import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {
  const {
    authenticated,
    loading,
  } = useAuth();

  /**
   * Jangan redirect sebelum
   * pengecekan cookie selesai.
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060a12] text-white">
        Loading...
      </div>
    );
  }

  /**
   * Belum punya adm_sess
   */
  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}