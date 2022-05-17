import { Text } from '@mantine/core';
import { Heading } from '../Headings/Heading';

export function Welcome() {
  return (
    <>
      <Heading className="displayH1" blue mt={100} order={1} align="center">
        Discover
        <br />
        <Text inherit variant="gradient" component="span">
          Vestland
        </Text>
      </Heading>
    </>
  );
}
