import './globals.css';
import Providers from '../components/Providers';

export const metadata = {
  title: 'MOSAKA BATHWARE | Where Elements Become Art',
  description:
    'Sculptural bathware for contemporary living. Hand-carved live edge teak basins, distinctive designer taps, and refined classical accessories. Dubai, United Arab Emirates.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90" fill="%23d4b47d">M</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0a0a09] text-[#e3ded9]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#d4b47d]/30 selection:text-white overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
