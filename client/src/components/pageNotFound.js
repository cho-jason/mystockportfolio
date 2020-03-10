import React from 'react'
import { useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation()

  return (
    <div>
      <h1>Page Note Found</h1>
      <p>
        <em>{location.pathname}</em> is not a valid path.
      </p>
    </div>
  )
}
