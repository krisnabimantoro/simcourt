import LoginForm from "./components/login-form-admin";

export default function admin() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginForm tittleCard={"Login Simucourt Admin"} />
    </div>
  );
}
