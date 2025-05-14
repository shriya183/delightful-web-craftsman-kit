import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { BeamsBackground } from "@/components/ui/beams-background";
import { cleanupAuthState } from "@/hooks/useSupabaseAuth";

// Define form schema
const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      console.log("Signing up with:", data.email);
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            username: data.username || null
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      toast.success("Sign-up successful! Please check your email to verify your account.");
      navigate("/login");
    } catch (error: any) {
      console.error("Error details:", error);
      toast.error(error.message || "Failed to sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up with Google.");
    }
  };

  const handleSkip = () => {
    toast.info("Proceeding without an account");
    navigate("/dashboard");
  };

  return (
    <BeamsBackground intensity="medium" className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/20 backdrop-blur-lg border border-white/10 dark:bg-black/20 dark:backdrop-blur-lg dark:border-white/10 light:bg-white/90 light:backdrop-blur-lg light:border-black/10 relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSkip}
            className="absolute top-4 right-4 text-sm text-gray-300 hover:text-white"
          >
            Skip
          </Button>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Sign Up</CardTitle>
            <CardDescription className="text-gray-300 dark:text-gray-300 light:text-gray-600">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">Username (optional)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="username"
                    className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[rgba(65,105,225,1)] hover:bg-[rgba(65,105,225,0.9)] text-white" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full border-white/10 bg-black/30 text-white hover:bg-white/10"
              onClick={handleGoogleSignUp}
            >
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-400 dark:text-gray-400 light:text-gray-500 w-full">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-white text-blue-400 dark:text-blue-400 dark:hover:text-white light:text-blue-600 light:hover:text-blue-800"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </BeamsBackground>
  );
};

export default SignUp;
