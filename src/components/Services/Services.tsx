import { Service } from "./Service"
import type { IService } from "./Service.types.ts"

const centerServices: IService[] = [
    {
        title: "Оздоровительный массаж для женщин и детей",
        description: "Мягкая ручная работа для снятия напряжения, улучшения самочувствия и поддержки организма.",
        prices: [
            {
                duration: "45 минут",
                price: "1 200 ₽",
            },
        ],
    },
    {
        title: "Оздоровительная гимнастика для детей",
        description: "Индивидуальные занятия для укрепления мышц, развития координации и уверенного движения в своём темпе.",
        prices: [
            {
                duration: "30 минут",
                price: "900 ₽",
            },
            {
                duration: "60 минут",
                price: "1 550 ₽",
            },
        ],
    },
    {
        title: "Детская йога",
        description: "Практика осознанного движения для гибкости, устойчивости, внимания и мягкой разгрузки нервной системы.",
        prices: [
            {
                duration: "30 минут",
                price: "900 ₽",
            },
            {
                duration: "60 минут",
                price: "1 550 ₽",
            },
        ],
    },
    {
        title: "Комплексное развитие детей",
        description: "Игровые и развивающие занятия с элементами нейропсихологии и сенсорной интеграции.",
        prices: [
            {
                duration: "30 минут",
                price: "900 ₽",
            },
            {
                duration: "60 минут",
                price: "1 550 ₽",
            },
        ],
    },
    {
        title: "Психолог",
        description: "Психологическая консультация.",
        prices: [
            {
                duration: "30 минут",
                price: "1 000 ₽",
            },
            {
                duration: "60 минут",
                price: "2 000 ₽",
            },
        ],
    },
    {
        title: "Подготовка к школе",
        description: "Игровые и развивающие занятия с элементами нейропсихологии и сенсорной интеграции.",
        prices: [
            {
                duration: "30 минут",
                price: "700 ₽",
            },
            {
                duration: "60 минут",
                price: "1 400 ₽",
            },
        ],
    },
]

export const Services = () => {
    return (
        <>
            <section className="section section-soft reveal" id="services">
                <div className="container">
                    <p className="eyebrow center">Услуги и цены</p>
                    <h2>Понятные форматы занятий с акцентом на здоровье и развитие</h2>
                    <div className="cards-grid services-grid">
                        {centerServices.map((service) => (
                            <Service service={service} />
                        ))}
                    </div>
                    <p className="section-note">
                        Каждое занятие адаптируется под возраст, состояние и задачи ребёнка или женщины: безопасно, внимательно и
                        с понятными рекомендациями для дома.
                    </p>
                </div>
            </section>
        </>
    )
}
