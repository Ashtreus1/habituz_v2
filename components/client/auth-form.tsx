"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertTitle,
  AlertDescription,  
} from '@/components/ui/alert';

import { ThemeSwitcher } from "@/components/theme-switcher";

import { AuthFormProps } from '@/data/types';

export default function AuthForm({ heading, onSubmit }: AuthFormProps) {
  
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setErrorMessage(errorMessage);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setisLoading(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const result = await onSubmit(formData);

    if (result.error) {
      setErrorMessage(result.error); 
    } else if (result.success) {
      const redirectPath = heading === 'Login' ? '/dashboard' : 'login';
      router.push(redirectPath); 
    }

    setEmail("");
    setPassword("");
    setisLoading(false);
  };


  return (
    <>
      <div className="absolute fixed top-5 right-5 rounded-full p-3">
        <ThemeSwitcher />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center relative">
        <div className="absolute fixed top-5 w-full px-20 z-1">
          {errorMessage && (
            <Alert className="bg-red-500"> 
              <AlertTitle>Error encountered</AlertTitle>
                <AlertDescription>
                  {errorMessage}  
                </AlertDescription>
              </Alert>
            )}
        </div>  
       <div className="flex flex-col justify-center items-center w-full max-w-lg p-5">

         <h1 className="text-center text-4xl font-bold font-mono mb-5">{heading} Account</h1> 
         <form className="w-full" onSubmit={handleSubmit}>
          <Label htmlFor="email" className="text-lg mb-5">Email</Label>
          <Input 
           type="email" 
           id="email"
           name="email"
           onChange={(e) => setEmail(e.target.value)}
           value={email}
           placeholder="Enter your email" 
           className="mb-5"
           required/>
          <Label htmlFor="password" className="text-lg mb-5">Password</Label>
          <Input 
           type="password" 
           id="password"
           name="password"
           onChange={(e) => setPassword(e.target.value)}
           value={password}
           placeholder="Enter your password" 
           className="mb-5"
           required/>
          <Button 
            formAction={onSubmit}
            disabled={isLoading} 
            className="w-full mb-3" 
            size="lg">
            {isLoading ? 'Authenticating...' : heading}
          </Button>
          
          {heading === 'Login' ? (
            <p className="text-right cursor-pointer text-gray-400">No account?  
              <Link href='/register'>
                <span className="ml-2 underline underline-offset-1 text-gray-300 hover:text-cyan-400 transition-colors">
                  Register here
                </span>
              </Link>
            </p>
            ) : (
             <p className="text-right cursor-pointer text-gray-400">Already have account?  
              <Link href='/login'>
                <span className="ml-2 underline underline-offset-1 text-gray-300 hover:text-cyan-400 transition-colors">
                  Login here
                </span>
              </Link>
             </p>
            )}
          </form>
       </div>
      </div>
    </>
  )
}
