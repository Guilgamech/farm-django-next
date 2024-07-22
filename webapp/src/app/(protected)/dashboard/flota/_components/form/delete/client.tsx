import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFlotaStore } from "@/context/flota";
import { TFlotaRead, TFlotaDeleteActionState } from "@/schema/flota.schema";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const DeleteFlotaClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TFlotaDeleteActionState,
    data: FormData
  ) => Promise<TFlotaDeleteActionState>;
  row: TFlotaRead
}) => {
  const {removeFlota} = useFlotaStore()
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
        removeFlota(row)
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