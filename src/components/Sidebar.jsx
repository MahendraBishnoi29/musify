/* eslint-disable quotes */
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        to={item.to}
        key={item.name}
        className="flex flex-row justify-start items-center my-8 text-sm text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="mr-2 w-6 h-6" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[220px] py-10 px-4 bg-[#191624]">
        <img
          src={logo}
          alt="logo"
          className="w-full h-24 pr-9 object-contain"
        />
        <NavLinks />
      </div>
      {/* Hamburger Logo */}
      <div className="absolute cursor-pointer top-4 right-6 md:hidden block z-10">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="h-5 w-5 mr-2 text-white"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="h-5 w-5 mr-2 text-white"
          />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="h-16 w-full object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
