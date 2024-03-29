import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const pageLinks = [
  {
    id: 0,
    name: "Features",
    href: "features",
  },
  {
    id: 1,
    name: "Reviews",
    href: "reviews",
  },
  {
    id: 2,
    name: "Pricing",
    href: "pricing",
  },
  {
    id: 3,
    name: "FAQs",
    href: "faqs",
  },
];

function Navbar() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <header>
      <nav className="w-full h-[7vh] fixed left-0 top-0 z-50 border-b border-b-[#161616] bg-black text-white">
        <section className="flex w-full h-full justify-between items-center p-5">
          {/* Left */}
          <section>s-school</section>
          {/* Right */}
          <section className="hidden lg:flex gap-5 items-center">
            <section className="flex items-center gap-5">
              {pageLinks.map((item) => {
                return (
                  <a href={`#${item.href}`} key={item.id}>
                    {item.name}
                  </a>
                );
              })}
            </section>
            <Link to={`/login`}>
              <button className="bg-white text-black px-4 py-2 rounded-full">
                Sign In
              </button>
            </Link>
          </section>
          {/* Right - Mobile */}
          <section className="lg:hidden text-primary text-3xl">
            <button
              onClick={() => setNavIsOpen(!navIsOpen)}
              className="appearance-none outline-none"
            >
              <AiOutlineMenu />
            </button>
          </section>
        </section>
      </nav>
      <section
        className={
          navIsOpen
            ? "lg:hidden fixed z-[40] h-fit pt-[7vh] bg-white border-b w-full top-0 left-0 ease duration-500"
            : "lg:hidden fixed z-[40] h-fit pt-[7vh] bg-white border-b w-full top-[-50vh] left-0 ease duration-500"
        }
      >
        <section className="flex flex-col justify-center gap-5 w-full h-full p-5">
          {pageLinks.map((item) => {
            return (
              <a
                href={`#${item.href}`}
                key={item.id}
                onClick={() => setNavIsOpen(!navIsOpen)}
              >
                {item.name}
              </a>
            );
          })}
          <section>
            <Link to={`/login`}>
              <button className="bg-black text-white px-4 py-2 rounded-full">
                Sign In
              </button>
            </Link>
          </section>
        </section>
      </section>
    </header>
  );
}

export default Navbar;
