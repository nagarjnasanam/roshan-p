import ProfileMenu from "../Profile/ProfileMenu";
import './styles.css';
export default function Header() {
  return (
    <div className='navigation-bar'>
            <nav>
                <div className='nav-container xl:container w-full xl:max-w-[80vw]'>
                    <div className="flex flex-row justify-start items-center gap-x-4">
                        <a className='logo text-trs-blue' href='/'>
                            <img src='/Logo.png' className="h-8" alt="Logo" />
                        </a>
                        <h3 className="text-trs-blue font-extralight text-2xl">CCC DA</h3>
                        <div className="inline-block w-0.5 self-stretch bg-trs-blue opacity-100 dark:opacity-50"></div>
                        <h3 className="text-trs-blue font-semibold text-2xl">Transcription</h3>
                    </div>
                    <div className='nav-row align-center'>
                        <div className='nav-column'>
                            <h3 className='font-bold text-theme-red text-xl'>
                                {/* Welcome, {getUserName()} ! */}
                            </h3>
                            <h4 className='text-xl font-bold' />
                        </div>
                        {/* Render ProfileMenu component */}
                        <ProfileMenu />
                        {/* <div className="relative">
                            <div className="avatar bg-trs-blue object-cover text-white text-center overflow-hidden rounded-[50%]"><span className="initialsContainer">Z</span></div>
                        </div> */}
                    </div>
                </div>
            </nav>
        </div>
    );
  
}
