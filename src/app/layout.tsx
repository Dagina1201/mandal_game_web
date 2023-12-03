'use client'

import localFont from 'next/font/local'
import './globals.css'
import { ChakraProvider, extendTheme, ChakraBaseProvider } from '@chakra-ui/react'
import { theme } from '@/theme/theme'

const myFont = localFont({ src: '../../public/font/Minecraftia-Regular.ttf' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={myFont.className}>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>

    </html>
  )
}
