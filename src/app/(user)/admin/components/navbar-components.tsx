import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-primary text-white w-full rounded-b-lg">
      <div className="w-1/2">
        <div className="text-xl">Admin Panel</div>
      </div>
      <div className="w-1/2 flex justify-end">
        <ul>
          <li>
            <Link className="mx-4  hover:text-slate-300 transition-colors" href={"/admin/dashboard"}>
              Dashboard
            </Link>
            <Link className="mx-4 hover:text-slate-300 transition-colors" href={"/admin/kelola/instruktur"}>
              Kelola Instruktur
            </Link>
            <Link className="mx-4 hover:text-slate-300 transition-colors" href={"/admin/kelola/mahasiswa"}>
              Kelola Mahasiswa
            </Link>
            <Link className="mx-4 hover:text-slate-300 transition-colors" href={"/admin/kelola/praktikum"}>
              Kelola Praktikum
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
