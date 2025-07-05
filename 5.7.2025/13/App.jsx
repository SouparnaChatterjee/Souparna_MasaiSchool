import {
  Box,
  Flex,
  Grid,
  Button,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cardBg = useColorModeValue('gray.200', 'gray.600');
  const footerBg = useColorModeValue('gray.300', 'gray.800');
  const navBg = useColorModeValue('gray.100', 'gray.700');

  const gridColumns = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3
  });

  return (
    <Box>
      <Flex
        as="nav"
        p="4"
        bg={navBg}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap="4" p="4">
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box key={card} p="4" shadow="md" bg={cardBg} borderRadius="md">
            {card}
          </Box>
        ))}
      </Grid>

      <Box as="footer" p="4" bg={footerBg} color="white">
        {isLoggedIn ? 'Welcome, User' : 'Please log in'}
      </Box>
    </Box>
  );
}

export default App;
