import React from "react";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

const Footer = ({ children }: props) => {
  return (
    <div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
