import Account from "./account"
import Logo from "./logo"
import MobileMenu from "./mobile-menu"
import Notifications from "./notifications"

const Header = ()=>{
  return <header className="bg-white shadow-md px-4 md:px-7 py-4 md:py-5">
    <nav className="flex justify-between">
      <div className="flex">
        <Logo href="/dashboard" className="flex lg:hidden"/>
      </div>      
      <div className="flex gap-4 items-center">  
        <Notifications />
        <Account />
        <MobileMenu />
      </div>
    </nav>
  </header>
}

export {
  Header,
  Logo,
  MobileMenu,
  Notifications,
  Account
}