import { Link } from "react-router-dom";

export const LinkTO = ({
    row,
    col,
    rowKey,
    state,
  }: {
    row: any,
    col: {
      "header_name": string;
      "key": keyof any;
      "tdClass": string
    },
    rowKey: keyof any | undefined;
    state?: any
    i?: number;
  }) => {

    return <Link to={`/case/${typeof rowKey === 'string' ?  row[rowKey] :  row[col['key']]}`} state={{
        row: state
    }}  >{row[col['key']]}</Link>
  }