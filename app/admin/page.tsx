import SignInForm from "@/components/admin/sign-in-form";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen h-screen w-full flex bg-linear-to-br from-[#2D55FB] to-[#000000] fixed inset-0">
      <div className="flex-1 flex items-center justify-center p-4">
        <SignInForm />
      </div>
    </div>
  );
}