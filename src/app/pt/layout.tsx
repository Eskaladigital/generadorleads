import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";

export default function LayoutPT({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer locale="pt" />
      <StickyCTA />
      <BackToTop />
      <CookieConsent lang="pt" />
    </>
  );
}
