"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/logo/Logo";

const links = [
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <Navbar expand="md" expanded={expanded} onToggle={setExpanded} className="site-navbar sticky-top" aria-label="Main navigation">
      <Container>
        <Navbar.Brand as={Link} href="/" aria-label={`${siteConfig.name} — home`}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav className="ms-auto">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Nav.Link
                  as={Link}
                  href={link.href}
                  key={link.href}
                  active={active}
                  className={active ? "active" : undefined}
                  onClick={() => setExpanded(false)}
                >
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
