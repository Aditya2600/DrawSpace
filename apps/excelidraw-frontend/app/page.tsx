import React from 'react';
import Link from "next/link";
import { 
  PenTool, 
  Users, 
  Download, 
  Zap, 
  Shield, 
  Palette,
  ArrowRight,
  Star,
  Github,
  Twitter
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DrawSpace</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Beautiful
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                Diagrams & Drawings
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              DrawSpace is a free, open-source drawing tool that lets you create beautiful diagrams, 
              sketches, and wireframes with ease. No account required, works offline, and your data stays private.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signin" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                Sign In <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/signup" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center space-x-2">
                Signup
              </Link>
            </div>
          </div>
            
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                <span>Start Drawing</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center space-x-2">
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </button>
            </div>
          </div> */}
          
          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PenTool className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-500 text-lg">Interactive Drawing Canvas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to create
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features that make drawing and diagramming intuitive and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <PenTool className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intuitive Drawing</h3>
              <p className="text-gray-600">
                Free-hand drawing with smooth curves, shapes, arrows, and text. Perfect for sketches, wireframes, and diagrams.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Collaboration</h3>
              <p className="text-gray-600">
                Work together in real-time with your team. Share a link and start collaborating instantly.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Anywhere</h3>
              <p className="text-gray-600">
                Export your creations as PNG, SVG, or PDF. Perfect for presentations, documentation, and sharing.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized for performance with smooth drawing experience. Works offline and loads instantly.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy First</h3>
              <p className="text-gray-600">
                Your data stays with you. No account required, works offline, and all data is stored locally.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customizable</h3>
              <p className="text-gray-600">
                Choose from multiple themes, colors, and styles. Make it yours with extensive customization options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Drawings Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start creating?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who use DrawSpace to bring their ideas to life. 
            It's free, fast, and works right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Start Drawing Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DrawSpace</span>
              </div>
              <p className="text-gray-400">
                The free, open-source drawing tool for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DrawSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
// import { Button } from "@repo/ui/button";
// import { Card } from "@repo/ui/card";
// import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
// import Link from "next/link";

// function App() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <header className="relative overflow-hidden">
//         <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
//               Collaborative Whiteboarding
//               <span className="text-primary block">Made Simple</span>
//             </h1>
//             <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
//               Create, collaborate, and share beautiful diagrams and sketches with our intuitive drawing tool. 
//               No sign-up required.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <Link href={"/signin"}>
//                 <Button variant={"primary"} size="lg" className="h-12 px-6">
//                   Sign in
//                   <Pencil className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button variant="outline" size="lg" className="h-12 px-6">
//                   Sign up
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-24 bg-muted/50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
//             <Card className="p-6 border-2 hover:border-primary transition-colors">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Share2 className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Work together with your team in real-time. Share your drawings instantly with a simple link.
//               </p>
//             </Card>

//             <Card className="p-6 border-2 hover:border-primary transition-colors">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Users2 className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Multiple users can edit the same canvas simultaneously. See who's drawing what in real-time.
//               </p>
//             </Card>

//             <Card className="p-6 border-2 hover:border-primary transition-colors">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Sparkles className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Smart Drawing</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Intelligent shape recognition and drawing assistance helps you create perfect diagrams.
//               </p>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-primary rounded-3xl p-8 sm:p-16">
//             <div className="mx-auto max-w-2xl text-center">
//               <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
//                 Ready to start creating?
//               </h2>
//               <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
//                 Join thousands of users who are already creating amazing diagrams and sketches.
//               </p>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 <Button size="lg" variant="secondary" className="h-12 px-6">
//                   Open Canvas
//                   <Pencil className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="lg" className="h-12 px-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
//                   View Gallery
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t">
//         <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
//             <p className="text-sm text-muted-foreground">
//               © 2024 Excalidraw Clone. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a href="https://github.com" className="text-muted-foreground hover:text-primary">
//                 <Github className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-muted-foreground hover:text-primary">
//                 <Download className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;

