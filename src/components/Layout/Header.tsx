import {
  Bars3Icon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="fixed top-0 flex justify-between items-center w-full h-16 p-4">
      <button className="p-2">
        <Bars3Icon className="w-[24px] h-[24px]" />
      </button>
      <span className="">Feed</span>
      <button className="p-2">
        <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
      </button>
    </header>
  );
}
