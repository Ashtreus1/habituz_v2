'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect }from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return { error: "Email and password must be provided" };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: "Email and password must be provided" };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signInOAuth(){

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams : {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: "http://localhost:3000/auth/callback",
    },
  })

  if(data.url)
    redirect(data.url);

  if(error)
    console.error("OAuth Error: " + error);
}