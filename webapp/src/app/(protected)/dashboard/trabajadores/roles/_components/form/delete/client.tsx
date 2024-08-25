import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRolStore } from "@/context/rol";
import { TRol, TRolDeleteActionState } from "@/schema/rol.schema";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const DeleteRolClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TRolDeleteActionState,
    data: FormData
  ) => Promise<TRolDeleteActionState>;
  row: TRol
}) => {
  const {removeRol} = useRolStore()
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
      removeRol(row)
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