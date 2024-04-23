export const NewBookFrame = () => {
    const handleUpload = () => {
        console.log("Upload pressed");
    };

    const handleAddNewBook = () => {
        console.log("add-to-shelf pressed");
    };

    return (
        <div className="relative w-[85vw] h-[69vh] rounded-[1.56rem] border-[0.2rem] border-blue-500 mx-auto mt-[1.25rem]">
            <form className="font-garamond text-2xl text-white flex flex-col items-center mt-[2rem]">
                <div className="mt-[.5rem] flex flex-col items-center w-[80vw] mb-2.5">
                    <div>Title</div>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        className="mt-[.5rem] h-[3rem] text-xl font-garamond text-black w-full pl-[1rem] rounded-2xl border-none"
                    />
                </div>
                <div className="mt-[1.25rem] flex gap-[1.25rem] w-[80.5vw] justify-between">
                    <div className="mt-[.5rem] text-white flex flex-col items-center">
                        <div>Year</div>
                        <input
                            type="text"
                            id="year"
                            placeholder="Year"
                            className="mt-[.5rem] h-[3rem] font-garamond text-black text-xl w-[10vw] rounded-2xl border-none pl-4"
                        />
                    </div>
                    <div className="mt-[.5rem] text-white flex flex-col items-center">
                        <div>Author</div>
                        <input
                            type="text"
                            id="author"
                            placeholder="Author"
                            className="mt-[.5rem] h-[3rem]  font-garamond text-black text-xl w-[40vw] rounded-2xl border-none pl-4"
                        />
                    </div>
                    <div className="mt-[.5rem] text-white flex flex-col items-center">
                        <div>Category</div>
                        <input
                            type="text"
                            id="category"
                            placeholder="Category"
                            className="mt-[.5rem] h-[3rem]  font-garamond text-black text-xl w-[25vw] rounded-2xl border-none pl-4"
                        />
                    </div>
                </div>
                <div className="mt-[2.5rem] w-[80vw] min-h-[20vh] max-h-[45vh] flex flex-col items-center">
                    <div>Description/Note</div>
                    <textarea
                        id="description"
                        placeholder="Description/Note"
                        className="mt-[.5rem] font-garamond text-black text-xl rounded-2xl pt-2 pl-4 w-full min-h-[20vh] max-h-[45vh]"
                    ></textarea>
                </div>
            </form>
            <div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="font-garamond absolute bottom-4 right-[16rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[9.5rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                >
                    Upload
                </button>

                <button
                    type="button"
                    className="font-garamond absolute bottom-[1rem] right-[1.25rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[14.25rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                    onClick={handleAddNewBook}
                >
                    Add To The Shelf
                </button>
            </div>
        </div>
    );
};
