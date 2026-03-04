import useReveal from "@/hooks/useReveal.ts";
import { Services } from "@/components/HomePageComponents/Services";
import { About } from "@/components/HomePageComponents/About";
import { ForWhom } from "@/components/HomePageComponents/ForWhom";
import { Result } from "@/components/HomePageComponents/Result";
import { Trust } from "@/components/HomePageComponents/Trust";
import { Reviews } from "@/components/HomePageComponents/Reviews";
import { Contacts } from "@/components/HomePageComponents/Contacts";

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
