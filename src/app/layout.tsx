import AuthContext from './AuthContext'
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
