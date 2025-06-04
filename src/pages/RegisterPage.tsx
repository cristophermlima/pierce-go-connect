
import MainLayout from "@/components/MainLayout";
import RegistrationHeader from "@/components/auth/RegistrationHeader";
import RegistrationForm from "@/components/auth/RegistrationForm";
import RegistrationBenefits from "@/components/auth/RegistrationBenefits";

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="container max-w-md py-10">
        <RegistrationHeader />
        <RegistrationForm />
        <RegistrationBenefits />
      </div>
    </MainLayout>
  );
}
