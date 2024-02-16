
import { BiSort } from "react-icons/bi";
import { useAtom, useSetAtom } from "jotai";
import {  currentPageAtom, sortBy } from "../../Store/atom";
import { useMemo, useState } from "react";
import Dropdown from "../DropDown/DropDown";
import { useCaseTableQuery } from "../../Services/CaseTable";


export default function BodyComponent() {
    const [openDropDown,setOpenDropDown] = useState(false)
    const setCurrentPage = useSetAtom(currentPageAtom);
    const {
        // totalPages,
        filteredData,
        slicedData,
        currentPage
      } = useCaseTableQuery()
    const [sorted,setSort] = useAtom(sortBy)

    const totalPages = useMemo(
        () => Array.isArray(filteredData) ? Math.ceil(filteredData.length) : 1, [filteredData])

    const listObject = useMemo(() => {
        try {
            const item = slicedData[0];
            if(item && typeof item === 'object') {
                const getKeys = Object.keys(item)
                return getKeys.map((col) => {
                        return {
                            label: col,
                            onClick: (val: string) => {
                                setCurrentPage(1)
                                setSort(val)
                                setOpenDropDown(false)
                            }
                        }
                })
                
            }
        } catch {
           return undefined
        }
      },[slicedData, setSort])

    return (
        <div className='w-100'>
            <div className='flex justify-between items-center h-full mx-auto px-6 py-0 xl:container w-full xl:max-w-[80vw] mt-5'>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-center items-start">
                        <h3 className="text-lg text-trs-blue font-semibold">
                            Showing {((currentPage - 1) === 0 ? 1 : (currentPage - 1) * 5)  ?? 1} - {(currentPage * 5) >= totalPages + 1 ? totalPages + 1 : (currentPage * 5)} of {totalPages + 1} Entries
                        </h3>
                        <h3 className="text-sm text-trs-blue font-light">
                            Please Note: Transcribed Data is maintained only for 7 days
                        </h3>
                    </div>
                    <div className="flex flex-row justify-end items-center mt-2 gap-x-2">
                        <h3 className="text-lg text-trs-blue font-semibold">
                            Sort By
                        </h3>
                        <Dropdown open={openDropDown} setOpen={setOpenDropDown} list={listObject} bodyStyle={{
                            width: '300px'
                        }} selectedVal={sorted ?? 'TimeStamp'} />
                        {/* <button
                            type="button"
                            className=" bg-[#e4e4e4] hover:bg-trs-blue-light text-trs-blue hover:text-white focus:ring-4  focus:outline-none font-medium rounded-full  text-sm px-5 py-2.5 text-center inline-flex items-center"
                        >
                            <span className='mx-2 '>TimeStamp</span>
                            <FaChevronDown size="20" color="inherit" />
                        </button> */}
                        <BiSort size="20" color="#12327a" />
                    </div>
                </div>
            </div>
        </div>
    )
}
