import { ReactElement } from "react";
import LoginForm from "@/components/ui/loginForm";

const AuthPage = async (): Promise<ReactElement> => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default AuthPage;
