"use client";
import Link from "next/link";
import Image from "next/image";
import RobosmeLogo from "@/public/robosme-logo.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  //! Kullanıcı giriş yapmamışsa login sayfasına yönlendirme yapılır.
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("robosmeEmail");
    if (!storedEmail) {
      router.replace("/login");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);
  return (
    <header className="w-full py-6 px-12 flex items-center justify-between gap-12 bg-[#21267f]">
      <Link href="/">
        <Image src={RobosmeLogo} alt="Robosme Logo" />
      </Link>
      {email && <p className="text-white text-2xl font-medium">{email}</p>}
    </header>
  );
};

export default Header;
