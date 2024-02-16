import { truncateString } from "../../utils/utils";


type InputFileType = {
    row: any;
    col: {
      key: keyof any;
    };
    i: number;
    jury?: boolean;
    caseData?: any
  };


export default function RawInputFile(props:InputFileType) {
    const getName = truncateString(props.col["key"] ? props.row[props.col["key"]] as string : "", 33)
  return (
    <span title={props.col["key"] ? props.row[props.col["key"]] as string : ""}>{getName}</span>
  )}



