import { useEffect, useRef } from "react"

export default function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null)
    useEffect(() => {
        if (!ref.current) return
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

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])
    return ref
}
