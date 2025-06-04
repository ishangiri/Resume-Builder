import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useAuthListener } from '../hooks/useAuthentication'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  // Initialize authentication listener
  useAuthListener();
  const queryClient = new QueryClient()
  return (

    <React.Fragment>
      <QueryClientProvider client={queryClient}>
      <Outlet />
      </QueryClientProvider>
    </React.Fragment>
  )
}
