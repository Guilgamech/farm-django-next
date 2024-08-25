import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useOficinaStore } from "@/context/oficina";
import { TOficinaRead, TOficinaDeleteActionState } from "@/schema/oficina.schema";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const DeleteOficinaClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TOficinaDeleteActionState,
    data: FormData
  ) => Promise<TOficinaDeleteActionState>;
  row: TOficinaRead
}) => {
  const {removeOficina} = useOficinaStore()
  const [state, formAction] = useFormState(onFormAction, {
    trabajador_id: row.trabajador_id
  });
  const { toast } = useToast()
  useEffect(() => {
    if (state.toast) {
      toast({
        variant: state.toast.type === "success" ? "default" : "destructive",
        title: state.toast.title,
        description: state.toast.message,
      })
    }
  }, [state.toast, toast])
  useEffect(() => {
    if (state.type === "deleted") {
        removeOficina(row)
    }
  }, [state.type])
  return <form
    action={formAction}
  >
    <Button className="link-menu" type="submit">
      <Trash2 className="w-6 h-6" />
      Eliminar
    </Button>
  </form>
}