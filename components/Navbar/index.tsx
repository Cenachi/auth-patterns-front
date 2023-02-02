import React from "react";
import styles from "../../components/buttons/PrimaryButton/button.module.scss";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.button}>
        <Link href={"/login"}>Login/Register</Link>
      </div>
    </nav>
  );
};
