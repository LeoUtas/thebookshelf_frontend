import Swal from "sweetalert2";

interface Props {
    titleAlert: string;
    onDenyTitle: string;
    action: () => Promise<void>;
}

export const onConfirmAccountDeleteAlert = ({
    titleAlert,
    onDenyTitle,
    action,
}: Props) => {
    Swal.fire({
        title: titleAlert,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonColor: "#4d5b69",
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
            title: "font-comic text-[1.5rem] text-red-600",
            popup: "font-comic text-[1.15rem] bg-white rounded-[1.25rem] w-[48vw]",
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            await action();
        } else if (result.isDenied) {
            Swal.fire({
                title: onDenyTitle,
                customClass: {
                    title: "font-comic text-[1.5rem] text-green-600",
                    popup: "font-comic text-[1.25rem] bg-white rounded-[1.25rem] w-[48vw]",
                },
            });
        }
    });
};
