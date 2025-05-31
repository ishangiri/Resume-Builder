import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useAuthListener } from '../hooks/useAuthentication'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  // Initialize authentication listener
  useAuthListener();
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
