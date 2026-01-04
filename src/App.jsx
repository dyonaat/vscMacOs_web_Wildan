import {Dock, Navbar, Welcome} from './components'
import gsap from 'gsap';
import  { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
import ImageHost from "#windows/ImageHost.jsx";
import { Terminal, Safari, Resume, Finder, Text, Image, Gallery } from "#windows";
import TextHost from '#windows/TextHost.jsx';
import { Contact } from '#windows';



const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume/>
            <Finder/>
            <Gallery />
            <Text />
            <Image />
            <ImageHost />
            <TextHost />
            <Contact />
        </main>
    );
};
export default App;
