import {Dock, Navbar, Welcome } from './components'
import gsap from 'gsap';
import  { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
import { Terminal } from "#windows";



const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
        </main>
    );
};
export default App;
