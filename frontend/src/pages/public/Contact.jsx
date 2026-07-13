import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import TextField from "../../components/form/TextField";
import Textarea from "../../components/form/Textarea";
import PageHero from "../../components/public/PageHero";
import SectionHeader from "../../components/public/SectionHeader";
import SocialLink from "../../components/public/SocialLink";

import { useAppContext } from "../../contexts/AppContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import usePageSeo from "../../hooks/usePageSeo";
import { contactMessageSchema } from "../../schemas";
import { contactService } from "../../services/api";
import { notifySuccess } from "../../utils/toast";

const Contact = () => {
  const { about, contact, socialLinks } = useAppContext();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, applyBackendErrors } = useFormWithValidation(contactMessageSchema, { name: "", email: "", phone: "", subject: "", message: "" });

  usePageSeo({ title: "Contact", description: about?.headline || "Send a message through the public portfolio contact form." });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await contactService.sendMessage(values);
      notifySuccess("Message sent successfully.");
      reset();
    } catch (error) {
      applyBackendErrors(error);
    }
  });

  return (
    <div className="pb-24">
      <PageHero eyebrow="Contact" title="Start the conversation" description="Use the live contact form below to get in touch. No mock submission flow is used here." breadcrumbs={[{ label: "Contact" }]} aside={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{contact.email ? <div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiMail className="h-4 w-4" />Email</div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{contact.email}</p></div> : null}{contact.phone ? <div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiPhone className="h-4 w-4" />Phone</div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{contact.phone}</p></div> : null}{contact.address ? <div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiMapPin className="h-4 w-4" />Address</div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{contact.address}</p></div> : null}</div>} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:px-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
          <SectionHeader eyebrow="Message" title="Send a direct inquiry" description="Fields are validated in the frontend and submitted to the existing Spring Boot API." />
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Name" name="name" error={errors.name?.message} required><TextField id="name" placeholder="Your name" error={errors.name} {...register("name")} /></FormField>
              <FormField label="Email" name="email" error={errors.email?.message} required><TextField id="email" type="email" placeholder="you@example.com" error={errors.email} {...register("email")} /></FormField>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Phone" name="phone" error={errors.phone?.message}><TextField id="phone" placeholder="Optional phone number" error={errors.phone} {...register("phone")} /></FormField>
              <FormField label="Subject" name="subject" error={errors.subject?.message} required><TextField id="subject" placeholder="How can I help?" error={errors.subject} {...register("subject")} /></FormField>
            </div>
            <FormField label="Message" name="message" error={errors.message?.message} required><Textarea id="message" rows={7} placeholder="Share a little context about your request" error={errors.message} {...register("message")} /></FormField>
            <Button type="submit" loading={isSubmitting} className="rounded-full px-6 py-3"><FiSend className="mr-2 h-4 w-4" />Send message</Button>
          </form>
        </section>
        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><h2 className="text-lg font-semibold text-slate-950 dark:text-white">What happens next</h2><div className="mt-5 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300"><p>Your message is validated client-side, then submitted to the live backend contact endpoint.</p><p>Use this form for freelance work, roles, consulting, collaborations, or technical questions.</p></div></section>
          {socialLinks.length ? <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><h2 className="text-lg font-semibold text-slate-950 dark:text-white">Social links</h2><div className="mt-5 flex flex-col gap-3">{socialLinks.filter((link) => link.platform !== "EMAIL").map((link) => <SocialLink key={link.id} socialLink={link} />)}</div></section> : null}
        </aside>
      </div>
    </div>
  );
};

export default Contact;
