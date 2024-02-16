import './assets/App.css'
import Header from './Elements/Header/Header'
import Footer from './Elements/Footer/Footer';
import Navbar from './Elements/NavigationBar/Navbar';
import BodyComponent from './Elements/BodyComponent/BodyComponent';
import TableElement from './Elements/TableElement/TableElement';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <BodyComponent />
      <TableElement />
      <Footer />
    </>
  )
}

export default App
