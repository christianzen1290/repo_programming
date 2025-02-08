// app/layout.tsx
import './globals.css'; // Import your global Tailwind CSS file

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}