import EditorComponent from "../EditorAction/EditorComponent";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../NavigationBar/Navbar";

export default function TSEditor() {
  return (
    <div>
        <Header />
        <Navbar isNav />
        <EditorComponent />
        <Footer />
    </div>
  )
}
