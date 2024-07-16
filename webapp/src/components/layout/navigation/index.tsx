import { Bell, Calendar, Clock, FilePlus, LayoutDashboard, PanelLeft, PieChart, Settings, Sprout,Tractor, LandPlot } from "lucide-react"
import LinkNavigation from "./link"
import SubNavigation from "./sub-navigation";
import { useNavigationStore } from "@/context/navigation";



const Navigation = () => {
  return <nav aria-label="main navigation" className="w-full main-navigation">
    <ul className="pb-8 lg:py-8 px-6 w-full space-y-5">
      <li className="w-full"><LinkNavigation href="/dashboard" active="exact" icon={<LayoutDashboard className="w-6 h-6" />} text={<span>Dashboard</span>} /></li>
      <li className="w-full"><LinkNavigation href="/dashboard/areas" active="exact" icon={<LandPlot className="w-6 h-6" />} text={<span>Areas</span>} /></li>
      <li className="w-full"><LinkNavigation href="/dashboard/tipocultivo" active="exact" icon={<Sprout className="w-6 h-6" />} text={<span>Tipo De Cultivos</span>} /></li>
      <li className="w-full"><LinkNavigation href="/dashboard/tipoflota" active="exact" icon={<Tractor className="w-6 h-6" />} text={<span>Tipo De Flotas</span>} /></li>
      <SubNavigation href="/dashboard/cultivos" icon={<Settings className="w-6 h-6 icon" />} text={<span>Cultivos</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/cultivos/gestionar" active="exact" icon={<Bell className="w-6 h-6" />} text={<span>Gestionar</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/cultivos/incidencias" active="exact" icon={<Calendar className="w-6 h-6" />} text={<span>Incidencias</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/enfermedades" icon={<Settings className="w-6 h-6 icon" />} text={<span>Enfermedades</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/enfermedades/gestionar" active="exact" icon={<Bell className="w-6 h-6" />} text={<span>Gestionar</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/enfermedades/tratamientos" active="exact" icon={<Bell className="w-6 h-6" />} text={<span>Tratamientos</span>} /></li>
        </ul>
      </SubNavigation>
    </ul>
  </nav>



}

export {
  Navigation
}