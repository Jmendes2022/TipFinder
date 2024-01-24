import { extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
  styles: {
    global: {
      md: {
        '.Nav-item:hover': {
          color: 'gray.50',
          fontSize: '2.1rem',
          cursor: 'pointer',
      },
    },
    body: {
          fontFamily: `Obitron, sans-serif`,
          color: '#e6e6e6',
          fontSize: '1.5rem',
          letterSpacing: '1px'
        },
    '.btn': {
        color: 'red'
    },
    '.header': {
        color: '#1b1b1b',
        textAlign: 'center',
        mt: '2rem;'
    },
    '.label, .input, .text': {
        color: '#1b1b1b',
    },
    },
  },
});

export default theme;