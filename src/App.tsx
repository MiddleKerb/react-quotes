import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "./components/Layout";
import ListQuotes from "./components/ListQuotes";
import Quotes from "./components/Quotes";
import { theme } from "./theme";

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Layout>
        <Quotes />
        <ListQuotes />
      </Layout>
    </MantineProvider>
  );
}

export default App;
