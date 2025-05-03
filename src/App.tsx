
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";
import PendingItems from "./pages/PendingItems";
import DiscussionNotes from "./pages/DiscussionNotes";
import MyData from "./pages/MyData";
import MyMembership from "./pages/MyMembership";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path="/pending-items" element={<DashboardLayout><PendingItems /></DashboardLayout>} />
          <Route path="/discussion-notes" element={<DashboardLayout><DiscussionNotes /></DashboardLayout>} />
          <Route path="/my-data" element={<DashboardLayout><MyData /></DashboardLayout>} />
          <Route path="/my-membership" element={<DashboardLayout><MyMembership /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
