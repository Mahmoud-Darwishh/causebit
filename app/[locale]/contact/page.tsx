import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactFAQ from '@/components/contact/ContactFAQ';

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactFAQ />
    </div>
  );
}
