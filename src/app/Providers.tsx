'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

interface Props {
    children: React.ReactNode;
}
//Componente que coloca los datos de la session a sus componentes hijos
export default function Providers({ children }: Props) {

    return (
        <SessionProvider>
            <Toaster
                toastOptions={{
                    style: {
                        zIndex: 9999, // Asegúrate de que esté por encima de todo
                    },
                }}
            />
            {children}
        </SessionProvider>
    );
}