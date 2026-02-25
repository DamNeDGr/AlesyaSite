import { useEffect } from "react"

export default function useReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible")
                        observerInstance.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.2 },
        )

        const elements = document.querySelectorAll(".reveal")
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])
}
