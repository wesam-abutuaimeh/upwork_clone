import React from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => (
  <Link href={href}>{children}</Link>
);

export default CustomLink;
