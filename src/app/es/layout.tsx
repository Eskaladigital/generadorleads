import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <StickyCTA />
      <BackToTop />
      <CookieConsent lang="es" />
    </>
  );
}
