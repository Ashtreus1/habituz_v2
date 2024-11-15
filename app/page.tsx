import AuthDialog from "@/components/auth-dialog";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="absolute fixed top-10 right-10 rounded-full p-3">
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold dark:text-gray-200 text-gray-800 mb-5">
          Tick your habit with 
          <span className="text-cyan-300"> Habitus</span>
        </h1>
        <h3 className="text-2xl text-gray-600 font-semibold mb-5">Set clear habit and execute it!</h3>
        <AuthDialog/>
      </div>
    </div>  
  );
}
