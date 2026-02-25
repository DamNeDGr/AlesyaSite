import type { IService } from "../Service.types.ts"

interface ServiceProps {
    service: IService
}

export const Service = ({ service }: ServiceProps) => {
    return (
        <>
            <article className="card service-card">
                <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
                <div>
                    {service.prices.map((serv, i) => (
                        <div className="price-row" key={i}>
                            <span>{serv.duration}</span>
                            <strong>{serv.price}</strong>
                        </div>
                    ))}
                </div>
            </article>
        </>
    )
}
