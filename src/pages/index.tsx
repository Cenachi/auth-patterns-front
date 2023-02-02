import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { Navbar } from "../../components/Navbar";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
  password: string;
};

export default function Home() {
  const { isAuthenticated, logout, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>Auth Patterns</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div>{user.name}</div>
        <button onClick={logout}>Logout</button>
      </main>
    </>
  );
}
