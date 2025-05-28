"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type FormFields = "email" | "password" | "companyCode" | "region";

type FormValidations = Record<FormFields, boolean>;
const page = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [formValidations, setFormValidations] = useState<FormValidations>({
    email: true,
    password: true,
    companyCode: true,
    region: true,
  });
  const [formData, setFormData] = useState<Record<FormFields, string>>({
    email: "",
    password: "",
    companyCode: "",
    region: "",
  });

  //! Kullanıcı eğer giriş yapmışsa, login sayfası yerine anasayfaya yönlendirme yapılır.
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("robosmeEmail");
    if (storedEmail) {
      router.replace("/");
    } else {
      setUserEmail(storedEmail);
    }
  }, [router]);

  //! Tüm inputlar için ortak bir handleChange fonksiyonu ve dinamik bir validation. Bazen kariyer veya ilan formlarında fazla sayıda input olabiliyor ve bu şekilde kontrol etmek bana daha kolay geliyor.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValidations = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, !!value.trim()])
    ) as FormValidations;
    setFormValidations(newValidations);
    const isFormValid = Object.values(newValidations).every(Boolean);
    if (!isFormValid) {
      return;
    }
    sessionStorage.setItem("robosmeEmail", formData.email);
    router.push("/");
  };
  return (
    <div className="w-screen h-[100dvh] flex items-center justify-center p-16 overflow-hidden">
      <form
        onSubmit={handleForm}
        className="w-11/12 max-w-[640px] py-6 px-4 rounded-md shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-medium w-fit mx-auto mb-12">Giriş Yap</h1>
        <div className="flex w-full flex-col md:flex-row gap-4">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`py-2 px-3 w-full md:w-1/2 shadow-md rounded-md border ${
              formValidations.email ? "border-white" : "border-red-500"
            }`}
            placeholder="E-Mail"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`py-2 px-3 w-full md:w-1/2 shadow-md rounded-md border ${
              formValidations.password ? "border-white" : "border-red-500"
            }`}
            placeholder="Password"
          />
        </div>
        <div className="flex w-full flex-col md:flex-row gap-4">
          <input
            type="text"
            name="companyCode"
            value={formData.companyCode}
            onChange={handleChange}
            className={`py-2 px-3 w-full md:w-1/2 shadow-md rounded-md border ${
              formValidations.companyCode ? "border-white" : "border-red-500"
            }`}
            placeholder="Company Code"
          />
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className={`py-2 px-3 w-full md:w-1/2 shadow-md rounded-md border ${
              formValidations.region ? "border-white" : "border-red-500"
            }`}
            placeholder="Region"
          />
        </div>
        <button
          type="submit"
          className="py-3 px-12 w-fit mx-auto bg-[#21267f] text-white text-lg font-medium rounded-md mt-12 cursor-pointer border border-[#21267f] hover:bg-white hover:text-[#21267f] animated"
        >
          GÖNDER
        </button>
      </form>
    </div>
  );
};

export default page;
