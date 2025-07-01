import { Box, SxProps, Theme } from "@mui/material";
import Image from "next/image";
import React from "react";
import { UserIconParams } from "./UserIcon.types";
import { Person } from "@mui/icons-material";

function UserIcon({ sx, src }: UserIconParams) {
    const styles: SxProps<Theme> = {
        display:'flex',
        width: "100%",
        height: "100%",
        backgroundColor: "#EDEAE9",
        border: 'solid 2px #383837',
        borderRadius: '1000px',
        ...sx,
    };
    return (
        <Box sx={styles}>
            {src ?
                <Image
                    src={process.env.NEXT_PUBLIC_HOST_SERVICE + src}
                    height={128}
                    width={128}
                    alt={"fondo"}
                    className={"w-full h-full"}
                ></Image> :
                <Person sx={{color:'black', margin:'auto'}}/>
            }
        </Box>
    );
}

export default UserIcon;
