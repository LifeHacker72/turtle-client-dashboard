
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
import InvestmentsForm from "./pages/InvestmentsForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Index />} />
            <Route path="pending-items" element={<PendingItems />} />
            <Route path="discussion-notes" element={<DiscussionNotes />} />
            <Route path="my-data" element={<MyData />} />
            <Route path="my-data/investments" element={<InvestmentsForm />} />
            <Route path="my-membership" element={<MyMembership />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
