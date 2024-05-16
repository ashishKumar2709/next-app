'use client'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

interface ProviderProps {
  children: ReactNode;
}

const Provider:React.FC<ProviderProps> =({children} ) => {
  const [ session, setSession]= useState<Session | null>(null)
useEffect(()=>{
  const fetchSessions = async()=>{
    const session = await getSession();
    setSession(session)
  }
  fetchSessions();
},[])
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider