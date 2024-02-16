import NBTable from '../NebraskaTable/Table'
import { TRANCRIPTION_COL } from '../NebraskaTable/Columns/TranscribeCol'
import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft } from "react-icons/md";
// import { useAtom } from 'jotai';
// import { caseAtom, currentPageAtom, filteredAtom, sortBy } from '../../Store/atom';
// import { useMemo } from 'react';
// import { sortByKey } from '../../utils/utils';
import { useCaseTableQuery } from '../../Services/CaseTable';

// const pageSize = 5;

export default function TableElement() {
    const {
        totalPages,
        handleChangePage,
        slicedData,
        currentPage,
        isLoading
      } = useCaseTableQuery()


    return (
        <div className='w-100'>

            <div className='flex justify-between items-center h-full mx-auto px-6 py-0 xl:container w-full xl:max-w-[80vw] mt-5'>
                <NBTable
                    columns={TRANCRIPTION_COL()}
                    rows={slicedData ?? []}
                    // setSortColumn={setSortColumn}
                    // tableHeader="Files and Folders"
                    tableHeaderText={false}
                    tableHeight=" tableMediaQ"
                    headerBg="bg-[#fff]"
                    headerColor="text-gray-700"
                    sortIconColor="#14181c"
                    isLoading={isLoading}
                />
            </div>
            <div className='mt-5 flex flex-row justify-center items-center w-full gap-x-2'>
                <MdKeyboardDoubleArrowLeft color='#2a4787' size="25" className='font-thin cursor-pointer' onClick={() => handleChangePage(1)} />
                <MdKeyboardArrowLeft color='#2a4787' size="25" className='font-thin cursor-pointer' onClick={() =>handleChangePage(currentPage !== 1 ? currentPage - 1 : 1)}/>
                <h3 className='text-trs-blue text-lg '>Page <span className='border border-trs-blue-light p-2'>{currentPage}</span> of {totalPages}</h3>
                <MdKeyboardArrowRight color='#2a4787' size="25" className='font-thin cursor-pointer' onClick={() =>handleChangePage(currentPage + 1)} />
                <MdKeyboardDoubleArrowRight color='#2a4787' size="25" className='font-thin cursor-pointer' onClick={() => handleChangePage(totalPages)} />
            </div>
        </div>
    )
}
