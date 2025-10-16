import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex items-center gap-5 z-10" href="/">
      <Image src="/logo.png" width={80} height={80} alt="The Wild Oasis Logo" />
      <h1 className="font-semibold text-4xl">The Wild Oasis</h1>
    </Link>
  );
}
