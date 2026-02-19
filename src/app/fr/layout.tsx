import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";

export default function LayoutFR({
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
      <Footer locale="fr" />
      <StickyCTA />
      <BackToTop />
      <CookieConsent lang="fr" />
    </>
  );
}
