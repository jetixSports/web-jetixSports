'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import Narbar from "./components/Shared/Navbar/Navbar";
import Footer from "./components/Shared/Footer/Footer";
import { Box } from '@mui/material';

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
            <Box sx={{ display: 'flex', flexDirection: "column", minHeight: "100vh" }}>
                <Box sx={{ flex: 1 }} id={"Container"}>
                    {children}
                </Box>
                <Footer />
            </Box>
        </>
    );
}