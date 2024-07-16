import { Header } from '@/components/layout/header';
import VerticalScroll from '@/components/layout/vertical-scroll';
import GlobalStore from '@/context';
import { getSession } from '@/lib/session';
import { SideBar } from '@/components/layout/sidebar';


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if(!session){
    return <h2>User Not Login</h2>
  }
  return (
    <GlobalStore>
      <div className="min-h-screen w-full">
        <Header />
        <SideBar />
        <VerticalScroll>
          <main className="main-dashboard">            
            {children}
          </main>
        </VerticalScroll>
      </div>
    </GlobalStore>
  );
}
