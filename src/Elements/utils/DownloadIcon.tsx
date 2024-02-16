
export default function DownloadIcon({
    fill = "none",
    height = "24",
    width = "24"
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
      fill="none"
      stroke={fill}
      viewBox="0 0 24 24"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 17h.01m.39-3h.6c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C21 15.602 21 16.068 21 17c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C19.398 20 18.932 20 18 20H6c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C3 18.398 3 17.932 3 17c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C4.602 14 5.068 14 6 14h.6m5.4 1V4m0 11l-3-3m3 3l3-3"
      ></path>
    </svg>
  );
}