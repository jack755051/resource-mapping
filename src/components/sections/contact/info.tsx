'use client';

import { useState } from 'react'; // 1. 移除 useEffect
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Printer,
  ArrowRight,
  Building2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedContent } from '@/type/i18n';
import type { OfficeLocation } from '@/type/page/contact';

interface ContactInfoProps {
  locations: OfficeLocation[];
  loading?: boolean;
}

export function ContactInfo({ locations }: ContactInfoProps) {
  const { t, language } = useTranslation();

  // 2. 安全保護
  const hasData = locations && locations.length > 0;

  // 3. State 初始化為空字串 (這是對的)
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');

  // =========================================================================
  // 🔥 核心修正：移除 useEffect，使用「衍生狀態 (Derived State)」
  // =========================================================================

  // 邏輯：
  // 1. 如果有選中的 ID (selectedLocationId)，就用選中的。
  // 2. 如果沒選中 (空字串)，且有資料 (hasData)，就「自動視為」選中第一筆。
  // 3. 這個 activeId 才是真正給 Select 和 find 用的 ID。
  const activeId = selectedLocationId || (hasData ? locations[0].id : '');

  // 根據計算出來的 activeId 找資料
  const currentLocation = hasData
    ? locations.find(loc => loc.id === activeId)
    : null;

  // 4. Loading 處理
  if (!hasData || !currentLocation) {
    return (
      <div className="lg:col-span-5 space-y-8 animate-pulse">
        <div className="h-12 bg-muted rounded-xl w-full" />
        <div className="h-40 bg-muted rounded-3xl w-full" />
        <div className="h-40 bg-muted rounded-3xl w-full" />
      </div>
    );
  }

  return (
    <motion.div
      className="lg:col-span-5 space-y-8"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* 據點切換器 */}
      <div className="flex items-center gap-4 p-1">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <Label className="text-xs text-muted-foreground mb-1 block">
            {t('contact.info.location.label')}
          </Label>

          {/* 🔥 重點：這裡的 value 必須是有值的 activeId，不能是空字串 */}
          <Select value={activeId} onValueChange={setSelectedLocationId}>
            <SelectTrigger className="w-full h-12 bg-card border-border/50 rounded-xl text-base font-medium">
              <SelectValue
                placeholder={t('contact.info.location.placeholder')}
              />
            </SelectTrigger>
            <SelectContent>
              {locations.map(loc => (
                <SelectItem key={loc.id} value={loc.id}>
                  {getLocalizedContent(loc.title, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId} // 使用 activeId 做為 key
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4"
        >
          {/* ... 下面的內容完全不用動，因為 currentLocation 已經正確了 ... */}

          {/* Card: 地址 */}
          <div className="p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  {t('contact.info.address.title')}
                </h3>
                <p className="text-muted-foreground mt-1 leading-relaxed whitespace-pre-line">
                  {getLocalizedContent(currentLocation.address.label, language)}
                </p>
                <a
                  href={currentLocation.address.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-medium mt-2 inline-flex items-center hover:underline"
                >
                  {t('contact.info.address.map')}{' '}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Card: 電話 */}
          <div className="p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-4 w-full">
                <div>
                  <h3 className="font-bold text-foreground">
                    {t('contact.info.phone.title')}
                  </h3>
                  <div className="flex flex-col gap-1 mt-1">
                    {currentLocation.contact.phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\D/g, '')}`}
                        className="text-muted-foreground hover:text-primary transition-colors font-mono tracking-wide"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                {currentLocation.contact.fax && (
                  <>
                    <div className="w-full h-px bg-border/50" />
                    <div className="flex items-start gap-3">
                      <Printer className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          {t('contact.info.fax.title')}
                        </h3>
                        <p className="text-muted-foreground font-mono tracking-wide">
                          {currentLocation.contact.fax}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card: 信箱 */}
          <div className="p-6 rounded-3xl border border-border/50 bg-card hover:border-primary/30 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  {t('contact.info.email.title')}
                </h3>
                <a
                  href={`mailto:${currentLocation.contact.email}`}
                  className="block text-muted-foreground mt-1 font-mono hover:text-primary transition-colors"
                >
                  {currentLocation.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* 地圖 */}
          <div className="w-full h-48 sm:h-64 rounded-4xl overflow-hidden border border-border/50 relative group mt-4">
            <iframe
              src={currentLocation.address.embedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
              key={currentLocation.address.embedSrc}
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors" />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
