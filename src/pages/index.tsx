import Image from "next/image";
import localFont from "next/font/local";
import { LoginPage } from "@/components/LoginPage";
import { GetServerSideProps } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if(token) {
      return {
          redirect: {
              destination: "/home",
              permanent: false,
          },
      };
  }

  return {
      props: {},
  };
};

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <LoginPage />
    </div>
  );
}
