import { Container } from "react-bootstrap";
import { FooterContact } from "@/components/footer/FooterContact";
import { FooterAI } from "@/components/footer/FooterAI";
import { FooterBar } from "@/components/footer/FooterBar";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <Container>
        <FooterContact />
        <FooterAI />
        <FooterBar />
      </Container>
    </footer>
  );
}
