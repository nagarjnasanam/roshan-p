import { useAtom } from 'jotai';
import { caseAtom, currentPageAtom, filteredAtom, sortBy } from '../Store/atom';
import { useMemo } from 'react';
import { sortByKey } from '../utils/utils';
// import { sortByKey } from '../../utils/';

const pageSize = 5;

export const useCaseTableQuery = () => {
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [filterAtom,] = useAtom(filteredAtom)
    // const setCurrentCases = useSetAtom(currentCases)
    const [sorted,] = useAtom(sortBy)

    const [{ data, isLoading }] = useAtom(caseAtom) as unknown as [{
        data: {
            data: Array<any>
        },
        isLoading: boolean,
        isError: boolean
    }]

    const filteredData = useMemo(() => {
        let tableData = data?.data ?? []
        if(Array.isArray(data?.data) && data?.data.length > 0 && sorted) {
            tableData = sortByKey(data?.data,sorted ?? 'CompletionTime','desc')
        }
        if(Array.isArray(tableData) && filterAtom) {
            tableData = tableData.filter((cs) => cs?.case === filterAtom)
        }
        return tableData ?? data?.data
    },[data?.data, sorted, filterAtom])

    // const filterCaseData = useMemo(() => {
    //     if(Array.isArray(sortedData) && filterAtom) {
    //         return sortedData.filter((cs) => cs?.case === filterAtom)
    //     }
    //     return sortedData
    // },[filterAtom, sortedData])

    const slicedData = useMemo(() => {
        if(Array.isArray(filteredData)) {
            return filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        }
        return []
    },[currentPage, filteredData])   
    const totalPages = Array.isArray(filteredData) ? Math.ceil(filteredData.length / pageSize) : 1
        // console.log('currentData',currentData,totalPages);
    const handleChangePage = (newPage: number) => {
        setCurrentPage(newPage);
      }

      return {
        totalPages: totalPages,
        handleChangePage,
        slicedData,
        filteredData,
        isLoading,
        currentPage
      }
}