import useReveal from "@/hooks/useReveal.ts";

export const Result = () => {
    const revealRef = useReveal();
    return (
        <>
            <section ref={revealRef} className="section reveal" id="results">
                <div className="container narrow">
                    <p className="eyebrow center">Результаты</p>
                    <h2 className="results__title">Мягкие и реалистичные изменения, которые замечают мамы</h2>
                    <div className="results-grid">
                        <article className="card">
                            <h3 className="results_card__title">Спокойнее сон</h3>
                            <p>Ребёнок и мама легче расслабляются и быстрее восстанавливаются.</p>
                        </article>
                        <article className="card">
                            <h3 className="results_card__title">Меньше тревожности</h3>
                            <p>Регулярные занятия помогают снизить напряжение и улучшить эмоциональный фон.</p>
                        </article>
                        <article className="card">
                            <h3 className="results_card__title">Крепче мышцы и осанка</h3>
                            <p>Постепенно формируется более правильное положение тела и выносливость.</p>
                        </article>
                        <article className="card">
                            <h3 className="results_card__title">Больше энергии в течение дня</h3>
                            <p>Движения становятся свободнее, ребёнок лучше включается в игру и обучение.</p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
};
