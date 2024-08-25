import { Header } from '@/components/layout/header';
import VerticalScroll from '@/components/layout/vertical-scroll';
import GlobalStore from '@/context';
import { getSession } from '@/lib/session';
import { SideBar } from '@/components/layout/sidebar';
import * as apiArea from "@/lib/area.api";
import * as apiIncidencia from "@/lib/incidencia.api";
import * as apiRol from "@/lib/rol.api";
import * as apiAgricola from "@/lib/agricola.api";
import * as apiOficina from "@/lib/oficina.api";
import * as apiTrabajador from "@/lib/trabajador.api";
import * as apiTipoFlota from "@/lib/tipof.api";
import * as apiFlota from "@/lib/flota.api";
import * as apiTipoCultivo from "@/lib/tipoc.api";
import * as apiEnfermedad from "@/lib/enfermedad.api";
import * as apiAreaCultivo from "@/lib/area-cultivo.api";
import * as apiAgricolaCultivo from "@/lib/agricola-cultivo.api";
import * as apiEnfermedadCultivo from "@/lib/enfermedad-cultivo.api";
import * as apiCultivo from "@/lib/cultivo.api";
import * as apiTratamiento from "@/lib/tratamiento.api";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if(!session){
    return <h2>User Not Login</h2>
  }
  const incidencias = await apiIncidencia.list({ access: session.access });
  const areas = await apiArea.list({ access: session.access });
  const agricolas = await apiAgricola.list({ access: session.access });
  const oficinas = await apiOficina.list({ access: session.access });
  const trabajadores = await apiTrabajador.list({ access: session.access });
  const rols = await apiRol.list({ access: session.access });
  const flotas = await apiFlota.list({ access: session.access });
  const tipoFlotas = await apiTipoFlota.list({ access: session.access });
  const enfermedades = await apiEnfermedad.list({ access: session.access });
  const tipoCultivos = await apiTipoCultivo.list({ access: session.access });
  const cultivos = await apiCultivo.list({ access: session.access });
  const enfermedadCultivos = await apiEnfermedadCultivo.list({ access: session.access });  
  const areaCultivos = await apiAreaCultivo.list({ access: session.access });  
  const agricolaCultivos = await apiAgricolaCultivo.list({ access: session.access });  
  const tratamientos = await apiTratamiento.list({ access: session.access });
  return (
    <GlobalStore
    cultivos={ typeof cultivos === 'string' ? [] : cultivos }    
    trabajadores={ typeof trabajadores === 'string' ? [] : trabajadores }    
    tipoCultivos={ typeof tipoCultivos === 'string' ? [] : tipoCultivos }
    areaCultivos={ typeof areaCultivos === 'string' ? [] : areaCultivos }
    areas={ typeof areas === 'string' ? [] : areas }
    enfermedadCultivos={ typeof enfermedadCultivos === 'string' ? [] : enfermedadCultivos }
    tratamientos={ typeof tratamientos === 'string' ? [] : tratamientos }
    enfermedades={ typeof enfermedades === 'string' ? [] : enfermedades }
    agricolas={ typeof agricolas === 'string' ? [] : agricolas }
    agricolaCultivos={ typeof agricolaCultivos === 'string' ? [] : agricolaCultivos }
    oficinas={ typeof oficinas === 'string' ? [] : oficinas }
    incidencias={ typeof incidencias === 'string' ? [] : incidencias }
    rols={ typeof rols === 'string' ? [] : rols }
    flotas={ typeof flotas === 'string' ? [] : flotas }
    tipoFlotas={ typeof tipoFlotas === 'string' ? [] : tipoFlotas }
    >
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
