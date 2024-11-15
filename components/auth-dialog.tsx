import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Link from 'next/link';

import { signInOAuth } from '@/app/action'

export default function AuthDialog(){
  
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Get Started
        </Button>
      </DialogTrigger> 
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authorized account</DialogTitle>
          <DialogDescription>
           Sign in for existing account and sign up to register account
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center w-full gap-5">
            <Link href="/login" className="w-full">
              <Button size="lg" className="w-full">Sign in</Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button size="lg" variant="secondary" className="w-full">Sign up</Button>
            </Link>
            <Button 
              size="lg" 
              className="w-full bg-orange-500 hover:bg-orange-600 transition-colors"
              onClick={signInOAuth}>
              Sign in with Google
            </Button>
        </div>
       </DialogContent>  
     </Dialog>
  );
}
