import { extendTheme } from '@chakra-ui/react'
export const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {

          w: 'auto',
          p: 2,
          borderRadius: 50
        },
      }
    },
    colors: {
      brand: '#7B2969',
      lightBrand: '#A17096',
      gray: '#C7B6C3',
    }
  })