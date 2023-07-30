'use client'

// import { authOptions } from '@/utils/authOptions'
import { Metadata } from 'next'
// import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'

// export const metadata: Metadata = {
//   title: 'Next.js'
// }

export default function Home() {
  const { data: session, status } = useSession({required: true})
  // const session = await getServerSession(authOptions)

  if (status === 'loading') {
    return <></>
  }
  // if(!session) {
  //   redirect('/api/auth/signin')
  // }

  return (
    <main>
      <div>
          Main Home Page
      </div>
    </main>
  )
}
