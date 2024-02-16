function StarIcon({
    fill = "#1C274C",
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
      viewBox="0 0 24 24"
    >
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M12 20v-2.4m0-11.2V4m8 8h-2.4M6.4 12H4m13.657-5.657L15.96 8.04m-7.92 7.92l-1.697 1.697m0-11.314L8.04 8.04m7.92 7.92l1.697 1.697"
      ></path>
    </svg>
  );
}

export default StarIcon;