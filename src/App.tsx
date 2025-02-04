import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import CommonLayout from "./components/CommonLayout";
import Loading from "./components/Loading";
import Logout from "./components/Logout";
import LibraryDetail from "./features/LibraryDetail/LibraryDetail";
import Comments from "./pages/CommentsPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import TagChecklist from "./pages/TagChecklistPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<HomePage />} />

        {/* Protected routes wrapped with AuthenticationGuard */}
        <Route element={<AuthenticationGuard component={CommonLayout} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="property/:propertyId/library/:libraryId"
            element={<LibraryDetail />}
          />
          <Route path="checklist" element={<TagChecklist />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        <Route path="/logout" element={<Logout />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<div>error</div>} />
      </Routes>

      <Toaster
        position="bottom-right"
        containerStyle={{ margin: "25px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
