import { FooterProps } from '@/type';

export function generateFooterText(data: FooterProps): string {
  const currentYear = new Date().getFullYear();
  const year = Number(data.startYear);

  let copyrightText: string;
  if (year === currentYear) {
    copyrightText = `\u00A9 ${year} ${data.companyName}`;
  } else {
    copyrightText = `\u00A9 ${year} - ${currentYear} ${data.companyName}`;
  }

  return data.remark ? `${copyrightText} ${data.remark}` : copyrightText;
}
