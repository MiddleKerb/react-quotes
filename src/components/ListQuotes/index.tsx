import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import axios from "axios";
import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ListQuoteResponse from "../../Interface/pageQuotesResponse";

export default function ListQuotes() {
  const [quotes, setQuotes] = useState<ListQuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [keyQuote, setKeyQuote] = useState<number>(0);
  const theme = useMantineTheme();

  const clipboard = useClipboard();

  const apiUrl = useMemo(() => {
    const url = new URL(import.meta.env.VITE_QUOTE_BASE_URL + "/quotes");
    url.searchParams.append("page", pages.toString());
    return url.toString();
  }, [pages]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get<ListQuoteResponse>(
          `${apiUrl}?page=${pages}`
        );
        if (pages > 1) {
          setQuotes((old) => ({
            ...response.data!,
            results: [...old!.results, ...response.data.results],
          }));
        } else {
          setQuotes(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [pages, apiUrl]);

  function buttonCopy(content: string, key: number) {
    clipboard.copy(content);
    setKeyQuote(key);
  }

  return (
    <section>
      <Divider my="sm" mt="lg" />
      <Title order={4} mt="lg">
        List Quotes
      </Title>
      {isLoading && pages == 1 ? (
        <Card mb="lg" mt="xs" shadow="sm" padding="lg" radius="md" withBorder>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Card>
      ) : (
        <>
          <Grid grow mb="lg" mt="xs" align="stretch">
            {quotes?.results.map((quote, quoteIndex) => (
              <Grid.Col key={quoteIndex} span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text fw={500}>{quote.author}</Text>
                  <span>
                    {quote?.tags.map((tags, tagsindex) => (
                      <Badge
                        key={tagsindex}
                        color={theme.primaryColor}
                        variant="light"
                        mr="xs"
                        size="sm"
                      >
                        {tags}
                      </Badge>
                    ))}
                  </span>
                  <Text size="sm" c="dimmed">
                    {quote.content}
                  </Text>
                  <Tooltip
                    label="Quote copied!"
                    withArrow
                    opened={clipboard.copied && quoteIndex == keyQuote}
                  >
                    <Button
                      fullWidth
                      variant="subtle"
                      mt="xs"
                      rightSection={
                        clipboard.copied && quoteIndex == keyQuote ? (
                          <Check size={18} />
                        ) : (
                          <Copy size={18} />
                        )
                      }
                      onClick={() =>
                        buttonCopy(
                          `${quote.author} - ${quote.content}`,
                          quoteIndex
                        )
                      }
                      color={
                        clipboard.copied && quoteIndex == keyQuote
                          ? "gray"
                          : theme.primaryColor
                      }
                    >
                      Copy quote to clipboard
                    </Button>
                  </Tooltip>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
      <Button
        fullWidth
        loading={isLoading}
        loaderProps={{ type: "dots" }}
        onClick={() => setPages((old) => old + 1)}
      >
        Load more quotes
      </Button>
    </section>
  );
}
