"use client"
import { useSession } from "next-auth/react";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UsersInList } from "./userList.types";
import { useRouter } from "next/navigation";

export default function useUserList() {
  const { post } = useFetch()
  const router = useRouter()
  const { data: session, } = useSession();
  const user = session?.user;
  const [users, setUsers] = useState<UsersInList[] | null>(null)
  const [status, setStatus] = useState(false)
  const [pagination, setPagination] = useState(1)
  const [filter, setFilter] = useState<{ [key: string]: string }>({})
  useEffect(() => {
    (async () => {
      if (!user || users)
        return
      if (user?.role != 'admin') {
        toast.error('No posees permiso para entrar en esta vista')
        return
      }
      try {
        const usersData = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/filter', { filter: {}, pagination: 1 })
        setUsers(usersData?.data ?? [])
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
      const usersData = await post(process.env.NEXT_PUBLIC_HOST_SERVICE + '/users/filter', { filter, pagination })
      setUsers(usersData?.data ?? [])
      setStatus(true)
    } catch (error) {
      toast.error(error + '')
    }
  }
  useEffect(()=>{findUsers()},[pagination,filter])
  return {
    users,
    status,
    pagination,
    setPagination,
    setFilter,
    findUsers
  }
}
