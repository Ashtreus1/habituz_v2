import AuthForm from '@/components/client/auth-form';
import { login } from '@/app/action';

export default function LoginPage() {
  return <AuthForm heading="Login" onSubmit={login} />
}
