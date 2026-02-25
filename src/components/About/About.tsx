import { EducationList, WorkExperienceList } from "./About.data.ts"

export const About = () => {
    return (
        <>
            <section className="section reveal" id="about">
                <div className="container specialist-grid">
                    <div className="specialist-photo-wrap">
                        <img src="/alesya.jpg" alt="Специалист по оздоровительным практикам для детей и женщин" />
                    </div>
                    <article className="specialist-content">
                        <p className="eyebrow">Обо мне</p>
                        <h2>Алеся Шайморданова — специалист по оздоровительным практикам</h2>
                        <p>В работе соединяю бережные практики и уважение к индивидуальным особенностям каждого ребёнка.</p>

                        <h3>Образование</h3>
                        <ul className="check-list">
                            {EducationList.map((educ, i) => (
                                <li key={i}>{educ.title}</li>
                            ))}
                        </ul>

                        <h3>Опыт работы</h3>
                        <ul className="check-list">
                            {WorkExperienceList.map((work, i) => (
                                <li key={i}>{work.title}</li>
                            ))}
                        </ul>

                        <p className="about-highlight">
                            Особое внимание уделяю безопасности, комфорту и работе с детьми с особенностями развития.
                        </p>
                    </article>
                </div>
            </section>
        </>
    )
}
