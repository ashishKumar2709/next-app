'use client'
import { SessionProvider } from 'next-auth/react'
import { DefaultSession, Session } from 'next-auth';
import { ReactNode} from 'react';

interface ProviderProps {
  children: ReactNode;
  session: Session | DefaultSession;
}

const Provider:React.FC<ProviderProps> =({children, session} ) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider