import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export function successToast(description: string) {
    toast(
        <div className="flex gap-2">
            <CheckCircle2 size={20} className="text-green-700" />
            {description}
        </div>,
        {
            style: {},
            position: "top-center",
            duration: 2000
        }
    );
}

export function failToast(description: string) {
    toast(
        <div className="flex gap-2">
            <XCircle size={20} className="text-red-500" />
            {description}
        </div>,
        {
            style: {},
            position: "top-center",
            duration: 2000
        }
    );
}
