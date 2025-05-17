// pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer'; // Import the Footer component

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Amazing Care
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your trusted online clinic for compassionate and professional healthcare.
          </p>
          <Link
            to="/appointment"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            About Amazing Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                At Amazing Care, we strive to provide accessible, high-quality
                healthcare services through our online platform, ensuring every
                patient receives personalized and compassionate care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Services
              </h3>
              <p className="text-gray-600">
                From virtual consultations to follow-up care, our experienced
                medical professionals are here to support your health needs,
                anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Schedule your appointment today and experience healthcare that puts you
            first.
          </p>
          <Link
            to="/appointment"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;