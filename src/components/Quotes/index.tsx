import {
  Badge,
  Blockquote,
  Button,
  Center,
  Grid,
  Skeleton,
  Stack,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import axios from "axios";
import { Check, Copy, Shuffle, TextQuote } from "lucide-react";
import { useEffect, useState } from "react";
import QuoteResponse from "../../Interface/quoteResponse";

export default function Quotes() {
  const [quotes, setQuotes] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clipboard = useClipboard();
  const theme = useMantineTheme();

  const apiUrl = "https://api.quotable.io/random";

  async function getRandomQuotes(controller: AbortController) {
    setIsLoading(true);
    const signal = controller.signal;
    const result = await axios.get(apiUrl, { signal });
    const data = await result.data;

    setQuotes(data);
    setIsLoading(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    getRandomQuotes(controller);

    return () => {
      controller.abort();
    };
  }, []);

  function buttonClickRandom() {
    const controller = new AbortController();
    getRandomQuotes(controller);
  }

  return (
    <>
      <Stack gap="md">
        <Center>
          <Title order={3}>Today quote 🤯</Title>
        </Center>
        <Blockquote
          color={theme.primaryColor}
          cite={
            isLoading ? (
              <Skeleton height={6} mt={6} width="10%" radius="xl" />
            ) : (
              quotes?.author
            )
          }
          icon={<TextQuote />}
          mt="xs"
        >
          {isLoading ? (
            <>
              <Skeleton height={12} mt={6} radius="xl" />
              <Skeleton height={12} mt={6} radius="xl" />
            </>
          ) : (
            <>
              <p>"{quotes?.content}"</p>
              <span>
                {quotes?.tags.map((item, index) => (
                  <Badge key={index} mr="xs">
                    {item}
                  </Badge>
                ))}
              </span>
            </>
          )}
        </Blockquote>
        <Grid>
          <Grid.Col span={6}>
            <Button
              fullWidth
              mt="xs"
              rightSection={<Shuffle size={14} />}
              onClick={() => buttonClickRandom()}
              loading={isLoading}
              loaderProps={{ type: "dots" }}
            >
              Random quote
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Tooltip label="Quote copied!" withArrow opened={clipboard.copied}>
              <Button
                fullWidth
                variant="outline"
                mt="xs"
                rightSection={
                  clipboard.copied ? <Check size={18} /> : <Copy size={18} />
                }
                onClick={() =>
                  clipboard.copy(`${quotes?.author} - ${quotes?.content}`)
                }
                color={clipboard.copied ? "gray" : theme.primaryColor}
                loading={isLoading}
                loaderProps={{ type: "dots" }}
              >
                Copy quote to clipboard
              </Button>
            </Tooltip>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
