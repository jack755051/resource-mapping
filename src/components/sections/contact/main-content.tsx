'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Printer, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

export function ContactMainContent() {
    const { t } = useTranslation();

    // 定義諮詢項目的 key，方便 map
    const inquiryTags = ['community', 'lpr', 'dvr', 'maintenance', 'other'];

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                {/* 左側：諮詢表單 */}
                <motion.div
                    className="lg:col-span-7 space-y-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight mb-2">{t('contact.form.title')}</h2>
                        <p className="text-muted-foreground">{t('contact.form.desc')}</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('contact.form.label.name')}</Label>
                                <Input id="name" placeholder={t('contact.form.placeholder.name')} className="bg-muted/20 border-border/50 focus:bg-background h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('contact.form.label.phone')}</Label>
                                <Input id="phone" placeholder={t('contact.form.placeholder.phone')} className="bg-muted/20 border-border/50 focus:bg-background h-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">{t('contact.form.label.email')}</Label>
                            <Input id="email" type="email" placeholder={t('contact.form.placeholder.email')} className="bg-muted/20 border-border/50 focus:bg-background h-12" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">{t('contact.form.label.type')}</Label>
                            <div className="flex flex-wrap gap-2">
                                {inquiryTags.map((tagKey) => (
                                    <button type="button" key={tagKey} className="px-4 py-2 rounded-full border border-border/50 text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">
                                        {t(`contact.form.tags.${tagKey}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">{t('contact.form.label.message')}</Label>
                            <Textarea
                                id="message"
                                placeholder={t('contact.form.placeholder.message')}
                                className="min-h-[150px] bg-muted/20 border-border/50 focus:bg-background resize-none"
                            />
                        </div>

                        <Button className="w-full md:w-auto px-8 py-6 text-lg rounded-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                            {t('contact.form.submit')} <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </motion.div>

                {/* 右側：聯絡資訊與地圖 */}
                <motion.div
                    className="lg:col-span-5 space-y-8"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* 資訊卡片堆疊 */}
                    <div className="grid gap-4">

                        {/* Card: 地址 */}
                        <div className="p-6 rounded-[1.5rem] border border-border/50 bg-card hover:border-primary/30 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{t('contact.info.address.title')}</h3>
                                    <p className="text-muted-foreground mt-1 leading-relaxed whitespace-pre-line">
                                        {t('contact.info.address.content')}
                                    </p>
                                    <a href="https://maps.app.goo.gl/YourActualGoogleMapsLink" target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-medium mt-2 inline-flex items-center hover:underline">
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
                                            <a href="tel:0229990707" className="text-muted-foreground hover:text-primary transition-colors font-mono tracking-wide">
                                                (02) 2999-0707
                                            </a>
                                            <a href="tel:0229990298" className="text-muted-foreground hover:text-primary transition-colors font-mono tracking-wide">
                                                (02) 2999-0298
                                            </a>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-border/50" />

                                    <div className="flex items-start gap-3">
                                        <Printer className="w-4 h-4 text-muted-foreground mt-1" />
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground">{t('contact.info.fax.title')}</h3>
                                            <p className="text-muted-foreground font-mono tracking-wide">(02) 2999-1755</p>
                                        </div>
                                    </div>
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
                                    <a href="mailto:gxunmail@yahoo.com.tw" className="block text-muted-foreground mt-1 font-mono hover:text-primary transition-colors">
                                        gxunmail@yahoo.com.tw
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 地圖嵌入區塊 */}
                    <div className="w-full h-64 rounded-[2rem] overflow-hidden border border-border/50 relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.37255859375!2d121.4589996!3d25.0543003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a8e8f7f0b0b1%3A0x1234567890abcdef!2zMjQx5paw5YyX5biC5paw6IuR5Y2A56aP5aO96KGXMTY05be3MTfomZ8x5qiT!5e0!3m2!1szh-TW!2stw!4v1234567890123"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors" />
                    </div>

                </motion.div>

            </div>
        </div>
    );
}