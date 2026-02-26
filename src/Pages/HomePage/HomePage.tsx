import useReveal from "@/hooks/useReveal.ts";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { ForWhom } from "@/components/ForWhom";
import { Result } from "@/components/Result";
import { Trust } from "@/components/Trust";
import { Reviews } from "@/components/Reviews";
import { Contacts } from "@/components/Contacts";

export const HomePage = () => {
    useReveal();
    return (
        <>
            <Services />
            <About />
            <ForWhom />
            <Result />
            <Trust />
            <Reviews />
            <Contacts />
        </>
    );
};
