import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTratamientoStore } from "@/context/tratamiento";
import { TTratamientoRead, TTratamientoDeleteActionState } from "@/schema/tratamiento.schema";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const DeleteTratamientoClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TTratamientoDeleteActionState,
    data: FormData
  ) => Promise<TTratamientoDeleteActionState>;
  row: TTratamientoRead
}) => {
  const {removeTratamiento} = useTratamientoStore()
  const [state, formAction] = useFormState(onFormAction, {
    id: row.id
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
        removeTratamiento(row)
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