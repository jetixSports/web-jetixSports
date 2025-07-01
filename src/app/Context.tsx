'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import Narbar from "./components/Shared/Navbar/Navbar";
import Footer from "./components/Shared/Footer/Footer";

interface Props {
    children: React.ReactNode;
}
//Componente que coloca los datos de la session a sus componentes hijos
export default function Context({ children }: Props) {
    const { status } = useSession();
    if (status == 'loading')
        return
    return (
        <>
            <Narbar />
            {children}
            <Footer />
        </>
    );
}