"use client"
import { useSession } from "next-auth/react";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Invitation } from "./invitations.types";
import { Teams } from "../dashboard/dashboard.types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function useInvitations({dialogData,setDialogData,}:{setDialogData:(e:null)=>any,dialogData:{accepted:boolean,_idInvitation:string,teamName:string}|null}) {
    const { post } = useFetch()
    const { data: session, } = useSession();
    const user = session?.user;
    const [invitations, setInvitations] = useState<Invitation[] | null>(null)
    const [teams, setTeams] = useState<Teams[] | null>(null)
    const [users, setUsers] = useState<{ _id: string, firstName: string, lastName: string }[] | null>(null)
    const [status, setStatus] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [filter, setFilter] = useState<{ [key: string]: string }>({})
    useEffect(() => {
        (async () => {
            if (!user || invitations)
                return
            try {
                const invitationData = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/invitations/filter', { userId:user?._id })
                const teams = await post(
                    process.env.NEXT_PUBLIC_HOST_SERVICE + "/teams/filterByIds/",
                    { _id: invitationData.data?.map((team: { teamId: string }) => team.teamId) }
                );
                const users = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + "/users/getNames/",
                    { _id: invitationData.data?.map((user: { invitorId: string}) => user.invitorId) }
                )
                setUsers(users?.data??[])
                setTeams(teams?.data??[])
                setInvitations(invitationData?.data ?? [])
                setStatus(true)
            } catch (error) {
                toast.error(error + '')
            }
        })()
    }, [user])
    async function findUsers() {
        if (!status)
            return
        setStatus(false)
        try {
            const filterData=filter.status=="Todos"?{}:filter
            const invitationData = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/invitations/filter', { ...filterData,userId:user?._id})
            setInvitations(invitationData?.data ?? [])
            setStatus(true)
        } catch (error) {
            toast.error(error + '')
        }
    }
    useEffect(() => { findUsers() }, [ filter])
    return {
        teams,users,
        invitations,
        status,
        pagination,
        setPagination,
        setFilter,
        findUsers,
        ReactDialog:<Dialog
                  open={!!dialogData}
                  keepMounted
                  sx={{
                    '& .MuiDialog-paper': {
                      backgroundColor: "#20105B",
                    }
                  }}
                  onClose={() => setDialogData(null)}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle sx={{ textAlign: "center", color: "white" }}>{dialogData?.accepted?"Aceptar":"Rechazar"} Invitación</DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{ color: "white" }} id="alert-dialog-slide-description">
                      ¿Estás seguro de {dialogData?.accepted?"aceptar":"rechazar"} la invitación de {dialogData?.teamName}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button sx={{ color: "white" }} onClick={() => setDialogData(null)}>Cancelar</Button>
                    <Button sx={{ color: "white" }} onClick={async () => {
                      try {
                        const srcInvitation=dialogData?.accepted?"/invitations/accept":"/invitations/deny"
                        const invitation = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + srcInvitation, 
                          {
                            _id:dialogData?._idInvitation
                          }
                        )
                        setStatus(true)
                        if (invitation.statusCode != 200)
                          return toast.error(invitation.message)
                        toast.success(invitation.message)
                        findUsers()
                        setDialogData(null)
                      } catch (error) {
                        toast.error(error + "")
                        setStatus(true)
                      }
                      
                    }}>Aceptar</Button>
                  </DialogActions>
                </Dialog>
    }
}
