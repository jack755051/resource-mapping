'use client';

import { FooterProps } from '../../type';
import { generateFooterText } from '@/utils/footer-helper';

export default function Footer(props: FooterProps) {
  const footerText = generateFooterText(props);

  return (
    <footer className="footer__wrapper w-full flex items-center justify-center py-2 text-sm text-gray-600">
      {footerText}
    </footer>
  );
}
