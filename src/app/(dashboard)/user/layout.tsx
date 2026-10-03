import React from 'react'

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        this is user layout
      {children}
    </div>
  )
}
