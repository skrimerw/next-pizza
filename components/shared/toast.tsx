import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export function successToast(description: string) {
    toast(
        <div className="flex gap-3 w-fit text-base items-center">
            <CheckCircle2 size={25} className="text-green-700" />
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
        <div className="flex gap-3 w-fit text-base items-center">
            <XCircle size={25} className="text-red-500" />
            {description}
        </div>,
        {
            style: {},
            position: "top-center",
            duration: 2000
        }
    );
}
