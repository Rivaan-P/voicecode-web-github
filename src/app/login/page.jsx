"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";

import { FormEvent, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Tabs defaultValue="loginPage" className="w-[400px]">
          <TabsList className="mt-0 mb-4 grid w-full grid-cols-2">
            <TabsTrigger id="loginpage" value="loginPage">
              Login
            </TabsTrigger>
            <TabsTrigger id="signuppage" value="SignUpPage">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="loginPage">
            <LoginPage />
          </TabsContent>
          <TabsContent value="SignUpPage">
            <SignUpPage />
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

// Will be used to hide the navbar in the login page
Login.noNavbar = true;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmitLogin(event) {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );

      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      toast("Login Succesful", {
        action: {
          label: "Close",
          onClick: () => "",
        },
      });

      router.push("/chat");
      router.refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
      router.push("/chat");
      toast("Login Succesful", {
        action: {
          label: "Close",
          onClick: () => "",
        },
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const SignInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
      router.push("/chat");
      toast("Login Succesful", {
        action: {
          label: "Close",
          onClick: () => "",
        },
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <form onSubmit={handleSubmitLogin} action="#">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={SignInWithGoogle}
          >
            <FaGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            onClick={SignInWithGithub}
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          >
            <FaGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <span
          onClick={() => {
            const button = document.getElementById("signuppage");

            if (button) {
              button.focus();
            }
          }}
          className="cursor-pointer underline"
        >
          Sign Up
        </span>
      </div>
    </div>
  );
}

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
      router.push("/chat");
      toast("Login Succesful", {
        action: {
          label: "Close",
          onClick: () => "",
        },
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const SignInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
      router.push("/chat");
      toast("Login Succesful", {
        action: {
          label: "Close",
          onClick: () => "",
        },
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  async function handleSubmitSignUp(event) {
    event.preventDefault();

    setError("");

    // if (password !== confirmation) {
    //   setError("Passwords don't match");
    //   return;
    // }
    console.log(username);
    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password)
        .then((res) => {
          updateProfile(getAuth(app).currentUser, {
            displayName: username,
          });
          // const user = firebase.auth().currentUser;
          // user.updateProfile({
          //   displayName: username,
          // });
        })
        .catch((error) => {
          console.error(error);
        });

      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );

      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/chat");
      toast("Register Succesful", {
        action: {
          label: "Close",
          onClick: () => "",
        },
      });
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to sign up your account
        </p>
      </div>
      <form onSubmit={handleSubmitSignUp} action="#">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="name"
              id="username"
              placeholder="m"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="********"
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={SignInWithGoogle}
          >
            <FaGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            onClick={SignInWithGoogle}
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          >
            <FaGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account? {/* Don&apos;t have an account?{" "} */}
        <span
          onClick={() => {
            const button = document.getElementById("loginpage");

            if (button) {
              button.focus();
            }
          }}
          className="cursor-pointer underline"
        >
          Login
        </span>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
