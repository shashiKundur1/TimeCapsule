import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, MessageSquare, Mail, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12 opacity-0 animate-fade-in">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Schedule Messages for Your{' '}
                <span className="text-primary-600">Future Self</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                Send notes, reminders, and words of wisdom to your future self or loved ones.
                Perfect for birthdays, anniversaries, or just when you need a reminder of what matters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                {isAuthenticated ? (
                  <Link to="/create-message">
                    <Button size="lg\" className="w-full sm:w-auto">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Create Message
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                )}
                <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {isAuthenticated ? "View Dashboard" : "Login"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Time Capsule"
                className="rounded-xl shadow-2xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Creating and scheduling future messages is simple and intuitive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
                title: "Create a Message",
                description: "Write a message to your future self or someone special. Include photos, memories, or important reminders."
              },
              {
                icon: <Calendar className="h-6 w-6 text-accent-600" />,
                title: "Schedule Delivery",
                description: "Choose when your message should be delivered. Set it for a birthday, anniversary, or any meaningful future date."
              },
              {
                icon: <Mail className="h-6 w-6 text-tertiary-600" />,
                title: "Receive on Schedule",
                description: "Your message will be delivered right on schedule. Surprise your future self or loved ones with thoughtful notes when they matter most."
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center md:text-left">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center md:text-left">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect For
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover all the ways you can use TimeCapsule to connect with the future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Birthday Surprises",
                description: "Schedule birthday messages for loved ones months or even years in advance. Never miss a special day again.",
                color: "primary"
              },
              {
                title: "Future Goals",
                description: "Set reminders about your goals and aspirations. Check in with your future self to see how far you've come.",
                color: "accent"
              },
              {
                title: "Anniversary Messages",
                description: "Prepare heartfelt anniversary messages in advance. Surprise your partner with thoughtful notes when the day comes.",
                color: "tertiary"
              },
              {
                title: "Motivational Reminders",
                description: "Send encouragement to yourself when you'll need it most. Schedule motivation for difficult projects or challenging times.",
                color: "secondary"
              }
            ].map((useCase, index) => (
              <div
                key={useCase.title}
                className="flex gap-4 items-start opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-10 h-10 bg-${useCase.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Check className={`h-5 w-5 text-${useCase.color}-600`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Sending Messages to the Future Today
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of people who use TimeCapsule to connect with their future selves
              and loved ones.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/create-message">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Create Your First Message
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Sign Up for Free
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;