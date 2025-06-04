
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddEvaluationForm from "@/components/AddEvaluationForm";
import SupplierEvaluationForm from "@/components/SupplierEvaluationForm";
import { useIsMobile } from "@/hooks/use-mobile";

interface EvaluationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluationType: "event" | "supplier";
  onSubmit: (data: any) => void;
}

export function EvaluationDialog({ 
  open, 
  onOpenChange, 
  evaluationType, 
  onSubmit 
}: EvaluationDialogProps) {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-2xl ${isMobile ? 'p-4 h-[90vh] overflow-scroll' : ''}`}>
        <DialogHeader>
          <DialogTitle>
            {evaluationType === "event" ? "Avaliar Evento" : "Avaliar Fornecedor"}
          </DialogTitle>
          <DialogDescription>
            Compartilhe sua experiência com a comunidade.
          </DialogDescription>
        </DialogHeader>
        <div className={isMobile ? 'max-h-[70vh] overflow-y-auto -mx-4 px-4' : ''}>
          {evaluationType === "event" ? (
            <AddEvaluationForm 
              type={evaluationType} 
              onSubmit={onSubmit}
              onCancel={() => onOpenChange(false)}
            />
          ) : (
            <SupplierEvaluationForm 
              onSubmit={onSubmit}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EvaluationDialog;
