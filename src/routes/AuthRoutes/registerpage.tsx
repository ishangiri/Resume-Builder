import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '../../components/RegisterForm'
function RouteComponent() {
  return <div>
    <RegisterForm />
    </div>
}




export const Route = createFileRoute('/AuthRoutes/registerpage')({
  component: RouteComponent,
})
