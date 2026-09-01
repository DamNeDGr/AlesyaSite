import useReveal from "@/hooks/useReveal.ts";

export const Reviews = () => {
    const revealRef = useReveal();
    return (
        <>
            <section ref={revealRef} className="section reveal" id="reviews">
                <div className="container">
                    <p className="eyebrow center">Отзывы</p>
                    <h2 className="reviews__title">Что говорят мамы</h2>
                    <div className="cards-grid reviews-grid">
                        <article className="card">
                            <p>
                                «После курса гимнастики сын стал увереннее двигаться, а спина заметно выровнялась. Спасибо за
                                очень внимательное отношение!»
                            </p>
                            <strong className="reviews__contactname">— Марина, мама ребёнка 6 лет</strong>
                        </article>
                        <article className="card">
                            <p>
                                «Пришла сама на массаж с постоянной усталостью в спине. Уже после нескольких встреч стало легче,
                                появилась энергия.»
                            </p>
                            <strong className="reviews__contactname">— Ольга, мама двоих детей</strong>
                        </article>
                        <article className="card">
                            <p>
                                «Очень бережный подход к детям с особенностями развития. На занятиях ребёнок спокоен, а дома лучше
                                спит.»
                            </p>
                            <strong className="reviews__contactname">— Наталья, мама ребёнка 4 лет</strong>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
};
