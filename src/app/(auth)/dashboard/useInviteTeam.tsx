"use client"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Inputs from "../../components/UX/Inputs/Inputs";
import Form from "../../components/UX/Form/Form";
import Buttons from "../../components/UX/Buttons/Buttons";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { UsersInList } from "../../admin/usersList/userList.types";
import { Mail } from "@mui/icons-material";

function useInviteTeam({ callback, teamId }: { callback?: () => any, teamId: string | null }) {
  const { post } = useFetch()
  const [users, setUsers] = useState<UsersInList[] | null>(null)
  const [status, setStatus] = useState(false)
  const { data: session, } = useSession();
  const myUser = session?.user;
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState(1)
  const [filter, setFilter] = useState<string[] | []>([])
  const [userId, setUserId] = useState<UsersInList | null>()
  const selectValue = [
    ["firstName", "Nombre"], ["lastName", "Apellido"],
    ["email", "Correo"], ["username", "Nombre de usuario"]
  ]
  useEffect(() => {
    (async () => {
      if (users)
        return
      try {
        const usersData = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/filter', { filter: {}, pagination: 1 })
        setUsers(usersData?.data ?? [])
        setStatus(true)
      } catch (error) {
        toast.error(error + '')
      }
    })()
  }, [])
  async function findUsers() {
    if (!status)
      return
    setStatus(false)
    try {
      const objFilter = filter && filter.length == 2 ? { [filter[0]]: filter[1] } : {}
      const usersData = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/filter', { filter: objFilter, pagination })
      setUsers(usersData?.data ?? [])
      setStatus(true)
    } catch (error) {
      toast.error(error + '')
    }
  }
  useEffect(() => { findUsers() }, [pagination, filter])
  return {
    reactForm: (
      <Form styles={{ Box: { maxHeight: "70vh", maxWidth: "none" } }} handleSubmit={() => { }}>
        <Dialog
          open={open}
          keepMounted
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: "#00003d",
            }
          }}
          onClose={() => setOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ textAlign: "center", color: "white" }}>{"¿Estás Seguro?"}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "white" }} id="alert-dialog-slide-description">
              ¿Estás seguro de invitar a "{userId?.firstName} {userId?.lastName}" a tu equipo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "white" }} onClick={() => setOpen(false)}>Cancelar</Button>
            <Button sx={{ color: "white" }} onClick={async () => {
              try {
                const invitation = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/invitations', 
                  {
                    teamId,
                    userId:userId?._id,
                    invitorId:myUser?._id
                  }
                )
                setStatus(true)
                if (invitation.statusCode != 200)
                  return toast.error(invitation.message)
                toast.success(invitation.message)
                setOpen(false)
                if (callback)
                  callback()
              } catch (error) {
                toast.error(error + "")
                setStatus(true)
              }
              
            }}>Aceptar</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{
          position: "relative",
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" color="white"> Usuarios</Typography>
            <Box sx={{ marginX: 1, display: 'flex', gap: 1, }}>
              <Select sx={{
                paddingX: "10px",
                marginY: "5px",
                backgroundColor: " #04082a",
                borderRadius: "10px",
                color: "white",
                height: 36,
              }} defaultValue={"Todos"} onChange={(e) => setFilter([e.target.value, ''])}>
                <MenuItem value={'Todos'}>Todos</MenuItem>
                {selectValue.map((item, index) => {
                  return <MenuItem key={index} value={item[0]}>{item[1]}</MenuItem>
                })}
              </Select>
              <Inputs sx={filter[0] == "Todos" ? { opacity: 0.6 } : {}} disabled={filter[0] == "Todos"} value={filter[1]} onChange={(e) => {
                const newValue = [filter[0] ?? "", e.target.value ?? '']
                setFilter(newValue)
              }}></Inputs>
              <Buttons sx={{ color: "white", marginY: "5px" }} onClick={() => {
                if (filter[0] == "Todos") {
                  setFilter([])
                } else {
                  setFilter(filter)
                }
                setPagination(1)
              }}>Filtrar</Buttons>
            </Box>
          </Box>
          <Box sx={{
            height: "300px",
            overflowY: "auto",
            marginTop: "20px",
          }}>
            <Table aria-label="Tabla de usuarios">
              <TableHead>
                <TableRow >
                  <TableCell sx={{ color: "white", }}><strong>Nombre</strong></TableCell>
                  <TableCell sx={{ color: "white", }}><strong>Email</strong></TableCell>
                  <TableCell sx={{ color: "white", }}><strong>username</strong></TableCell>
                  <TableCell sx={{ color: "white", }}><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, i) => (
                  <TableRow
                    key={i}
                    hover
                    sx={{ '&:last-child td': { borderBottom: 0 }, overflow: "auto" }}
                  >
                    <TableCell sx={{ color: "white", }}>{user.firstName} {user.lastName}</TableCell>
                    <TableCell sx={{ color: "white", }}>{user.email}</TableCell>
                    <TableCell sx={{ color: "white", }}>{user.username}</TableCell>
                    <TableCell sx={{ color: "white", }}>
                      <IconButton aria-label="Eliminar" color="error"
                        onClick={() => { setOpen(true); setUserId(user) }}
                      >
                        <Mail fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {users?.length == 0 && <TableRow
                  hover
                  sx={{ '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell sx={{ color: "white", }}>No se encontraron usuarios</TableCell></TableRow>}
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button onClick={() => {
              if (pagination > 1)
                setPagination(pagination - 1)
            }} >
              <Typography sx={{ color: "white", }}> {"<"}</Typography>
            </Button>
            <Input onChange={(e) => {
              if (+e.target.value < 1)
                e.target.value = '1'
              setPagination(+e.target.value)
            }} type='number' minRows={1} disabled={!status} sx={{ width: 50, color: "white" }} value={pagination}></Input>
            <Button onClick={() => setPagination(pagination + 1)}>
              <Typography sx={{ color: "white", }}>{">"}</Typography>
            </Button>
          </Box>
        </Box>

      </Form>
    ),
  };
}

export default useInviteTeam