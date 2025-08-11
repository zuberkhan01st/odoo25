"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type Coordinates = {
  lat?: number;
  lng?: number;
};

type Location = {
  city?: string;
  area?: string;
  coordinates?: Coordinates;
};

type UserStateType = {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
  avatar?: string;
  password_reset_token?: string;
  magic_link_token?: string;
  magic_link_sent_at?: string;
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
  preferredPlayTimes?: string[];
  favoriteSports?: string[];
  location?: Location;
};

type RegisterErrorType = {
  [key: string]: string;
};

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userState, setUserState] = useState<UserStateType>({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
    avatar: "",
    password_reset_token: "",
    magic_link_token: "",
    magic_link_sent_at: "",
    skillLevel: "Beginner",
    preferredPlayTimes: [],
    favoriteSports: [],
    location: { city: "", area: "", coordinates: { lat: undefined, lng: undefined } },
  });
  const [errors, setError] = useState<RegisterErrorType>({});

  const submitForm = async () => {
    setLoading(true);
    axios
      .post("/api/auth/register", userState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          router.push(`/login?message=${response.msg}`);
        } else if (response?.status == 400) {
          setError(response?.errors);
        } else {
          setError({});
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  const githubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  const googleLogin = async () => {
    await signIn("google", { callbackUrl: "/", redirect: true });
  };

  const handleArrayChange = (
    field: "preferredPlayTimes" | "favoriteSports",
    value: string,
    idx: number
  ) => {
    const arr = [...(userState[field] || [])];
    arr[idx] = value;
    setUserState({ ...userState, [field]: arr });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold">
            QuickCourt
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Create Your Account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join and start booking your favorite sports facilities
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={userState.name}
              onChange={(e) => setUserState({ ...userState, name: e.target.value })}
              placeholder="Enter your full name"
            />
            {errors?.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={userState.email}
              onChange={(e) => setUserState({ ...userState, email: e.target.value })}
              placeholder="Enter your email"
            />
            {errors?.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={userState.password}
                onChange={(e) => setUserState({ ...userState, password: e.target.value })}
                placeholder="Create a strong password"
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors?.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                value={userState.password_confirmation}
                onChange={(e) =>
                  setUserState({ ...userState, password_confirmation: e.target.value })
                }
                placeholder="Confirm your password"
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <Label htmlFor="skillLevel">Skill Level</Label>
            <select
              id="skillLevel"
              value={userState.skillLevel}
              onChange={(e) =>
                setUserState({
                  ...userState,
                  skillLevel: e.target.value as UserStateType["skillLevel"],
                })
              }
              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Preferred Play Times */}
          <div>
            <Label>Preferred Play Times</Label>
            {[0, 1, 2].map((idx) => (
              <Input
                key={idx}
                value={userState.preferredPlayTimes?.[idx] || ""}
                onChange={(e) => handleArrayChange("preferredPlayTimes", e.target.value, idx)}
                placeholder={`Play Time ${idx + 1}`}
                className="mt-2"
              />
            ))}
          </div>

          {/* Favorite Sports */}
          <div>
            <Label>Favorite Sports</Label>
            {[0, 1, 2].map((idx) => (
              <Input
                key={idx}
                value={userState.favoriteSports?.[idx] || ""}
                onChange={(e) => handleArrayChange("favoriteSports", e.target.value, idx)}
                placeholder={`Sport ${idx + 1}`}
                className="mt-2"
              />
            ))}
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <Input
              placeholder="City"
              value={userState.location?.city || ""}
              onChange={(e) =>
                setUserState({ ...userState, location: { ...userState.location, city: e.target.value } })
              }
              className="mt-2"
            />
            <Input
              placeholder="Area"
              value={userState.location?.area || ""}
              onChange={(e) =>
                setUserState({ ...userState, location: { ...userState.location, area: e.target.value } })
              }
              className="mt-2"
            />
            <Input
              type="number"
              placeholder="Latitude"
              value={userState.location?.coordinates?.lat ?? ""}
              onChange={(e) =>
                setUserState({
                  ...userState,
                  location: {
                    ...(userState.location ?? { city: "", area: "", coordinates: { lat: undefined, lng: undefined } }),
                    coordinates: { ...(userState.location?.coordinates ?? { lat: undefined, lng: undefined }), lat: Number(e.target.value) },
                  },
                })
              }
              className="mt-2"
            />
            <Input
              type="number"
              placeholder="Longitude"
              value={userState.location?.coordinates?.lng ?? ""}
              onChange={(e) =>
                setUserState({
                  ...userState,
                  location: {
                    ...(userState.location ?? { city: "", area: "", coordinates: { lat: undefined, lng: undefined } }),
                    coordinates: { ...(userState.location?.coordinates ?? { lat: undefined, lng: undefined }), lng: Number(e.target.value) },
                  },
                })
              }
              className="mt-2"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          {/* Submit */}
          <Button
            onClick={submitForm}
            className="w-full h-12 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            disabled={loading}
          >
            {loading ? "Creating Account..." : <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>}
          </Button>

          {/* Social Login */}
          <div className="text-center mt-4 text-sm text-gray-500">-- OR --</div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full" onClick={githubSignIn}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20" height="20" className="mr-2">
                <path d="M17.791,46.836C18.502..." />
              </svg>
              Sign in with GitHub
            </Button>
            <Button variant="outline" className="w-full" onClick={googleLogin}>
              <Image src="/google_icon.png" height={20} width={20} alt="Google" className="mr-2" />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
