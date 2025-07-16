import { Payment } from "@mui/icons-material";

type Payment = {
  _id: string;
  _idUser: string;
  _idTeam: string;
  transactionCode: string;
  amount: number;
  rateExchange: number;
  currency: string;
  status: "pending" | "accepted" | "denied";
  _idImg?: string;
  creationDate?: string;
};

type Team = {
  _id: string;
  name: string;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type {Payment, Team, User};