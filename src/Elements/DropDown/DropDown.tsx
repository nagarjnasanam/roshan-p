import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useClickOutside } from "../../utils/useClickOutside";
import { CSSProperties } from "react";


const DropdownItem = ({ label, onClick }: { label: string, onClick: React.MouseEventHandler<HTMLAnchorElement> }) => {
    return (
        <a
            onClick={onClick}
            className="text-trs-blue cursor-pointer dark:text-dark-6 hover:bg-[#F5F7FD] dark:hover:bg-primary/5 hover:text-primary block px-2 pl-10 py-2 text-base"
        >
            {label}
        </a>
    );
};

export default function Dropdown({
    open,
    setOpen,
    list,
    bodyStyle,
    selectedVal
}: {
    open: boolean
    setOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >,
    list: Array<{
        label: string,
        onClick: (label: string) => void
    }> | undefined;
    selectedVal?: string
    bodyStyle?: CSSProperties
}) {
    const domNode = useClickOutside(() => {
        setOpen(false);
    });

    console.log('selectedVal',selectedVal);
    

    return (
        <div  ref={domNode}>
        <div className="relative flex flex-col items-center rounded-lg">
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}

                className={`min-w-[200px] bg-[#e4e4e4] hover:bg-trs-blue-light text-trs-blue hover:text-white focus:ring-4  focus:outline-none font-medium rounded-full  text-sm px-5 py-2.5 text-center inline-flex justify-center items-center`}
                >
                <span className='mx-2 '>{selectedVal ?? 'TimeStamp'}</span>
                {open ? <FaChevronUp size="20" color="inherit" /> : <FaChevronDown size="20" color="inherit" />}
            </button>
            <div
                className={` shadow-2xl absolute left-0 z-40  w-full rounded-b-[25px] bg-white dark:bg-dark-2 py-[10px] transition-transform duration-300 ease-in-out transform ${open
                    ? "top-full opacity-100 visible shadow-md"
                    : "top-[110%] invisible opacity-0"
                }`}
                style={bodyStyle}
                >
                {
                    Array.isArray(list) && list.map((it) => ( <DropdownItem label={it.label} onClick={() => it.onClick(it.label)} />))
                }
            </div>
        </div>
                </div>
    );
}
