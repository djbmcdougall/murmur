import React, { useState, useRef } from 'react';
import { Mic, Brain, Lock, MessageSquare, ChevronRight, Star, Search } from 'lucide-react';
import { Logo } from './components/Logo';

function App() {
  const betaSignupRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    useCase: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const scrollToBetaSignup = () => {
    betaSignupRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const features = [
    {
      icon: Mic,
      title: "Speak, Don't Type",
      description: "Record your true experience in seconds. Capture emotion beyond text with no editing, no filtering - just pure, unfiltered recommendations."
    },
    {
      icon: Brain,
      title: "AI-Powered Authenticity",
      description: "Advanced technology that understands nuance, combining emotional intelligence with recommendations to preserve the human touch in every insight."
    },
    {
      icon: Search,
      title: "Discover with Confidence",
      description: "Find recommendations that truly matter with personalized discovery. Connect with like-minded explorers in a community built on trust."
    }
  ];

  const testimonials = [
    {
      quote: "Murmur changed how I make decisions. It's like having a trusted friend's recommendation for everything.",
      author: "Sarah K.",
      title: "Early Adopter"
    },
    {
      quote: "Finally, a platform that captures the real story behind a recommendation!",
      author: "Michael T.",
      title: "Tech Enthusiast"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 animate-gradient text-white relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-purple-950/40 to-transparent opacity-70" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed w-full bg-slate-950/90 backdrop-blur-lg z-50 border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo className="h-10 w-10 text-purple-400" />
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">MURMUR</span>
            </div>
            <button 
              onClick={scrollToBetaSignup}
              className="bg-purple-800/90 hover:bg-purple-700 px-6 py-2 rounded-full transition-all duration-300 shadow-lg shadow-purple-900/40 hover:shadow-purple-800/60 backdrop-blur-sm"
            >
              Join Now
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                The Platform That's on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                  Everyone's Lips
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Transform your genuine experiences into powerful insights. Murmur is the first voice-powered platform that turns your authentic recommendations into a community-driven discovery engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToBetaSignup}
                  className="group bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center transition-all duration-300 shadow-lg shadow-purple-900/40 hover:shadow-purple-800/60"
                >
                  Join the Recommendation Revolution
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="mt-8 flex gap-8">
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Lock className="text-purple-400" />
                  <span className="text-gray-200">No fake reviews</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Mic className="text-purple-400" />
                  <span className="text-gray-200">Real voices, real experiences</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Brain className="text-purple-400" />
                  <span className="text-gray-200">AI-powered insights</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-900/20 hover:shadow-purple-800/40">
                  <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center mb-4 animate-glow">
                    <feature.icon className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-900/40 rounded-full flex items-center justify-center mb-4 mx-auto animate-glow">
                  <Mic className="text-purple-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Record Your Experience</h3>
                <p className="text-gray-300">Simply tap record and share your genuine thoughts about a product, service, or experience.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-900/40 rounded-full flex items-center justify-center mb-4 mx-auto animate-glow">
                  <Brain className="text-purple-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. AI Transforms Your Voice</h3>
                <p className="text-gray-300">Our advanced AI captures the emotion and nuance of your recommendation.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-900/40 rounded-full flex items-center justify-center mb-4 mx-auto animate-glow">
                  <MessageSquare className="text-purple-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Connect & Discover</h3>
                <p className="text-gray-300">Share your insights, explore recommendations from others, and make informed decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg hover:shadow-purple-800/40 transition-all duration-300">
                  <div className="flex gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-purple-400 w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 text-gray-200">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beta Signup Section */}
        <section ref={betaSignupRef} className="py-20 px-4 relative">
          <div className="container mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Your Voice. Your Recommendations. Your Impact.</h2>
            <p className="text-xl text-gray-200 mb-8">Be among the first 1,000 users to join our exclusive beta program.</p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all backdrop-blur-sm text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all backdrop-blur-sm text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all backdrop-blur-sm text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    placeholder="Tell us how you plan to use Murmur (optional)"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/80 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all backdrop-blur-sm text-white placeholder-gray-400"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-900/40 hover:shadow-purple-800/60"
                >
                  Claim Your Spot in the Murmur Community
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  We protect your data like it's our own. Zero spam, 100% privacy guaranteed.
                </p>
              </form>
            ) : (
              <div className="bg-slate-900/80 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 bg-purple-900/40 rounded-full flex items-center justify-center mb-4 mx-auto animate-glow">
                  <Mic className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-200">
                  Welcome to the Murmur community! We'll be in touch soon with your exclusive beta access details.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;