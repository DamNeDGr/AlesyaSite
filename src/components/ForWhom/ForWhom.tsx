import useReveal from "../../hooks/useReveal.ts"

export const ForWhom = () => {
    const revealRef = useReveal()
    return (
        <>
            <section ref={revealRef} className="section section-soft reveal" id="for-whom">
                <div className="container">
                    <p className="eyebrow center">Кому подойдёт</p>
                    <h2>Поддержка в ситуациях, когда важно действовать мягко и вовремя</h2>
                    <ul className="audience-list">
                        <li>Детям с нарушением осанки.</li>
                        <li>Детям с задержкой речи.</li>
                        <li>При гипер- и гипотонусе.</li>
                        <li>При задержке моторного развития.</li>
                        <li>Для общего укрепления организма ребёнка.</li>
                        <li>Женщинам при усталости, напряжении и болях в спине.</li>
                    </ul>
                </div>
            </section>
        </>
    )
}
