// "use client";

// import { Input } from "@repo/ui/Input";
// import { Button } from "@repo/ui/Button";
// import { useState } from "react";
// import { Eye, EyeOff, Palette } from "lucide-react";

// interface AuthPageProps {
//   isSignin: boolean;
//   appName?: string;
//   onToggleMode: () => void;
//   onAuthSuccess: () => void;
// }

// export function AuthPage({ isSignin, appName = "Excalidraw", onToggleMode, onAuthSuccess }: AuthPageProps) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<{email?: string; password?: string}>({});

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrors({});

//     // Basic validation
//     const newErrors: {email?: string; password?: string} = {};

//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setIsLoading(false);
//       return;
//     }

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     console.log(isSignin ? "Signing in..." : "Signing up...", { email, password });
//     setIsLoading(false);

//     // On successful auth, redirect to drawing app
//     onAuthSuccess();
//   };

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center mb-4">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
//                 <Palette className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {isSignin ? "Welcome back" : "Create account"}
//             </h1>
//             <p className="text-gray-600">
//               {isSignin ? `Sign in to your ${appName} account` : `Join ${appName} and start creating`}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <Input
//                 type="email"
//                 placeholder=" Enter your email"
//                 label="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={errors.email}
//                 disabled={isLoading}
//                 variant="outlined"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder=" Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   error={errors.password}
//                   disabled={isLoading}
//                   variant="outlined"
//                   className="pr-12"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
//                   disabled={isLoading}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <Button 
//               type="submit" 
//               variant="primary"
//               size="lg"
//               loading={isLoading}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             >
//               {isSignin ? "Sign In" : "Create Account"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <button 
//                 type="button"
//                 className="text-blue-600 hover:text-blue-700 font-medium hover:underline focus:outline-none transition-colors"
//                 onClick={onToggleMode}
//                 disabled={isLoading}
//               >
//                 {isSignin ? "Sign Up" : "Sign In"}
//               </button>
//             </p>
//           </div>

//           {isSignin && (
//             <div className="mt-4 text-center">
//               <button 
//                 type="button"
//                 className="text-sm text-gray-500 hover:text-gray-700 hover:underline focus:outline-none transition-colors"
//                 disabled={isLoading}
//               >
//                 Forgot your password?
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-500">
//             By continuing, you agree to our{" "}
//             <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>

//   );
// }

// "use client";

// import React, { useState } from 'react';
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, Palette } from 'lucide-react';
// import { z } from 'zod';
// import { Input } from '@repo/ui/input';
// import { Link } from 'lucide-react';
// import { Button } from '@repo/ui/button';
// import axios from 'axios';
// import { HTTP_BACKEND } from '@/config';


// interface AuthPageProps {
//   isSignin: boolean;
//   appName?: string;
// }
// async function createRoom(token: string): Promise<string> {
//   const res = await axios.post(`${HTTP_BACKEND}/room`, { name: "default-room" }, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return res.data.roomId;
// }
// export function AuthPage({ isSignin, appName = "DrawSpace" }: AuthPageProps) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<{username?: string; password?: string; name?: string}>({});
//   const nrouter = useRouter();

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setErrors({});

//   // Zod validation
//   const newErrors: {username?: string; password?: string; name?: string} = {};

