import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import Input, { InputLabel, InputError } from "@/true-ui/Input";

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

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2"
      action={signIn}
    >
      <Input status='' placeholder="you@example.com" isRequired onChange={() => { console.log('Hello')}}>
        <InputLabel value="Email" />
        <InputError message='This email exist' />
      </Input>

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
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-gray-1 text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
