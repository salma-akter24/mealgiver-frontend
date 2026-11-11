import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { HelmetProvider } from "react-helmet-async";

const applyStoredTheme = () => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const nextTheme = savedTheme ? savedTheme : preferredDark ? "dark" : "light";

  root.setAttribute("data-theme", nextTheme);
  root.classList.toggle("dark", nextTheme === "dark");
  root.style.colorScheme = nextTheme;
};

applyStoredTheme();
AOS.init();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
