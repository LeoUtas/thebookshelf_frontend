// def the type of the Title prop
type TitleProps = { Title: string };

export const Header = ({ Title }: TitleProps) => {
    return (
        <>
            <div className="font-garamond text-h2-title-fontsize text-white font-semibold text-center mt-[5vh]">
                {Title}
            </div>
        </>
    );
};
