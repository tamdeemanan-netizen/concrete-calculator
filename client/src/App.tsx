import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import VolumeCalculator from "./pages/VolumeCalculator";
import MixCalculator from "./pages/MixCalculator";
import History from "./pages/History";
import Knowledge from "./pages/Knowledge";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/volume" component={VolumeCalculator} />
      <Route path="/mix" component={MixCalculator} />
      <Route path="/history" component={History} />
      <Route path="/knowledge" component={Knowledge} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <div className="mobile-app">
              <Router />
            </div>
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
