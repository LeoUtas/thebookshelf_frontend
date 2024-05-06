import { Button } from "../ui/shadcn/button";
import { Loader2 } from "lucide-react";

export const LoadingButton = () => {
    return (
        <Button disabled>
            <Loader2 className="w-[4rem] h-[2rem] animate-spin" />
            Loading
        </Button>
    );
};
