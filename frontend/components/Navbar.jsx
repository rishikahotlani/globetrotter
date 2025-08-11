export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-semibold text-xl">GlobalTrotter</a>
        <nav className="space-x-6 text-sm">
          <a className="hover:text-blue-600" href="/trips">My Trips</a>
          <a className="hover:text-blue-600" href="/">Dashboard</a>
        </nav>
      </div>
    </header>
  );
}


