export const Header = () => {
    return (
        <header className="hero" id="top">
            <div className="hero-overlay"></div>
            <nav className="container nav">
                <a className="brand" href="#top">
                    Студия развития Шаймордановых
                </a>
                <div className="nav-links">
                    <a href="#services">Услуги и цены</a>
                    <a href="#about">Обо мне</a>
                    <a href="#for-whom">Кому подойдёт</a>
                    <a href="#contacts">Контакты</a>
                </div>
            </nav>

            <div className="container hero-content reveal">
                <p className="eyebrow">Оздоровительные практики для женщин и детей 0–14 лет</p>
                <h1>Бережно помогаю детям и женщинам чувствовать себя сильнее и спокойнее каждый день</h1>
                <p className="hero-subtitle">
                    Мягкое восстановление, индивидуальные программы — без лишней нагрузки и сложных терминов.
                </p>
                <div className="hero-actions">
                    <a className="btn btn-primary" href="#contacts">
                        Записаться на консультацию
                    </a>
                    <a className="btn btn-secondary" href="#services">
                        Посмотреть услуги
                    </a>
                </div>
            </div>
        </header>
    )
}
