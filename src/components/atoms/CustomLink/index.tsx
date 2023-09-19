import React from "react";
import Link from "next/link";
const CustomLink = (porps: any) => <Link {...porps}>{porps.children}</Link>
export default CustomLink;
