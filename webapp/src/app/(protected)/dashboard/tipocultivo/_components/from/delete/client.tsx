import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTipoCultivoStore } from "@/context/tipoc";
import { TTipoCultivo, TTipoCultivoDeleteActionState } from "@/schema/tipoc.schema";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const DeleteTipoCultivoClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TTipoCultivoDeleteActionState,
    data: FormData
  ) => Promise<TTipoCultivoDeleteActionState>;
  row: TTipoCultivo
}) => {
  const {removeTipoCultivo} = useTipoCultivoStore()
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
      removeTipoCultivo(row)
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