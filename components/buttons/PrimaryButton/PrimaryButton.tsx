import { ButtonHTMLAttributes, forwardRef, LegacyRef } from "react";
import { IconType } from "react-icons/lib";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: IconType;
}

export const PrimaryButton = forwardRef(
  (props: ButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    return (
      <button type={props.type} ref={ref} className={styles.button}>
        {props.icon && <props.icon className={styles.icon} size={24} />}
        <div className={styles.text}>{props.text}</div>
      </button>
    );
  }
);

PrimaryButton.displayName = "Primary button";
