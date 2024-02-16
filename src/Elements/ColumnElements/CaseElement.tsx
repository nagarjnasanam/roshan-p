import { truncateString } from "../../utils/utils";


type CaseType = {
    row: any;
    col: {
      key: keyof any;
    };
    i: number;
    jury?: boolean;
    caseData?: any
  };

export default function CaseElement(props: CaseType) {
    const getName = truncateString(props.col["key"] ? props.row[props.col["key"]] as string : "", 33)
  return (
    <span title={props.col["key"] ? props.row[props.col["key"]] as string : ""}>{getName}</span>
  )
}
