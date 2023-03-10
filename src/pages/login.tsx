import Head from "next/head";
import { CiLogin } from "react-icons/ci";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import styles from "@/styles/Home.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { signIn } = useAuthContext();

  const router = useRouter();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("Email é um campo necessário!"),
    password: yup.string().required("Senha é um campo necessário!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signIn(data);
  };

  return (
    <>
      <Head>
        <title>Auth Patterns</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.register}>
            <span>Fazer login</span>
          </div>

          <input
            type="text"
            {...register("email")}
            id="email"
            placeholder="Digite o seu e-mail"
          />
          <small className={"inputError"}>{errors.email?.message}</small>

          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Digite a sua senha"
          />
          <small className={"inputError"}>{errors.password?.message}</small>

          <div className={styles.register}>
            <span>
              Não possui uma conta?{" "}
              <Link href={"/register"}>
                <strong>CRIAR</strong>
              </Link>
            </span>
          </div>

          <PrimaryButton
            type="submit"
            icon={CiLogin}
            text="Entrar"
            className={styles.button}
          ></PrimaryButton>
        </form>
      </main>
    </>
  );
}
