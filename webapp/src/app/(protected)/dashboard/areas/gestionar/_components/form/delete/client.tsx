import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAreaStore } from "@/context/area";
import { TArea, TAreaDeleteActionState } from "@/schema/area.schema";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const DeleteAreaClient = ({
  onFormAction,
  row
}: {
  onFormAction: (
    prevState: TAreaDeleteActionState,
    data: FormData
  ) => Promise<TAreaDeleteActionState>;
  row: TArea
}) => {
  const {removeArea} = useAreaStore()
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
      removeArea(row)
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