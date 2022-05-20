import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeroSection } from '../components/Homepage/HeroSection';
import { Box } from '@mantine/core';
import { IntroSection } from '../components/Homepage/IntroSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
    </>
  );
}
