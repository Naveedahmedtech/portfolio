import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Button from "../../components/Button";

import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY
} from "../../constants";

const contactSchema = z.object({
  name: z.string().min(2, "Identification required"),
  email: z.string().email("Invalid communication channel"),
  message: z.string().min(10, "Briefing requires more depth"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 min-h-screen overflow-hidden px-6 py-24 lg:px-16"
      style={
        {
          "--section-bg": "#0d0b09",
          "--section-next-bg": "#000000",
        } as React.CSSProperties
      }
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-1/4 h-[40rem] w-[40rem] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-1/4 h-[50rem] w-[50rem] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[0.65rem] font-bold uppercase tracking-[0.6em] text-accent/60"
          >
            Communication Protocol
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-6 font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tighter"
          >
            Initiate <br /> <span className="text-secondary/20">Alignment.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 text-lg text-textSecondary/60"
          >
            Ready to orchestrate your next high-fidelity engineering solution?
            Reach out via the secure channel below.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 overflow-hidden rounded-[3rem] border border-primary/10 bg-white/[0.02] p-8 backdrop-blur-xl lg:p-16"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent shadow-[0_0_30px_rgba(226,161,119,0.3)]">
                  <FaCheckCircle className="text-4xl" />
                </div>
                <h3 className="mt-8 font-display text-4xl">Message Delivered.</h3>
                <p className="mt-4 text-textSecondary/60">
                  Protocol confirmed. I will review your briefing and align with your schedule shortly.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  variant="ghost"
                  className="mt-10"
                >
                  New Briefing
                </Button>
              </motion.div>
            ) : (
              <form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <div className="grid gap-10 lg:grid-cols-2">
                  <div className="relative">
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Identified Name"
                      className={`peer w-full border-b bg-transparent px-0 py-4 font-display text-2xl outline-none transition-all placeholder:text-transparent ${errors.name ? "border-red-500/50" : "border-primary/20 focus:border-accent"
                        }`}
                    />
                    <label className="absolute left-0 top-0 -translate-y-4 scale-75 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-textSecondary/40 transition-all peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-textSecondary/20 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-accent">
                      Full Identification
                    </label>
                    {errors.name && (
                      <span className="mt-2 flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-red-500/60">
                        <FaExclamationCircle /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Communication Channel"
                      className={`peer w-full border-b bg-transparent px-0 py-4 font-display text-2xl outline-none transition-all placeholder:text-transparent ${errors.email ? "border-red-500/50" : "border-primary/20 focus:border-accent"
                        }`}
                    />
                    <label className="absolute left-0 top-0 -translate-y-4 scale-75 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-textSecondary/40 transition-all peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-textSecondary/20 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-accent">
                      Communication Channel (Email)
                    </label>
                    {errors.email && (
                      <span className="mt-2 flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-red-500/60">
                        <FaExclamationCircle /> {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    {...register("message")}
                    placeholder="Briefing Detail"
                    rows={4}
                    className={`peer w-full border-b bg-transparent px-0 py-4 font-body text-lg outline-none transition-all placeholder:text-transparent ${errors.message ? "border-red-500/50" : "border-primary/20 focus:border-accent"
                      }`}
                  />
                  <label className="absolute left-0 top-0 -translate-y-4 scale-75 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-textSecondary/40 transition-all peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-textSecondary/20 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-accent">
                    Briefing Detail
                  </label>
                  {errors.message && (
                    <span className="mt-2 flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-red-500/60">
                      <FaExclamationCircle /> {errors.message.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center justify-between gap-8 pt-6 lg:flex-row">
                  <span className="max-w-xs text-xs text-textSecondary/30">
                    Encrypted submission via secure cloud infrastructure (EmailJS). No data stored locally.
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === "sending"}
                    className="group min-w-[15rem]"
                  >
                    {status === "sending" ? (
                      "Transmitting..."
                    ) : (
                      <>
                        Launch Brief <FaPaperPlane className="ml-2 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
