import EditorNav from "./EditorNav";
import HomeNavigation from "./HomeNavigation";

export default function Navbar({
    isNav = false
}: {
    isNav?: boolean
}) {
    return (
        <div className="w-100 bg-trs-blue">
            <div className="nav-container xl:container w-full xl:max-w-[80vw]">
                {isNav ? <EditorNav /> : <HomeNavigation />}
            </div>
        </div>
    )
}
