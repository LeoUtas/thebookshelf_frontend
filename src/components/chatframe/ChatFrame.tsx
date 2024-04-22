import Logo from "../../assets/images/icon.png";

import "./chatframe.css";

export const ChatFrame = () => {
    const handleNewChat = () => {
        console.log("New Chat pressed");
    };

    return (
        <div>
            <div className="relative w-[95vw] min-h-[80vh] rounded-[1.56rem] border border-[#0085ff] bg-white bg-opacity-70 mx-auto mt-[1.25rem]">
                <div className="absolute top-0 left-0 w-1/4 h-full rounded-xl bg-[#f6f6f6]">
                    <div className="new-chat">
                        <span className="new-chat-logo">
                            <img src={Logo} alt="" width={40} />
                        </span>
                        <button
                            type="button"
                            className="new-chat-text"
                            onClick={handleNewChat}
                        >
                            New Chat
                        </button>
                    </div>
                </div>
                <div className="absolute right-0 w-[71vw] min-h-[80vh] rounded-[1.25rem] bg-transparent mx-auto">
                    <form>
                        <textarea
                            className="font-garamond text-[1.25rem] absolute top-[94%] -translate-y-1/2 pt-[0.5rem] pl-4 left-[1%] right-[1%] w-[95%] h-[10%] bg-white rounded-[1.5rem] border border-[#ccc]"
                            placeholder="Ask the librarian anything about your book"
                        ></textarea>
                    </form>
                </div>
            </div>
        </div>
    );
};
