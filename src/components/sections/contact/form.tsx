'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

interface ContactFormProps {
    inquiryTags: string[];
}

export function ContactForm({ inquiryTags }: ContactFormProps) {
    const { t } = useTranslation();

    return (
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
                    <Textarea id="message" placeholder={t('contact.form.placeholder.message')} className="min-h-[150px] bg-muted/20 border-border/50 focus:bg-background resize-none" />
                </div>

                <Button className="w-full md:w-auto px-8 py-6 text-lg rounded-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                    {t('contact.form.submit')} <Send className="w-4 h-4" />
                </Button>
            </form>
        </motion.div>
    );
}