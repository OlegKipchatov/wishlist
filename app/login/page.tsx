import { headers, cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import AuthButtons from "@/components/OAuth/AuthButtons";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const login = email.split('@')[0];

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          login,
          email,
        }
      },
    });

    if (error) {
      console.error(error.message);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2"
      action={signIn}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />

      <AuthButtons />

      <button className="btn-green btn-focus rounded-lg py-2.5 mb-2">
        Sign In
      </button>
      <button
        formAction={signUp}
        className="btn-outlined btn-focus rounded-lg py-2.5 mb-2"
      >
        Sign Up
      </button>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-gray-1 text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
