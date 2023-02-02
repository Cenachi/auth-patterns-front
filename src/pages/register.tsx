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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { isAuthenticated, signIn, signUp } = useAuthContext();
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required("O nome de usuario é necessário"),
    email: yup
      .string()
      .email("Email inválido")
      .required("Email é um campo necessário!"),
    password: yup
      .string()
      .min(8, "A senha deve ter um mínimo de 8 caracteres")
      .max(32, "A senha deve ter um máximo de 32 caracteres")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Senha incorreta!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      signUp(data.name, data.email, data.password);
      router.push("/");
    } catch (e) {
      console.log("Erro", e);
    }
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
            <span>Faça seu registro</span>
          </div>

          <input
            type="text"
            {...register("name")}
            id="name"
            placeholder="Digite o seu nome"
          />
          <small className={"inputError"}>{errors.name?.message}</small>

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

          <input
            type="password"
            {...register("confirmPassword")}
            id="confirmPassword"
            placeholder="Confirme a sua senha"
          />
          <small className={"inputError"}>
            {errors.confirmPassword?.message}
          </small>

          <div className={styles.register}>
            <Link href={"/login"}>
              Já possui uma conta? <strong>ENTRAR</strong>
            </Link>
          </div>

          <PrimaryButton
            type="submit"
            icon={CiLogin}
            text="Criar"
            className={styles.button}
          ></PrimaryButton>
        </form>
      </main>
    </>
  );
}
