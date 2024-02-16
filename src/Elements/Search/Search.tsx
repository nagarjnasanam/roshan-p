import { useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useClickOutside } from "../../utils/useClickOutside";
import { useAtom } from "jotai";
import { caseAtom, filteredAtom, searchAtom } from "../../Store/atom";


function removeDuplicates<T>(array: T[], getKey: (item: T) => any): T[] {
    const seenValues: Set<any> = new Set();
    return array.filter(item => {
        const key = getKey(item);
        if (!seenValues.has(key)) {
            seenValues.add(key);
            return true;
        }
        return false;
    });
}


export default function Search() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useAtom(searchAtom)
    const [filterAtom, setFilterAtom] = useAtom(filteredAtom)
    const [{ data: getData }] = useAtom(caseAtom) as unknown as [{
        data: {
            data: Array<any>
        },
        isLoading: boolean,
        isError: boolean
    }]
    const searchedDropDown = useMemo(
        () => {
            if (Array.isArray(getData?.data) && searchText) {
                const dropDownList = getData?.data.filter(trs => typeof trs['case'] === 'string' && trs['case'].toString()?.toLowerCase().includes(searchText?.toString()?.toLowerCase() ?? ''))

                const arrDropDown = dropDownList.map((tr) => {
                    if (typeof tr['case'] === 'string') {
                        return {
                            label: tr['case'],
                            onClick: (tr: string) => {
                                setFilterAtom(tr)
                                setDropdownOpen(false)
                            }
                        }
                    }

                    removeDuplicates

                })
                const dropDownLists = removeDuplicates(arrDropDown, (it) => it?.label);
                return dropDownLists


            }
            return []

        }, [getData?.data, searchText, setFilterAtom])


    const domNode = useClickOutside(() => {
        setDropdownOpen(false);
    });

    return (
        <div className='w-[300px]' ref={domNode}>
            {/* <div className="relative"> */}
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className={`w-4 h-4 ${dropdownOpen ? 'text-trs-blue' : 'text-white'}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        // id="default-search"
                        className={`block w-full p-3 ps-10 text-sm  rounded-full  ${filterAtom && !dropdownOpen ? 'border-[3px] border-[#97C745] text-white bg-trs-blue-light' : dropdownOpen ? 'bg-white placeholder-trs-blue-light text-trs-blue-light border border-white' : 'bg-trs-blue-light placeholder-white text-white border border-trs-blue-light'} focus:ring-0 focus:outline-none`}
                        placeholder="Search and Choose Case"
                        onChange={(e) => setSearchText(e.target.value)}
                        onClick={() => setDropdownOpen(prev => !prev)}
                        value={searchText && filterAtom}
                        required
                    />
                    { <div
                        className="absolute inset-y-0 end-2.5 flex flex-col items-center justify-center cursor-pointer"
                        onClick={() =>  {setSearchText(undefined); setFilterAtom(undefined)}}
                    >
                        <IoMdClose size="20" color={`${dropdownOpen ? '#12327a' : 'white'}`} />
                    </div>}
                </div>
                {dropdownOpen && <div
                    className="absolute w-full h-[50%] bottom-0 bg-white -z-1"
                >
                </div>}
                <div
                    className={`shadow-2xl absolute h-[400px] overflow-y-auto left-0 z-40  w-full rounded-b-[25px] bg-white dark:bg-dark-2 py-[10px] transition-transform duration-300 ease-in-out transform ${dropdownOpen
                        ? "top-full opacity-100 visible shadow-md"
                        : "top-[110%] invisible opacity-0"
                        }`}
                >
                    {
                        searchedDropDown && Array.isArray(searchedDropDown) && searchedDropDown.length > 0 && searchedDropDown.map((cs) => (<DropdownItem label={cs?.label ?? ''} onClick={() => cs?.onClick(cs.label)} />))
                    }

                    {/* <DropdownItem label="Preview" onClick={() => console.log('sdsds')} />
                    <DropdownItem label="Button" onClick={() => console.log('sdsds')} />
                    <DropdownItem label="Subscribe" onClick={() => console.log('sdsds')} /> */}
                </div>
            </div>
        // </div>
    )
}


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