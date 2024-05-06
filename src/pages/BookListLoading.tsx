import { Vortex } from "../components/ui/aceternity/ui/vortex";

export function Loading() {
    return (
        <>
            <div className="relative no-scrollbar overflow-y-auto w-[85vw] h-[60vh] rounded-[1.56rem] border-solid border-[0.2rem] border-blue-500 mx-auto mt-[1.25rem] mb-[15vh]">
                <div className="w-[85vw] mx-auto rounded-md  h-[60vh] overflow-hidden">
                    <Vortex
                        backgroundColor="black"
                        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                    >
                        <h3 className="text-white font-garamond text-5xl md:text-5xl text-center px-[10vw] leading-loose">
                            Please wait, I'm doing some magic behind the scenes
                        </h3>
                        <p className="text-white font-garamond mt-[2rem] text-[1.5rem]">
                            Your Librarian
                        </p>
                    </Vortex>
                </div>
            </div>
        </>
    );
}
