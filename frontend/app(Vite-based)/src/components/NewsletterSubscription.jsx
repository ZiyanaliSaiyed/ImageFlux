import { useState } from 'react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-xl bg-opacity-40 bg-purple-900 backdrop-blur-md border border-purple-800 shadow-lg">
      {!subscribed ? (
        <>
          <h2 className="text-2xl font-bold text-white mb-3 text-center">Join Our Newsletter</h2>
          <p className="text-purple-200 mb-6 text-center">
            Receive updates, fresh artwork drops, and behind-the-scenes tech insights.
          </p>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-purple-950 bg-opacity-50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Your email address"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Subscribe</span>
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Thank You!</h3>
          <p className="text-purple-200">
            You're officially in the loop. We'll keep you updated with the latest from ImageFlux.
          </p>
        </div>
      )}
    </div>
  );
}