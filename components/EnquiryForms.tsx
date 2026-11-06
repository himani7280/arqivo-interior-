"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { contactContent, enquireContent, TYPE } from "@/data/data";
import { ChevronDownIcon } from "@/lib/icons";
import { FormButton } from "./Button";

const { fields, topics, submit, sending } = enquireContent.form;

const FIELD =
  "w-full rounded-none border border-[#ddd3cd] bg-white px-[clamp(1rem,1.4vw,1.35rem)] text-[clamp(0.95rem,1.2vw,1.1rem)] text-[#211b18] outline-none transition placeholder:text-[#736862] focus:border-[#9b7b69] focus:ring-3 focus:ring-[#9b7b69]/15 aria-[invalid=true]:border-[#b4342d]";
const FIELD_H = "h-[clamp(3.1rem,4.2vw,3.8rem)]";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Variant = "enquiry" | "contact";
type FieldKey = keyof typeof fields;
type Errors = Partial<Record<FieldKey, string>>;

const validate = (data: FormData, variant: Variant): Errors => {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const errors: Errors = {};
  if (get("name").length < 2) errors.name = fields.name.error;
  if (!EMAIL_RE.test(get("email"))) errors.email = fields.email.error;
  if (get("phone").replace(/\D/g, "").length < 8) errors.phone = fields.phone.error;
  if (variant === "enquiry" && !get("topic")) errors.topic = fields.topic.error;
  if (variant === "contact" && get("subject").length < 2) errors.subject = fields.subject.error;
  if (get("message").length < 10) errors.message = fields.message.error;
  return errors;
};

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-1.5 block text-[#b4342d] ${TYPE.xs}`}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export function EnquiryForm({ variant }: { variant: Variant }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(new FormData(form), variant);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    form.reset();
    router.push("/thank-you");
  };

  const invalid = (key: FieldKey) => (errors[key] ? true : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-[clamp(1rem,2vw,1.8rem)] gap-y-[clamp(1rem,2vw,1.8rem)] sm:grid-cols-2">
      <Field label={fields.name.label} error={errors.name}>
        <input name="name" autoComplete="name" placeholder={fields.name.placeholder} aria-invalid={invalid("name")} className={`${FIELD} ${FIELD_H}`} />
      </Field>
      <Field label={fields.email.label} error={errors.email}>
        <input name="email" type="email" autoComplete="email" placeholder={fields.email.placeholder} aria-invalid={invalid("email")} className={`${FIELD} ${FIELD_H}`} />
      </Field>
      <Field label={fields.phone.label} error={errors.phone}>
        <input name="phone" type="tel" autoComplete="tel" placeholder={fields.phone.placeholder} aria-invalid={invalid("phone")} className={`${FIELD} ${FIELD_H}`} />
      </Field>

      {variant === "enquiry" ? (
        <Field label={fields.topic.label} error={errors.topic}>
          <span className="relative block">
            <select name="topic" defaultValue="" aria-invalid={invalid("topic")} className={`${FIELD} ${FIELD_H} appearance-none pr-12`}>
              <option value="" disabled>
                {fields.topic.placeholder}
              </option>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
            <ChevronDownIcon strokeWidth={1.5} className="pointer-events-none absolute right-[1.4vw] top-1/2 size-[clamp(1.1rem,1.6vw,1.6rem)] min-w-[1.1rem] -translate-y-1/2 text-[#211b18]" />
          </span>
        </Field>
      ) : (
        <Field label={fields.subject.label} error={errors.subject}>
          <input name="subject" placeholder={fields.subject.placeholder} aria-invalid={invalid("subject")} className={`${FIELD} ${FIELD_H}`} />
        </Field>
      )}

      <div className="sm:col-span-2">
        <Field label={fields.message.label} error={errors.message}>
          <textarea
            name="message"
            placeholder={fields.message.placeholder}
            aria-invalid={invalid("message")}
            className={`${FIELD} min-h-[clamp(7.5rem,10.5vw,9.5rem)] resize-y py-[clamp(0.9rem,1.3vw,1.25rem)]`}
          />
        </Field>
      </div>

      <div className={`mt-[clamp(0.2rem,1.4vw,1.4rem)] sm:col-span-2 ${variant === "contact" ? "text-center" : ""}`}>
        <FormButton disabled={status === "sending"}>
          {status === "sending" ? sending : variant === "enquiry" ? submit : contactContent.form.submit}
        </FormButton>
      </div>
    </form>
  );
}
