import { 
  SidebarProvider, 
  SidebarTrigger
} from '@/components/ui/sidebar';

import SidebarApp from '@/components/client/sidebar-app';

export default function Layout({ children } : { children : React.ReactNode }){

  return(
    <SidebarProvider defaultOpen={false}>
     <SidebarApp/>
     <SidebarTrigger/> 
     <main className="min-h-screen flex flex-col p-10 w-full"> 
      {children}
     </main>
    </SidebarProvider>
  );
}
