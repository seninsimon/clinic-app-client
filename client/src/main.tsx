// main.tsx or index.tsx
import "./index.css"; // ✅ Make sure this is included
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "599558492449-t9ubs9k94g8juhqthtf3n1t5d98ljtgr.apps.googleusercontent.com"}>
            <App />
          </GoogleOAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  
);
