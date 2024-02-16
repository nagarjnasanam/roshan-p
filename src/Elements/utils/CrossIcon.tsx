
function CrossIcon({
        fill = undefined,
        height = "100",
        width = "100"
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
      fill={fill}
      version="1.1"
      viewBox="0 0 511.999 511.999"
      xmlSpace="preserve"
    >
      <path
        fill="#FF6465"
        d="M384.955 256l120.28-120.28c9.019-9.019 9.019-23.642 0-32.66L408.94 6.765c-9.019-9.019-23.642-9.019-32.66 0L256 127.045 135.718 6.765c-9.019-9.019-23.642-9.019-32.66 0L6.764 103.058c-9.019 9.019-9.019 23.642 0 32.66l120.28 120.28L6.764 376.28c-9.019 9.019-9.019 23.642 0 32.66l96.295 96.294c9.019 9.019 23.642 9.019 32.66 0l120.28-120.28 120.28 120.28c9.019 9.019 23.642 9.019 32.66 0l96.295-96.294c9.019-9.019 9.019-23.642 0-32.66L384.955 256z"
      ></path>
    </svg>
  );
}

export default CrossIcon;
