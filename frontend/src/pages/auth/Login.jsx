import Card from "../../components/ui/Card";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <Card className="p-8">
      <LoginHeader />
      <LoginForm />
    </Card>
  );
};

export default Login;