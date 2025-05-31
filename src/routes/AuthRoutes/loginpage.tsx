import { createFileRoute } from "@tanstack/react-router"
import LoginForm from "../../components/LoginForm"


const Login = () => {
   return <div>
    <LoginForm />
   </div>
}



export const Route = createFileRoute('/AuthRoutes/loginpage')({
  component: Login,
})
