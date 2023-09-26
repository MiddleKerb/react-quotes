import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { Quote } from "lucide-react";
import ToogleScheme from "../UI/ToogleScheme";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const currentYear = new Date().getFullYear();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header px="lg">
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={0}>
              <ThemeIcon variant="subtle" size="xl">
                <Quote size={30} />
              </ThemeIcon>
              <Text span size="xl" fw={900}>
                Daily&nbsp;
                <Text
                  span
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{ from: "blue", to: "green", deg: 90 }}
                >
                  Quotes
                </Text>
              </Text>
            </Group>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <ToogleScheme />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Stack justify="space-between" style={{ height: "100vh" }}>
          <Stack px="lg">
            <ToogleScheme />
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <Container size="lg">
        <AppShell.Main>{children}</AppShell.Main>
      </Container>

      <AppShell.Footer px="lg" py="md" style={{ position: "inherit" }}>
        <Container size="lg">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text c="dimmed" size="sm">
              Built by TSJ IT &copy;{currentYear}
            </Text>
          </Group>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}
