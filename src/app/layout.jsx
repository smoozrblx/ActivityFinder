import localFont from "next/font/local";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta Tags for SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Activity Finder is a search engine to discover activities near a specific city. Find fun things to do wherever you are!" />
        <meta name="keywords" content="Activity Finder, city activities, things to do, find activities, search engine, events, explore, adventure, travel, discover" />
        <meta name="author" content="Rayane B. (smoozrblx)" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Activity Finder" />
        <meta property="og:description" content="Discover exciting activities near any city with Activity Finder. Your search engine for local events and things to do!" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Activity Finder" />
        <meta name="twitter:description" content="Find the best activities near your city with Activity Finder. Search for local events, adventures, and more!" />
        <meta name="twitter:creator" content="@activityfiner" />

        {/* Favicons */}
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/ico" href="/favicon/favicon32x32.ico" sizes="32x32" />
        <link rel="icon" type="image/ico" href="/favicon/favicon16x16.ico" sizes="16x16" />

        <title>
          Activity Finder — Let's go on an adventure!
        </title>
        
        {/* Leaflet CSS and JS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
