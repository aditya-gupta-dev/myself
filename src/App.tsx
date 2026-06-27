import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from './Portfolio';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Portfolio />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
