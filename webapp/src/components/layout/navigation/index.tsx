import { Bell, Calendar, Clock, NotebookText, LayoutDashboard, Pickaxe, BriefcaseBusinessIcon, Wrench, Ban, TreePine, Settings, Sprout,Tractor, LandPlot, Users } from "lucide-react"
import LinkNavigation from "./link"
import SubNavigation from "./sub-navigation";
import { useNavigationStore } from "@/context/navigation";



const Navigation = () => {
  return <nav aria-label="main navigation" className="w-full main-navigation">
    <ul className="pb-8 lg:py-8 px-6 w-full space-y-5">
      <li className="w-full"><LinkNavigation href="/dashboard" active="exact" icon={<LayoutDashboard className="w-6 h-6" />} text={<span>Dashboard</span>} /></li>
      <SubNavigation href="/dashboard/areas" icon={<LandPlot className="w-6 h-6 icon" />} text={<span>Areas</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/areas" active="exact" icon={<Settings className="w-6 h-6 " />} text={<span>Gestionar Areas</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/areas/incidencias" active="exact" icon={<Ban className="w-6 h-6" />} text={<span>Gestionar Incidencias</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/flota" icon={<Tractor className="w-6 h-6 icon" />} text={<span>Flotas</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/flota" active="exact" icon={<Settings className="w-6 h-6 " />} text={<span>Gestionar Flotas</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/flota/tipoflota" active="exact" icon={<Wrench className="w-6 h-6" />} text={<span>Tipo de Flotas</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/trabajador" icon={<Users className="w-6 h-6 icon" />} text={<span>Trabajadores</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/trabajador" active="exact" icon={<Users className="w-6 h-6 " />} text={<span>Gestionar Trabajadores</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/trabajador/gestionaroficina" active="exact" icon={<BriefcaseBusinessIcon className="w-6 h-6" />} text={<span>Gestionar Personal De Oficina</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/trabajador/gestionaragricola" active="exact" icon={<Pickaxe className="w-6 h-6" />} text={<span>Gestionar Personal Agricola</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/cultivos" icon={<TreePine className="w-6 h-6 icon" />} text={<span>Cultivos</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/cultivos/gestionar" active="exact" icon={<Settings className="w-6 h-6" />} text={<span>Gestionar</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/cultivos/tipocultivo" active="exact" icon={<Sprout className="w-6 h-6" />} text={<span>Tipo De Cultivos</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/enfermedades" icon={<Settings className="w-6 h-6 icon" />} text={<span>Enfermedades</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/enfermedades/gestionar" active="exact" icon={<Bell className="w-6 h-6" />} text={<span>Gestionar</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/enfermedades/tratamientos" active="exact" icon={<Bell className="w-6 h-6" />} text={<span>Tratamientos</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/reportes" icon={<NotebookText className="w-6 h-6 icon" />} text={<span>Reportes</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/cultivo-responsable" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Cultivo por Responsable</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/flota-estado" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Flota por Estado</span>} /></li>
        </ul>
      </SubNavigation>
    </ul>
  </nav>



}

export {
  Navigation
}