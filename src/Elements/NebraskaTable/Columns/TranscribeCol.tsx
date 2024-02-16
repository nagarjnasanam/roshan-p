import CaseElement from "../../ColumnElements/CaseElement"
import RawInputFile from "../../ColumnElements/RawInputFile"

export const TRANCRIPTION_COL = () => {
    return [
        {
            "header_name": "Case",
            "key": "case",
            "disableSortIcon": true,
            "columnWidth": "w-[10%]",
            "tdClass": "px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-hex-blue underline underline-offset-1 cursor-pointer",
            "renderer" : (props: any) => <CaseElement {...props}  /> 
            // "renderer" : (props: CASEN_REDERER) => <LinkTO {...props} rowKey="case_number" state={props.row} /> 
          },
          {
            "header_name": "Raw Input File",
            "key": "FileName",
            "disableSortIcon": true,
            "columnWidth": "w-[15%]",
            "tdClass": "px-3 py-4 font-medium text-gray-900 ",
            "renderer" : (props: any) => <RawInputFile {...props}  /> 
            // "renderer" : (props: CASEN_REDERER) => <LinkTO {...props} rowKey="case_number" state={props.row} /> 
          },
          {
            "header_name": "Status",
            "key": "progress",
            "disableSortIcon": true,
            "columnWidth": "w-[12%]",
            // "columnWidth": "w-[15%]",
            "tdClass": "px-3 py-4 font-medium text-gray-900 whitespace-nowrap",
          },
          {
            "header_name": "Uploaded By ",
            "key": "Uploaded_by",
            "disableSortIcon": true,
            // "columnWidth": "w-[12%]",
            "columnWidth": "w-[17%]",
            "renderer" : (props: any) => <RawInputFile {...props}  /> ,
            "tdClass": "px-3 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden",
          },
          {
            "header_name": "TimeStamp",
            "key": "CompletionTime",
            "disableSortIcon": true, 
            // "columnWidth": "w-[12%]",
            "columnWidth": "w-[15%]",
            "tdClass": "px-3 py-4 text-start font-medium text-gray-900 whitespace-nowrap",

          },
    ]
}