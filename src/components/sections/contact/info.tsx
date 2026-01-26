'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Printer, ArrowRight, Building2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedContent } from '@/type/i18n';
import type { OfficeLocation } from '@/type/page/contact';

interface ContactInfoProps {
    locations: OfficeLocation[];
}

export function ContactInfo({ locations }: ContactInfoProps) {
    const { t, language } = useTranslation();

    // 狀態管理留在這裡，因為只有右側區塊需要知道目前選了哪個據點
    const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0]?.id || '');

    const currentLocation = locations.find(loc => loc.id === selectedLocationId) || locations[0];

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
                    <Label className="text-xs text-muted-foreground mb-1 block">Select Location</Label>
                    <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                        <SelectTrigger className="w-full h-12 bg-card border-border/50 rounded-xl text-base font-medium">
                            <SelectValue placeholder="選擇據點" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map((loc) => (
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
                    key={selectedLocationId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-4"
                >
                    {/* Card: 地址 */}
                    <div className="p-6 rounded-[1.5rem] border border-border/50 bg-card hover:border-primary/30 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">{t('contact.info.address.title')}</h3>
                                <p className="text-muted-foreground mt-1 leading-relaxed whitespace-pre-line">
                                    {getLocalizedContent(currentLocation.address.label, language)}
                                </p>
                                <a
                                    href={currentLocation.address.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary font-medium mt-2 inline-flex items-center hover:underline"
                                >
                                    {t('contact.info.address.map')} <ArrowRight className="w-3 h-3 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card: 電話與傳真 */}
                    <div className="p-6 rounded-[1.5rem] border border-border/50 bg-card hover:border-primary/30 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="space-y-4 w-full">
                                <div>
                                    <h3 className="font-bold text-foreground">{t('contact.info.phone.title')}</h3>
                                    <div className="flex flex-col gap-1 mt-1">
                                        {currentLocation.contact.phones.map((phone, index) => (
                                            <a key={index} href={`tel:${phone.replace(/\D/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors font-mono tracking-wide">
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
                                                <h3 className="text-sm font-bold text-foreground">{t('contact.info.fax.title')}</h3>
                                                <p className="text-muted-foreground font-mono tracking-wide">{currentLocation.contact.fax}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Card: 信箱 */}
                    <div className="p-6 rounded-[1.5rem] border border-border/50 bg-card hover:border-primary/30 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">{t('contact.info.email.title')}</h3>
                                <a href={`mailto:${currentLocation.contact.email}`} className="block text-muted-foreground mt-1 font-mono hover:text-primary transition-colors">
                                    {currentLocation.contact.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 地圖 */}
                    <div className="w-full h-64 rounded-[2rem] overflow-hidden border border-border/50 relative group mt-4">
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

// 補上 Label 需要的 import (從您的原本代碼複製過來即可)
import { Label } from '@/components/ui/label';