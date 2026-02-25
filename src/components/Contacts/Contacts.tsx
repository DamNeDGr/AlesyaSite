import { useEffect } from "react"

export const Contacts = () => {
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=3f679b5c-bbe5-44e7-ac83-346561479344&lang=ru_RU&load=Geolink"
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])
    return (
        <>
            <section className="section reveal" id="contacts">
                <div className="container contacts-grid">
                    <div>
                        <p className="eyebrow">Контакты</p>
                        <h2>Буду рада вашему обращению</h2>
                        <p>
                            <strong>Адрес:</strong> <span className="ymaps-geolink">г. Самара, ул. Победы, д. 149</span>
                        </p>
                        <p>
                            <strong>Телефон:</strong> <a href="tel:+79874425519">+7 (987) 442-55-19</a>
                        </p>
                        <p>
                            <strong>Вконтакте:</strong>
                            <a href="https://vk.ru/mir_detej63">Написать в Вконтакте</a>
                        </p>
                        <p>
                            <strong>Telegram:</strong>
                            <a href="https://t.me/Alisa93mirdetstva">Написать в Telegram</a>
                        </p>
                    </div>
                    <div className="map-wrap">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Af6fd393a7b332cab06a97b59677701f6a969360a835573223216e2aff753c373&amp;source=constructor"
                            width="614"
                            height="537"
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    )
}
