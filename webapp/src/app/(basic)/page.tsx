import { Card } from "@/components/ui/card";
import LoginForm from "./_components/login-from";

export default function Home() {
  return (
    <section className="w-full flex items-center justify-center px-5">
      <Card className="p-5 md:p-8 max-w-md w-full shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Acceder al Sistema</h2>
        <p className="text-center mb-6">Complete los campos para acceder</p>
        <LoginForm />
      </Card>
    </section>    
  );
}
