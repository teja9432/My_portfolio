
import styles from './App.module.css'
import { Navbar } from './components/Navbar/Navbar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Home } from './components/Home/Home'
import "./index.css"
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Certification } from './components/Certifications/Certification';
import {Projects} from './components/Projects/Projects'; 
import { Contact } from './components/Contact/Contact';
function App() {
 

  return <div className={styles.App}>
 <Navbar/>
 <Home/>
 <About/>
 <Skills/>
<Certification/>
<Projects/>
<Contact/>

   </div>
  
}

export default App
