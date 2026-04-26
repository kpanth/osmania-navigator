import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { NavigationProvider } from "../context/NavigationContext";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Osmania Campus Care — Smart Navigation" },
      { name: "description", content: "Indoor turn-by-turn navigation for Osmania University College of Engineering, Hyderabad." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => (
    <NavigationProvider>
      <div className="app-shell">
        <Outlet />
      </div>
    </NavigationProvider>
  ),
  notFoundComponent: () => (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>404</h1><p>Page not found.</p>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
