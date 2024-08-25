import { Card } from "@/components/ui/card";

export default function NoAutorizado() {
  return (<div className="page-content">
    <section className="w-full flex justify-center">
      <Card className="p-5 md:p-8 max-w-md w-full shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">No Autorizado</h2>
        <p className="text-center mb-6">No tiene suficiente permisos para acceder.</p>
      </Card>
    </section>
  </div>
  );
}