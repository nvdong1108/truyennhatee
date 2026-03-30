'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import AppFooter from '@/components/layout/AppFooter';
import { shouldHideSiteChrome } from '@/components/layout/chromeRules';
import { usePathname } from 'next/navigation';

type SiteChromeProps = {
  children: ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const hideChrome = shouldHideSiteChrome(pathname);
  const [isDark, setIsDark] = useState(false);

  if (hideChrome) {
    return <main>{children}</main>;
  }

  return (
    <div className={isDark ? 'dark bg-gray-950 text-gray-100 min-h-screen' : 'bg-white text-gray-900 min-h-screen'}>
      <SiteHeader isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />
      <main>{children}</main>
      <AppFooter isDark={isDark} />
    </div>
  );
}
