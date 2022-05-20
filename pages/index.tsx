import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeroSection } from '../components/Homepage/HeroSection';
import { Box } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Box sx={{ height: '2000px', backgroundColor: 'blue' }}></Box>
    </>
  );
}
