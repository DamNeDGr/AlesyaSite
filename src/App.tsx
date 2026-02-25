import { Header } from "./components/Header"
import useReveal from "./hooks/useReveal.ts"
import { Footer } from "./components/Footer/Footer.tsx"
import { HomePage } from "./Pages/HomePage/HomePage.tsx"

function App() {
    useReveal()
    return (
        <>
            <Header />
            <HomePage />
            <Footer />
        </>
    )
}

export default App
