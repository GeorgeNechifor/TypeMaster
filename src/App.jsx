
import './App.css';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Games from './components/Games';
import Footer from './components/Footer';
export default function App() {

  return (
    
    <div className="container">
      <Header></Header>
      <Keyboard></Keyboard>
      <Games></Games>
      <Footer></Footer>
    </div>

  )
}

