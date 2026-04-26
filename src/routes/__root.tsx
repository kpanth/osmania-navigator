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
      { property: "og:title", content: "Osmania Campus Care — Smart Navigation" },
      { name: "twitter:title", content: "Osmania Campus Care — Smart Navigation" },
      { property: "og:description", content: "Indoor turn-by-turn navigation for Osmania University College of Engineering, Hyderabad." },
      { name: "twitter:description", content: "Indoor turn-by-turn navigation for Osmania University College of Engineering, Hyderabad." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/93f478db-f255-4b11-a815-1bba7d0b1c36/id-preview-74fd0053--63960b6d-7172-4a67-abc5-b898fa47f7df.lovable.app-1777183528461.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/93f478db-f255-4b11-a815-1bba7d0b1c36/id-preview-74fd0053--63960b6d-7172-4a67-abc5-b898fa47f7df.lovable.app-1777183528461.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
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
