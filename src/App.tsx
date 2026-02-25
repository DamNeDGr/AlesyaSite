import { Header } from "./components/Header"
import { Services } from "./components/Services"
import useReveal from "./hooks/useReveal.ts"
import { About } from "./components/About"
import { ForWhom } from "./components/ForWhom"
import { Result } from "./components/Result"
import { Trust } from "./components/Trust"
import { Reviews } from "./components/Reviews"
import { Contacts } from "./components/Contacts"
import { Footer } from "./components/Footer/Footer.tsx"

function App() {
    useReveal()
    return (
        <>
            <Header />
            <Services />
            <About />
            <ForWhom />
            <Result />
            <Trust />
            <Reviews />
            <Contacts />
            <Footer />
        </>
    )
}

export default App
