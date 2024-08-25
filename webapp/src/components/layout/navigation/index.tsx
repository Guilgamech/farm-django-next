import { Bell, Calendar, Clock, NotebookText, ShieldPlus,Bug, LayoutDashboard, Pickaxe, BriefcaseBusinessIcon, Wrench, Ban, TreePine, UserRoundPlus, Settings, Sprout,Tractor, LandPlot, Users } from "lucide-react"
import LinkNavigation from "./link"
import SubNavigation from "./sub-navigation";
import { useNavigationStore } from "@/context/navigation";



const Navigation = () => {
  return <nav aria-label="main navigation" className="w-full main-navigation">
    <ul className="pb-8 lg:py-8 px-6 w-full space-y-5">
      <li className="w-full"><LinkNavigation href="/dashboard" active="exact" icon={<LayoutDashboard className="w-6 h-6" />} text={<span>Panel</span>} /></li>
      <SubNavigation href="/dashboard/areas" icon={<LandPlot className="w-6 h-6 icon" />} text={<span>Áreas</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/areas/gestionar" active="exact" icon={<Settings className="w-6 h-6 " />} text={<span>Gestionar Áreas</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/areas/incidencias" active="exact" icon={<Ban className="w-6 h-6" />} text={<span>Gestionar Incidencias</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/flotas" icon={<Tractor className="w-6 h-6 icon" />} text={<span>Flotas</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/flotas/gestionar" active="exact" icon={<Settings className="w-6 h-6 " />} text={<span>Gestionar Flotas</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/flotas/tipos-de-flotas" active="exact" icon={<Wrench className="w-6 h-6" />} text={<span>Tipo de Flotas</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/trabajadores" icon={<Users className="w-6 h-6 icon" />} text={<span>Trabajadores</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/trabajadores/gestionar-personal-de-oficina" active="exact" icon={<BriefcaseBusinessIcon className="w-6 h-6" />} text={<span>Gestionar Personal De Oficina</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/trabajadores/gestionar-personal-agricola" active="exact" icon={<Pickaxe className="w-6 h-6" />} text={<span>Gestionar Personal Agrícola</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/trabajadores/roles" active="exact" icon={<UserRoundPlus className="w-6 h-6" />} text={<span>Gestionar Roles</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/cultivos" icon={<TreePine className="w-6 h-6 icon" />} text={<span>Cultivos</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/cultivos/gestionar" active="exact" icon={<Settings className="w-6 h-6" />} text={<span>Gestionar</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/cultivos/tipos-de-cultivos" active="exact" icon={<Sprout className="w-6 h-6" />} text={<span>Tipo De Cultivos</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/enfermedades" icon={<Bug className="w-6 h-6 icon" />} text={<span>Enfermedades</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/enfermedades/gestionar" active="exact" icon={<Settings className="w-6 h-6" />} text={<span>Gestionar</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/enfermedades/tratamientos" active="exact" icon={<ShieldPlus className="w-6 h-6" />} text={<span>Tratamientos</span>} /></li>
        </ul>
      </SubNavigation>
      <SubNavigation href="/dashboard/reportes" icon={<NotebookText className="w-6 h-6 icon" />} text={<span>Reportes</span>}>
        <ul className="py-5 px-0 w-full space-y-5">
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/cultivo-responsable" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Cultivo por Responsable</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/cultivo-recoger" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Cultivo Listos para Recoger</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/cultivo-area" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Cultivo por Area</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/incidencia-area" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Incidencias por Area</span>} /></li>
          <li className="w-full"><LinkNavigation isChild href="/dashboard/reportes/flota-estado" active="exact" icon={<NotebookText className="w-6 h-6" />} text={<span>Informe de Flota por Estado</span>} /></li>
        </ul>
      </SubNavigation>
    </ul>
  </nav>



}

export {
  Navigation
}