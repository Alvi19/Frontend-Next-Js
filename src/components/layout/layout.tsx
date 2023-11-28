import React from "react";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

const Layout = ({ children }: props) => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">Navbar Title</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <a>Navbar Item 1</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-8 min-h-[85vh]">{children}</div>
          <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <aside>
              <p>
                Create by © <span className="font-bold"> Ridho</span> 2023
              </p>
            </aside>
          </footer>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link href={"/barang"} className="font-bold text-lg">
                Barang
              </Link>
            </li>
            <li>
              <Link href={"/suplier"} className="font-bold text-lg">
                Suplier
              </Link>
            </li>
            <li>
              <Link href={"/pembelian"} className="font-bold text-lg">
                Pembelian
              </Link>
            </li>
            <li>
              <Link href={"/stock"} className="font-bold text-lg">
                Stock
              </Link>
            </li>
            <li>
              <Link href={"/hutang"} className="font-bold text-lg">
                Hutang
              </Link>
            </li>
            <li>
              <Link href={"/"} className="font-bold text-lg text-red-700">
                logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;