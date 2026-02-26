import useReveal from "../../hooks/useReveal.ts"

export const Result = () => {
    const revealRef = useReveal()
    return (
        <>
            <section ref={revealRef} className="section reveal" id="results">
                <div className="container narrow">
                    <p className="eyebrow center">Результаты</p>
                    <h2>Мягкие и реалистичные изменения, которые замечают мамы</h2>
                    <div className="results-grid">
                        <article className="card">
                            <h3>Спокойнее сон</h3>
                            <p>Ребёнок и мама легче расслабляются и быстрее восстанавливаются.</p>
                        </article>
                        <article className="card">
                            <h3>Меньше тревожности</h3>
                            <p>Регулярные занятия помогают снизить напряжение и улучшить эмоциональный фон.</p>
                        </article>
                        <article className="card">
                            <h3>Крепче мышцы и осанка</h3>
                            <p>Постепенно формируется более правильное положение тела и выносливость.</p>
                        </article>
                        <article className="card">
                            <h3>Больше энергии в течение дня</h3>
                            <p>Движения становятся свободнее, ребёнок лучше включается в игру и обучение.</p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    )
}
