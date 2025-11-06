import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} text-sm bg-primary-900 min-h-screen text-primary-100 flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-10 grid ">
          <main className="max-w-[90rem] mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
