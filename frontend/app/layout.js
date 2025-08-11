import './globals.css';
import AuthHeader from './components/AuthHeader';

export const metadata = {
  title: 'GlobalTrotter - Plan Your Dream Adventure',
  description: 'Create unforgettable trips, discover amazing destinations, and build detailed itineraries with our comprehensive travel planning platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AuthHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}


