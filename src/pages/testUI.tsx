import { Vortex } from "../components/ui/aceternity/ui/vortex";
import Swal from "sweetalert2";
// import "./styles.css";

export function TestUi() {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
            actions: "my-actions",
            confirmButton: "order-2",
            denyButton: "order-3",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(result.isConfirmed);
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });

    return (
        <>
            <div className="w-screen mx-auto rounded-md  h-screen overflow-hidden">
                <Vortex
                    backgroundColor="black"
                    className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                >
                    <h1 className="text-white font-garamond text-5xl md:text-5xl text-center px-[10vw] leading-loose">
                        Goodbye, Crocodile
                    </h1>
                    <p className="text-white font-garamond mt-[2rem] text-[1.5rem]">
                        Your Librarian
                    </p>
                </Vortex>
            </div>
        </>
    );
}
