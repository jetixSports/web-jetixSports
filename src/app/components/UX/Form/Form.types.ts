import { SxProps } from "@mui/material";

interface FormParams {
  styles?: { Box?: SxProps; form?: SxProps };
  children?: React.ReactNode;
}

export type { FormParams };
