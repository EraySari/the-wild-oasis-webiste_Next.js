import Image from "next/image";
import bg from "../public/bg.png";
import Fireflies from "./_components/Animation/Fireflies";
import AnimatedWord from "./_components/Animation/AnimatedText";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        alt="Mountains and forests with two cabins"
        src={bg}
        placeholder="blur" //static import edilen src icin calisir
        quality={100}
        fill
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/25 " />

      <Fireflies />
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to <AnimatedWord text="paradise." />
        </h1>
        <a
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </a>
      </div>
    </main>
  );
}
