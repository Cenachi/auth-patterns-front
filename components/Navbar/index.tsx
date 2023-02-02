import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className={styles.container}>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </nav>
  );
};
