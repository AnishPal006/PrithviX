import "./globals.css";

export const metadata = {
  title: "PrithviX - Landslide Risk Monitoring",
  description: "AI-Powered Landslide Risk Intelligence System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
