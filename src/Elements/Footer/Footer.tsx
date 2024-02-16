
export default function Footer() {
    return (
        <>
        <div className="fixed left-0 right-0 bottom-0 w-[100vw] bg-[#cccccc] pointer-events-none p-2 ">
          {/* {!!children && <span>{children}</span>} */}
          <div
            className='nav-container xl:container w-full xl:max-w-[80vw] text-trs-blue'
          >
           <span             style={{
                fontFamily: '"Poppins", Sans-serif',
                fontSize: "16px",
                fontWeight: "400",
                bottom: 1,
              }}> ©&nbsp;2023 Copyright: All Rights Reserved</span>
          </div>
        </div>
        </>
      );
}
