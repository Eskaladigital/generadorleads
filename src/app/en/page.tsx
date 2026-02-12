import Link from 'next/link';

export default function EnglishComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center px-[5%] py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Flag */}
        <div className="text-[8rem] mb-8">🇬🇧</div>

        {/* Message */}
        <h1 className="font-lora text-[3.5rem] md:text-[5rem] font-bold mb-6 text-[#1a1a1a]">
          Coming Soon
        </h1>
        
        <p className="text-[1.3rem] text-gray-600 leading-relaxed mb-8 max-w-[600px] mx-auto">
          We're currently working on the English version of Health4Spain. 
          In the meantime, please visit our Spanish site.
        </p>

        {/* Info Box */}
        <div className="bg-white border-l-4 border-accent p-8 mb-12 text-left max-w-[600px] mx-auto shadow-lg">
          <h2 className="font-semibold text-xl mb-4">🚀 What we're building:</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span>Complete guide to living in Spain</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span>Connect with verified professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span>Health insurance, lawyers, real estate & more</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span>Content in English, German & French</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/es"
            className="inline-block bg-[#1a1a1a] text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
          >
            Visit Spanish Site
          </Link>
          <Link
            href="/es/solicitar"
            className="inline-block border-2 border-[#1a1a1a] text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-[#1a1a1a] hover:text-white"
          >
            Get Notified
          </Link>
        </div>

        {/* Available Languages */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Available Languages
          </p>
          <div className="flex justify-center gap-6 text-4xl">
            <Link href="/es" className="hover:scale-110 transition-transform" title="Español">
              🇪🇸
            </Link>
            <span className="opacity-30" title="English - Coming Soon">🇬🇧</span>
            <span className="opacity-30" title="Deutsch - Coming Soon">🇩🇪</span>
            <span className="opacity-30" title="Français - Coming Soon">🇫🇷</span>
          </div>
        </div>
      </div>
    </div>
  );
}
