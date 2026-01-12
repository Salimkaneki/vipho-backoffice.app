import SignInForm from "@/components/admin/sign-in-form";

export default function AdminLoginPage() {
  return (
    <div className="min-h-dvh w-full bg-linear-to-br from-[#2D55FB] to-[#000000] overflow-y-auto">
      <div className="min-h-screen w-full grid place-items-center p-4">
        <SignInForm />
      </div>
    </div>
  );
}