import { getSession } from "@/lib/session"
import { Card, CardContent, CardHeader } from "@/components/ui/card"


export default async function GestionarPage(){
  const user =  await getSession()
  return <div className="page-content">
  <Card>
    <CardHeader>
      <h2 className="text-3xl">Perfil</h2>

    </CardHeader>
    <CardContent>
    <h2 className="p-2">Correo:
      <span className="p-2">
        {user?.email}
        </span>
        </h2>

    </CardContent>

  </Card>
  
</div>
}