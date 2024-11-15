'use client'

import { redirect } from 'next/navigation'

import HabitList from '@/components/client/habit-list';


import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { useFetchUser } from '@/hooks/useFetch';

export default function DashboardPage() {

  const queryClient = new QueryClient();

  return(
    <QueryClientProvider client={queryClient}>
      <DashboardComponent/>
    </QueryClientProvider>
  )
}

function DashboardComponent(){

  const { error: userError } = useFetchUser();

  if(userError)
    redirect('/login')

  return(
    <>
      <HabitList/>
    </>
  )
}
