import styles from "./login.module.css";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.login}>
      <div className={styles.forms}>{children}</div>
    </div>
  );
};

export default LoginLayout;
