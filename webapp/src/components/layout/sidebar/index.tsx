import { Logo } from "../header"
import MainScroll from "../vertical-scroll"
import { Navigation } from "../navigation"

const SideBar = () => {
  return <div className="hidden lg:flex bg-white w-64 shadow-xl fixed top-0 left-0 h-[100dvh] z-40">
    <div className="w-full flex flex-col items-center">
      <Logo href="/dashboard" className="flex py-5" />
      <MainScroll>
        <Navigation />
      </MainScroll>      
    </div>
  </div>
}
export {
  SideBar
}