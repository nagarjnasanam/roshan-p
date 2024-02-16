import { useState } from "react";
import { useClickOutside } from "../../utils/useClickOutside";
import { signOut  } from "aws-amplify/auth";
import { userAtom } from "../../Store/atom";
import { useSetAtom } from "jotai";
// import { MainContext, initialStateType } from "../Context/MainContext";
// import useUser from "../../customHooks/useUser";
// import { Link, useNavigate } from "react-router-dom";
// import useOnClickOutside from "../../utils/useOnClickOutside";

export default function ProfileMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const setUser = useSetAtom(userAtom);


  const onLogOut =() => {
    setUser(null)
    signOut()
  }
  const domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  return (
    <>
      <div className="max-w-[300px]"  ref={domNode}>
        <div className="relative ">
          <div className="avatar bg-trs-blue cursor-pointer object-cover text-white text-center overflow-hidden rounded-[50%]" onClick={() => setDropdownOpen(prev => !prev)}><span className="initialsContainer">Z</span></div>
          {/* Dropdown menu */}
          <div
                    className={`bg-white shadow-2xl w-[300px] absolute right-0 z-40 top-10 rounded-lg py-[10px] transition-all ${
                      dropdownOpen
                        ? 'opacity-100 visible'
                        : 'top-[110%] invisible opacity-0'
                    }`}
          >
            <div className="relative w-[300px] flex flex-row justify-start gap-x-4 items-center">
            <div className="avatar bg-trs-blue cursor-pointer object-cover text-white text-center overflow-hidden rounded-[50%]" onClick={() => setDropdownOpen(prev => !prev)}><span className="initialsContainer">Z</span></div>
            <div className="flex flex-col	 justify-start items-start gap-y-2">
              <span className="text-trs-blue font-semibold text-sm">User Name</span>
              <span className="text-trs-blue font-semibold text-sm">username@email.com</span>
            </div>
            <span className="close" onClick={() => setDropdownOpen(false)}></span>
            </div>
            <hr  className="text-trs-blue mt-4 mb-2"/>
            <DropdownItem label="Settings" href="/#" />
            <hr  className="text-trs-blue my-2"/>
            <DropdownItem label="Log out" href="/#" onClick={onLogOut} />
            {/* <DropdownItem label="Button" href="/#" />
                    <DropdownItem label="Subscribe" href="/#" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

const DropdownItem = ({ label, href,onClick }: { label: string, href: string, onClick?: () => void }) => {
  return (
    <a
      href={href}
      className="text-trs-blue hover:bg-[#F5w-[300px]F7FD]  hover:text-trs-blue-light block px-2 pl-10 py-2 text-base"
      onClick={onClick}
    >
      {label}
    </a>
  );
};
