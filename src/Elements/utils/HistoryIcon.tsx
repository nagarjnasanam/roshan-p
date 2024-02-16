
export default function HistoryIcon({
    fill = '#000',
    height = "21",
    width = "20"
}: {
    fill?: string;
    width?: string;
    height?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    //   fill={fill}
      viewBox="0 0 20 21"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g       fill={fill} opacity="0.9" transform="translate(-464 -254)">
          <g transform="translate(464 254.5)">
            <path d="M10.5 0C7 0 3.9 1.9 2.3 4.8L0 2.5V9h6.5L3.7 6.2C5 3.7 7.5 2 10.5 2 14.6 2 18 5.4 18 9.5S14.6 17 10.5 17c-3.3 0-6-2.1-7.1-5H1.3c1.1 4 4.8 7 9.2 7 5.3 0 9.5-4.3 9.5-9.5S15.7 0 10.5 0zM9 5v5.1l4.7 2.8.8-1.3-4-2.4V5H9z"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