//   try {
//     if (isSignin) {
//       signInSchema.parse({ username, password });
//     } else {
//       signUpSchema.parse({ username, password, name });
//     }
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       error.errors.forEach((err) => {
//         const field = err.path[0] as keyof typeof newErrors;
//         if (field === 'username') {
//           if (err.code === 'too_small') {
//             newErrors.username = 'Username must be at least 3 characters';
//           } else if (err.code === 'too_big') {
//             newErrors.username = 'Username must be at most 20 characters';
//           } else {
//             newErrors.username = 'Username is required';
//           }
//         } else if (field === 'password') {
//           newErrors.password = 'Password is required';
//         } else if (field === 'name') {
//           newErrors.name = 'Name is required';
//         }
//       });
//     }
//   }

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     setIsLoading(false);
//     return;
//   }

//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   console.log(isSignin ? "Signing in..." : "Signing up...", isSignin ? { username, password } : { username, password, name });
//   setIsLoading(false);

//   // On successful auth, redirect to home
//   navigate('/');
// };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setErrors({});

//   const newErrors: { username?: string; password?: string; name?: string } = {};

//   try {
//     if (isSignin) {
//       signInSchema.parse({ username, password });
//     } else {
//       signUpSchema.parse({ username, password, name });
//     }
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       error.errors.forEach((err) => {
//         const field = err.path[0] as keyof typeof newErrors;
//         newErrors[field] = err.message;
//       });
//     }
//   }

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     setIsLoading(false);
//     return;
//   }

//   try {
//     if (isSignin) {
//       const res = await axios.post(`${HTTP_BACKEND}/signin`, { username, password });
//       const token = res.data.token;
//       localStorage.setItem("token", token);

//       const roomId = await createRoom(token);
//       nrouter.push(`/canvas/${roomId}`);
//     } else {
//       await axios.post(`${HTTP_BACKEND}/signup`, { username, password, name });
//       nrouter.push("/signin");
//     }
//   } catch (err: any) {
//     alert("Something went wrong! " + (err.response?.data?.message || ""));
//   } finally {
//     setIsLoading(false);
//   }
// };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center mb-4">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
//                 <Palette className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {isSignin ? "Welcome back" : "Create account"}
//             </h1>
//             <p className="text-gray-600">
//               {isSignin ? `Sign in to your ${appName} account` : `Join ${appName} and start creating`}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {!isSignin && (
//               <div>
//                 <Input
//                   type="text"
//                   placeholder=" Enter your full name"
//                   label="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   error={errors.name}
//                   disabled={isLoading}
//                 />
//               </div>
//             )}

//             <div>
//               <Input
//                 type="text"
//                 placeholder=" Enter your username"
//                 label="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 error={errors.username}
//                 disabled={isLoading}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder=" Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   error={errors.password}
//                   disabled={isLoading}
//                   className="pr-12"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
//                   disabled={isLoading}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <Button 
//               type="submit" 
//               variant="default"
//               size="lg"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             >
//               {isLoading ? "Loading..." : (isSignin ? "Sign In" : "Create Account")}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <Link 
//                 to={isSignin ? "/signup" : "/signin"}
//                 className="text-blue-600 hover:text-blue-700 font-medium hover:underline focus:outline-none transition-colors"
//               >
//                 {isSignin ? "Sign Up" : "Sign In"}
//               </Link>
//             </p>
//           </div>

//           {isSignin && (
//             <div className="mt-4 text-center">
//               <button 
//                 type="button"
//                 className="text-sm text-gray-500 hover:text-gray-700 hover:underline focus:outline-none transition-colors"
//                 disabled={isLoading}
//               >
//                 Forgot your password?
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-500">
//             By continuing, you agree to our{" "}
//             <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Palette } from 'lucide-react';
import { z } from 'zod';
import axios from 'axios';
import { HTTP_BACKEND } from '../config';
import { CreateUserSchema, SignInSchema } from '@repo/common/types';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



interface AuthPageProps {
  isSignin: boolean;
  appName?: string;
}

export function AuthPage({ isSignin, appName = "DrawSpace" }: AuthPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [showRoomOptions, setShowRoomOptions] = useState(false);
  
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    name?: string;
    roomId?: string;
    roomName?: string;
  }>({});
  const [rooms, setRooms] = useState<{ id: number, slug: string }[]>([]);
  const router = useRouter();

  const createRoom = async (token: string) => {
    if (!roomName.trim()) {
      setErrors({ roomName: "Room name is required" });
      return;
    }
    const slug = roomName.toLowerCase().replace(/\s+/g, "-");

    try {
      const res = await axios.post(`${HTTP_BACKEND}/room`, {
        name: roomName,
        slug: slug,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data.roomId;
    } catch (error) {
      console.error('Failed to create room:', error);
      setIsLoading(false);
      throw error;
    }
  };
  const handleCreateNewRoom = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found");
        return;
      }

      const roomId = await createRoom(token);
      router.push(`/canvas/${roomId}`);
    } catch (error) {
      alert("Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAvailableRooms = async () => {
    setLoadingRooms(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${HTTP_BACKEND}/rooms`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRooms(res.data.rooms || []);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      setRooms([]);
    } finally {
      setLoadingRooms(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim()) {
      setErrors({ roomId: "Room ID is required" });
      return;
    }
    setErrors({});
    setIsLoading(true);
    router.push(`/canvas/${roomId.trim()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: { username?: string; password?: string; name?: string } = {};

    try {
      if (isSignin) {
        SignInSchema.parse({ username, password });
      } else {
        CreateUserSchema.parse({ username, password, name });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof newErrors;
          if (field === 'username') {
            if (err.code === 'too_small') {
              newErrors.username = 'Username must be at least 3 characters';
            } else if (err.code === 'too_big') {
              newErrors.username = 'Username must be at most 20 characters';
            } else {
              newErrors.username = 'Username is required';
            }
          } else if (field === 'password') {
            newErrors.password = 'Password is required';
          } else if (field === 'name') {
            newErrors.name = 'Name is required';
          }
        });
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      if (isSignin) {
        const res = await axios.post(`${HTTP_BACKEND}/signin`, {
          username,
          password,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        setShowRoomOptions(true);
        await fetchAvailableRooms(); // ✅ Load existing rooms
      } else {
        const res = await axios.post(`${HTTP_BACKEND}/signup`, {
          username,
          password,
          name,
        });
        if (res.data.userId) {
          router.push("/signin");
        }
      }
    } catch (err: any) {
      alert("Something went wrong! " + (err.response?.data?.message || ""));
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show room options after successful sign-in
  if (showRoomOptions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Palette className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Choose Your Room
              </h1>
              <p className="text-gray-600">
                Create a new room or join an existing one
              </p>
            </div>

            <div className="space-y-4">
            <div> 
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter your room name"
                  className="flex h-11 w-full rounded-lg border border-gray-200 px-4 py-2"
                />
                {errors.roomName && (
                  <p className="text-sm text-red-600 mt-1">{errors.roomName}</p>
                )}
              </div>
              <Button
                onClick={handleCreateNewRoom}
                variant="default"
                size="lg"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Creating Room..." : "Create New Room"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <form onSubmit={handleJoinRoom} className="space-y-4">
                <div>
                  <label htmlFor="room-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Join Existing Room
                  </label>
                  <select
                    id="room-select"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    disabled={isLoading || loadingRooms}
                    className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">
                      {loadingRooms ? "Loading rooms..." : "Select a room"}
                    </option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.slug} ({room.id})
                      </option>
                    ))}
                  </select>
                  {errors.roomId && (
                    <p className="text-sm text-red-600 mt-1">{errors.roomId}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !roomId}
                >
                  Join Room
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-gray-600">
              {isSignin ? `Sign in to your ${appName} account` : `Join ${appName} and start creating`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSignin && (
              <div>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  disabled={isLoading}
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? "Loading..." : (isSignin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                href={isSignin ? "/signup" : "/signin"}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline focus:outline-none transition-colors"
              >
                {isSignin ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>

          {isSignin && (
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline focus:outline-none transition-colors"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}