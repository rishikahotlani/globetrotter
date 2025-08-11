import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF7D29] via-[#FFBF78] to-[#FFEEA9] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FEFFD2] rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-[#FEFFD2] rounded-full animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#FEFFD2] rounded-full animate-float"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center animate-slide-up">
            <h1 className="hero-title font-bold mb-6 leading-tight">
              Plan Your Dream
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FEFFD2] to-[#FFEEA9]">
                Adventure
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-[#FEFFD2]">
              Create unforgettable trips, discover amazing destinations, and build detailed itineraries 
              with our comprehensive travel planning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register" 
                className="bg-[#FEFFD2] text-[#FF7D29] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FFEEA9] transition-all duration-300 hover-lift shadow-lg"
              >
                Start Planning Free
              </Link>
              <Link 
                href="/login" 
                className="border-2 border-[#FEFFD2] text-[#FEFFD2] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FEFFD2] hover:text-[#FF7D29] transition-all duration-300 hover-lift"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl opacity-30 animate-float">✈️</div>
        <div className="absolute top-40 right-20 text-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}>🗺️</div>
        <div className="absolute bottom-20 left-1/4 text-2xl opacity-30 animate-float" style={{animationDelay: '2s'}}>🌍</div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-[#FF7D29] mb-4">
              Everything You Need for Perfect Travel Planning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial inspiration to detailed day-by-day itineraries, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card bg-gradient-to-br from-[#FEFFD2] to-[#FFEEA9] border-[#FFBF78]">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-[#FF7D29] mb-3">Discover Cities</h3>
              <p className="text-gray-700 mb-4">
                Explore destinations with detailed information about costs, highlights, and travel tips.
              </p>
              <Link href="/cities" className="text-[#FF7D29] hover:text-[#FFBF78] font-medium">
                Explore Cities →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="feature-card bg-gradient-to-br from-[#FFEEA9] to-[#FFBF78] border-[#FF7D29]">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-[#FF7D29] mb-3">Find Activities</h3>
              <p className="text-gray-700 mb-4">
                Browse activities by type, cost, duration, and location to fill your itinerary.
              </p>
              <Link href="/activities" className="text-[#FF7D29] hover:text-[#FFBF78] font-medium">
                Browse Activities →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="feature-card bg-gradient-to-br from-[#FFBF78] to-[#FF7D29] border-[#FF7D29]">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-xl font-semibold text-white mb-3">Build Itineraries</h3>
              <p className="text-[#FEFFD2] mb-4">
                Create detailed day-by-day plans with activities, budgets, and city visits.
              </p>
              <Link href="/trips" className="text-[#FEFFD2] hover:text-[#FFEEA9] font-medium">
                Start Planning →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="feature-card bg-gradient-to-br from-[#FEFFD2] to-[#FFEEA9] border-[#FFBF78]">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-[#FF7D29] mb-3">Budget Management</h3>
              <p className="text-gray-700 mb-4">
                Track expenses, set budgets, and get cost breakdowns for your entire trip.
              </p>
              <Link href="/trips" className="text-[#FF7D29] hover:text-[#FFBF78] font-medium">
                Manage Budget →
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="feature-card bg-gradient-to-br from-[#FFEEA9] to-[#FFBF78] border-[#FF7D29]">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-[#FF7D29] mb-3">Mobile Friendly</h3>
              <p className="text-gray-700 mb-4">
                Access your travel plans anywhere with our responsive, mobile-optimized design.
              </p>
              <span className="text-[#FF7D29] font-medium">Available Everywhere</span>
            </div>

            {/* Feature 6 */}
            <div className="feature-card bg-gradient-to-br from-[#FFBF78] to-[#FF7D29] border-[#FF7D29]">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
              <p className="text-[#FEFFD2] mb-4">
                Your travel plans are private and secure with JWT authentication.
              </p>
              <span className="text-[#FEFFD2] font-medium">100% Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#FEFFD2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-[#FF7D29] mb-2">100+</div>
              <div className="text-[#FF7D29]">Cities Worldwide</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-[#FFBF78] mb-2">500+</div>
              <div className="text-[#FFBF78]">Activities Available</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl font-bold text-[#FFEEA9] mb-2">1000+</div>
              <div className="text-[#FFEEA9]">Happy Travelers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF7D29] to-[#FFBF78] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#FFBF78] rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#FFEEA9] rounded-full animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Next Adventure?
          </h2>
          <p className="text-xl text-[#FEFFD2] mb-8">
            Join thousands of travelers who are already planning their dream trips with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-[#FEFFD2] text-[#FF7D29] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FFEEA9] transition-all duration-300 hover-lift"
            >
              Create Free Account
            </Link>
            <Link 
              href="/login" 
              className="border-2 border-[#FEFFD2] text-[#FEFFD2] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FEFFD2] hover:text-[#FF7D29] transition-all duration-300 hover-lift"
            >
              Sign In to Continue
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFBF78] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌍</span>
                GlobalTrotter
              </h3>
              <p className="text-[#FEFFD2]">
                Your complete travel planning companion for unforgettable adventures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-[#FFEEA9]">
                <li><Link href="/cities" className="hover:text-[#FEFFD2] transition-colors">City Discovery</Link></li>
                <li><Link href="/activities" className="hover:text-[#FEFFD2] transition-colors">Activity Search</Link></li>
                <li><Link href="/trips" className="hover:text-[#FEFFD2] transition-colors">Trip Planning</Link></li>
                <li><Link href="/trips" className="hover:text-[#FEFFD2] transition-colors">Budget Management</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-[#FFEEA9]">
                <li><Link href="/login" className="hover:text-[#FEFFD2] transition-colors">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-[#FEFFD2] transition-colors">Create Account</Link></li>
                <li><Link href="/trips" className="hover:text-[#FEFFD2] transition-colors">My Trips</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-[#FFEEA9]">
                <li className="hover:text-[#FEFFD2] transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-[#FEFFD2] transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-[#FEFFD2] transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-[#FEFFD2] transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#FFBF78] mt-8 pt-8 text-center text-[#FFEEA9]">
            <p>&copy; 2024 GlobalTrotter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
