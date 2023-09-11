import React from "react";
import { Alert, AlertColor } from "@mui/material/";

interface AlertProps {
  severity: AlertColor;
  children: React.ReactNode;
}

const CustomAlert: React.FC<AlertProps> = ({ severity, children }) => (
  <Alert severity={severity}>{children}</Alert>
);

export default CustomAlert;
