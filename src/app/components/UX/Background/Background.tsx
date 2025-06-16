import { Box, SxProps, Theme } from "@mui/material";
import Image from "next/image";
import React from "react";
import { BackgroundParams } from "./Background.types";

function Background({ sx, src,alt,imgClassName,imgHeight,imgWidth }: BackgroundParams) {
  const styles: SxProps<Theme> = {
    position: "fixed",
    top: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#2B2727",
    zIndex: -1,
    ...sx,
  };
  return (
    <Box sx={styles}>
      {src && (
        <Image
          src={src}
          height={imgHeight??512}
          width={imgWidth??512}
          alt={alt??"fondo"}
          className={imgClassName??"w-full h-full"}
        ></Image>
      )}
    </Box>
  );
}

export default Background;
