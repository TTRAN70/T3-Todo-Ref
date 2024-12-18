"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      className="block"
      onClick={() => signIn("google", { redirectTo: "/make" })}
    >
      Sign In
    </button>
  );
}
