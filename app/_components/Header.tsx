import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="py-5 border-b border-primary-800">
      <div className="flex justify-between items-center max-w-[90rem] mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
