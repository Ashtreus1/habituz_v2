'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { StickyNote } from 'lucide-react';

import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

import { items } from '@/data/sidebar-data';

import Image from 'next/image';

export default function SidebarApp(){

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      console.log(data);

      if(error){
      	console.error('Error fetching data: ', error);
      	return;
      }

      if(data?.user){
      	setUserEmail(data.user.email);
      	setAvatar(data.user.user_metadata.avatar_url);
      }else{
      	console.log("User not found");
      }
    };

    fetchUser();
  }, []);
  
  const handleSignout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(res.ok)
        router.push("/login");
    } catch(error) {
      console.log('Signout error: ', error);
    } finally {
    	setIsLoading(false);
    }
  }


	return(
		<Sidebar>
	       <SidebarHeader>
	        <div>
	        	{ userEmail ? (
	        		<div className="flex items-center gap-3">
	        			<Image
	        				src={avatar}
	        				width={24}
	        				height={24}
	        				alt="Profile pic"
	        				className="rounded-full"
	        			/>
	        			<span>{userEmail}</span>
	        		</div>
	        	): (
	        		<Skeleton className="w-full h-[20px] rounded-full"/>
	        	)}
	        </div>
	        <SidebarGroupLabel>Home</SidebarGroupLabel>
	        <SidebarMenuButton asChild>
	          <Link href="/dashboard">
	            <StickyNote/>
	            <span>Habits</span>
	          </Link>
	        </SidebarMenuButton>
	       </SidebarHeader>
	       <SidebarContent>
	         <SidebarGroup>
	          <SidebarGroupLabel>Settings</SidebarGroupLabel>
	          <SidebarGroupContent>
	            <SidebarMenu>
	              {items.map((item) => (
	                <SidebarMenuItem key={item.title}>
	                  <SidebarMenuButton asChild>
	                    <Link href={item.url}>
	                      <item.icon />
	                      <span>{item.title}</span>
	                    </Link>
	                  </SidebarMenuButton>
	                </SidebarMenuItem>
	              ))}
	            </SidebarMenu>
	          </SidebarGroupContent> 
	         </SidebarGroup>
	       </SidebarContent>
	       <SidebarFooter>
	        <form onSubmit={handleSignout}>  
	          <Button 
	           variant="default"
	           size="lg"
	           className="w-full"
	           disabled={isLoading}>
	            {isLoading ? "Signing out..." : "Sign out"}
	          </Button>
	        </form>
	       </SidebarFooter>
	     </Sidebar>
	)
}