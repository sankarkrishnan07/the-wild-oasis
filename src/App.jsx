import { StyleSheetManager } from "styled-components";
import emotionIsPropValid from "@emotion/is-prop-valid";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import GlobalStyles from "./ui/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  path=""
                  element={<Navigate replace to="dashboard" />}
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="booking/:id" element={<Booking />} />
                <Route path="checkin/:id" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "600px",
                padding: "16px 24px",
                background: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </StyleSheetManager>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return emotionIsPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}
