'use client';

import { SessionProvider } from 'next-auth/react';

interface Props {
    children: React.ReactNode;
}
//Componente que coloca los datos de la session a sus componentes hijos
export default function Providers({ children }: Props) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}