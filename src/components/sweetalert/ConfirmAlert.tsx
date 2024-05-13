import Swal from "sweetalert2";

interface Props {
    titleAlert: string;
    onConfirmTitle: string;
    onDenyTitle: string;
    action: () => Promise<void>;
}

export const onConfirmAlert = ({
    titleAlert,
    onConfirmTitle,
    onDenyTitle,
    action,
}: Props) => {
    Swal.fire({
        title: titleAlert,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#0b3866",
        denyButtonText: "No",
        customClass: {
            title: "font-comic text-[1.5rem] text-white",
            closeButton: "bg-red-500",
            confirmButton: "font-comic",
            denyButton: "font-comic",
            popup: "font-comic text-[1.15rem] bg-gradient-to-br from-[#0b3866] via-[#4b749f]  to-[#08203e] rounded-[1.25rem] w-[48vw]",
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: onConfirmTitle,
                customClass: {
                    title: "font-comic text-[1.5rem] text-white",
                    popup: "font-comic text-[1.15rem] bg-gradient-to-br from-[#0b3866] via-[#4b749f]  to-[#08203e] rounded-[1.25rem] w-[48vw]",
                },
            });

            await action();
        } else if (result.isDenied) {
            Swal.fire({
                title: onDenyTitle,
                customClass: {
                    title: "font-comic text-[1.5rem] text-white",
                    popup: "font-comic text-[1.15rem] bg-gradient-to-br from-[#0b3866] via-[#4b749f]  to-[#08203e] rounded-[1.25rem] w-[48vw]",
                },
            });
        }
    });
};
