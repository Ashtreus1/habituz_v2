import AuthForm from '@/components/client/auth-form';
import { signup } from '@/app/action';

export default function RegisterPage() {
  return <AuthForm heading="Register" onSubmit={signup}/> 
}
