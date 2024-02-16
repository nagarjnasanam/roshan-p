
import { RiArrowGoBackLine, RiDownloadLine, RiSave3Fill } from "react-icons/ri";


export default function EditorNav() {
    return (
        <div className="flex flex-row justify-between items-center  w-full">
            <div className="p-2 w-[70%] flex flex-row justify-start items-center">
                <RiArrowGoBackLine size={'30'} color="#fff" />
            </div>
            <div className='p-2 flex flex-row justify-end items-center gap-x-2'>
                <button
                    type="button"
                    className=" bg-trs-blue-light hover:bg-white text-white hover:text-trs-blue  focus:ring-4  focus:outline-none font-medium rounded-[15px] text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                    <RiSave3Fill size="20" color="inherit" />
                    <span className='ml-2 '>Save</span>
                </button>
                <button
                    type="button"
                    className=" bg-trs-blue-light hover:bg-white text-white hover:text-trs-blue  focus:ring-4  focus:outline-none font-medium rounded-[15px] text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                    <RiDownloadLine size="20" color="inherit" />
                    <span className='ml-2 '>Download</span>
                </button>

            </div>
        </div>
    )
}
