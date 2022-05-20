import { Global } from '@mantine/core';

export function GlobalCss() {
  return (
    <Global
      styles={(theme) => ({
        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.other.backgroundColor,
          color: theme.black,
        },
      })}
    />
  );
}
