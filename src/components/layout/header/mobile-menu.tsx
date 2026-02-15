'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/hooks/useNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { ThemeToggle } from './toolbar';
import { LanguageSwitcher } from './toolbar';
import { Separator } from '@/components/ui/separator';

export default function MobileMenu() {
  const { t } = useTranslation();
  const { items: navigationItems } = useNavigation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden w-9 h-9"
          aria-label={t('header.mobile_menu.open')}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <DrawerTitle className="text-lg font-bold">
            {t('header.mobile_menu.title')}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              aria-label={t('header.mobile_menu.close')}
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {/* Navigation Items */}
        <nav className="flex flex-col p-4 space-y-1">
          {navigationItems.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center px-4 py-3 rounded-md transition-colors',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {t(item.title)}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Settings Section */}
        <div className="px-4 pb-6 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('header.mobile_menu.settings')}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {t('header.mobile_menu.theme')}
            </span>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {t('header.mobile_menu.language')}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
