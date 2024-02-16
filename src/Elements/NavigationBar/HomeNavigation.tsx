import { TfiReload } from "react-icons/tfi";
import { FaFolderPlus, FaCreativeCommonsNd } from "react-icons/fa6";
import { HiUpload } from "react-icons/hi";
import Search from "../Search/Search";

export default function HomeNavigation() {
    return (
         <div className="flex flex-row justify-between items-center w-full">
            <div className="p-2 w-[70%] flex flex-row justify-start items-center space-x-2">
                <Search />
                <div className='p-2 flex flex-row justify-center items-center'>
                    <TfiReload size="20" color="#fff" />
                </div>
                <div className='p-2 flex flex-row justify-center items-center'>
                    <FaFolderPlus size="20" color="#fff" />
                </div>
                <div className='p-2 flex flex-row justify-center items-center'>
                    <FaCreativeCommonsNd size="20" color="#fff" />
                </div>
            </div>
            <div className='p-2'>
                <button
                    type="button"
                    className="bg-white hover:bg-trs-blue-light text-trs-blue hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-1  text-center inline-flex items-center"
                >
                    <HiUpload size="20" color="inherit" />
                    <span className='ml-2'>Upload to Transcribe</span>
                </button>
            </div>
        </div>
    )
}
