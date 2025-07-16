"use client";
import { useSession } from "next-auth/react";
import useFetch from "@/src/app/hooks/useFetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import { Payment, Team, User } from "./paymentsType";

export default function usePayments({
  tournamentId,
  dialogData,
  setDialogData,
}: {
  tournamentId: string;
  setDialogData: (e: null) => any;
  dialogData: { accepted: boolean; _idPayment: string; teamName: string } | null;
}) {
  const { post } = useFetch();
  const { data: session } = useSession();
  const user = session?.user;

  const [payments, setPayments] = useState<Payment[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<{ status?: string }>({});
  const [pagination, setPagination] = useState(1);

  const fetchPayments = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const tournamentRes = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/tournaments`,
        { _id: tournamentId }
      );

      const paymentIds: string[] = tournamentRes.data?._idPayments || [];
      if (paymentIds.length === 0) {
        setPayments([]);
        return;
      }

      const queryParams: any = {
        _id: paymentIds,
      };

      if (filter.status && filter.status !== "Todos") {
        queryParams.status = filter.status;
      }

      const paymentsRes = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}/payments-history`,
        queryParams
      );

      const paymentsData: Payment[] = paymentsRes.data ?? [];

      const userIds = [...new Set(paymentsData.map(p => p._idUser))];
      const teamIds = [...new Set(paymentsData.map(p => p._idTeam))];

      const [usersRes, teamsRes] = await Promise.all([
        post(`${process.env.NEXT_PUBLIC_HOST_SERVICE}/users/getNames`, {
          _id: userIds,
        }),
        post(`${process.env.NEXT_PUBLIC_HOST_SERVICE}/teams/filterByIds`, {
          _id: teamIds,
        }),
      ]);

      setUsers(usersRes.data ?? []);
      setTeams(teamsRes.data ?? []);
      setPayments(paymentsData);
    } catch (error) {
      console.error("Error al cargar pagos:", error);
      toast.error("Error al cargar los pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user, tournamentId]);

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const handlePaymentAction = async (accepted: boolean, _idPayment: string) => {
    try {
      const endpoint = accepted
        ? "/payments-history/verify"
        : "/payments-history/denied";

      const response = await post(
        `${process.env.NEXT_PUBLIC_HOST_SERVICE}${endpoint}`,
        {
          _idUser: user?._id,
          _idPayment,
        },
        true
      );

      if (!response.ok && response.statusCode !== 200) {
        throw new Error(response.message || "Error al procesar el pago");
      }

      toast.success(response.message);
      setDialogData(null);
      fetchPayments(); // Refrescar
    } catch (error: any) {
      toast.error(error.message || "Error al procesar el pago");
    }
  };

  return {
    payments,
    users,
    teams,
    loading,
    setFilter,
    pagination,
    setPagination,
    fetchPayments,
    ReactDialog: (
      <Dialog
        open={!!dialogData}
        keepMounted
        sx={{ '& .MuiDialog-paper': { backgroundColor: "#20105B" } }}
        onClose={() => setDialogData(null)}
      >
        <DialogTitle sx={{ textAlign: "center", color: "white" }}>
          {dialogData?.accepted ? "Aceptar" : "Rechazar"} Pago
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>
            ¿Estás seguro de {dialogData?.accepted ? "aceptar" : "rechazar"} el pago del equipo <strong>{dialogData?.teamName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={() => setDialogData(null)}>
            Cancelar
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => {
              if (dialogData) {
                handlePaymentAction(dialogData.accepted, dialogData._idPayment);
              }
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    ),
  };
}
