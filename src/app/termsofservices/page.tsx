import { Ban, Copyright, Bug, Megaphone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const TermsOfServices = () => {
  return (
    <main className="grow">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-[#0d141b] dark:text-white text-3xl font-black leading-tight tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="mt-4 text-[#4c739a] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. Your
            continued use of the platform signifies your acceptance of these
            terms.
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-sm border border-[#e7edf3] dark:border-[#2a3845] p-8 md:p-16">
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              1. Introduction
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                Welcome to EduNest (&quot;Company&quot;, &quot;we&quot;,
                &quot;our&quot;, &quot;us&quot;). These Terms of Service
                (&quot;Terms&quot;) govern your use of our website located at
                edunest.com (the &quot;Site&quot;) and our learning management
                services (collectively, the &quot;Services&quot;).
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by
                these Terms. If you disagree with any part of the terms, then
                you may not access the Service.
              </p>
            </div>
          </section>
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              2. User Accounts
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                To access certain features of the Service, you may be required
                to register for an account. You agree to provide accurate,
                current, and complete information during the registration
                process and to update such information to keep it accurate,
                current, and complete.
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>You are responsible for safeguarding your password.</li>
                <li>
                  You agree not to disclose your password to any third party.
                </li>
                <li>
                  You must notify us immediately upon becoming aware of any
                  breach of security or unauthorized use of your account.
                </li>
                <li>
                  You may not use as a username the name of another person or
                  entity or that is not lawfully available for use.
                </li>
              </ul>
            </div>
          </section>
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              3. Content Ownership
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                Our Service allows you to post, link, store, share and otherwise
                make available certain information, text, graphics, videos, or
                other material (&quot;Content&quot;). You are responsible for
                the Content that you post to the Service, including its
                legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content to the Service, you grant us the right and
                license to use, modify, publicly perform, publicly display,
                reproduce, and distribute such Content on and through the
                Service. You retain any and all of your rights to any Content
                you submit, post or display on or through the Service and you
                are responsible for protecting those rights.
              </p>
            </div>
          </section>
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              4. User Conduct
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                We are committed to providing a safe and positive learning
                environment. When using EduNest, you agree not to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-5 rounded-lg bg-[#f8fafc] dark:bg-[#202b36] border border-[#e7edf3] dark:border-[#2a3845]">
                  <h3 className="font-bold text-[#0d141b] dark:text-white mb-2 flex items-center gap-2">
                    <Ban className="text-red-500" size={20} />
                    Harassment
                  </h3>
                  <p className="text-sm">
                    Engage in harassment, bullying, or intimidation of any user
                    or instructor.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-[#f8fafc] dark:bg-[#202b36] border border-[#e7edf3] dark:border-[#2a3845]">
                  <h3 className="font-bold text-[#0d141b] dark:text-white mb-2 flex items-center gap-2">
                    <Copyright className="text-red-500" size={20} />
                    Infringement
                  </h3>
                  <p className="text-sm">
                    Upload material that violates the intellectual property
                    rights of others.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-[#f8fafc] dark:bg-[#202b36] border border-[#e7edf3] dark:border-[#2a3845]">
                  <h3 className="font-bold text-[#0d141b] dark:text-white mb-2 flex items-center gap-2">
                    <Bug className="text-red-500" size={20} />
                    Malware
                  </h3>
                  <p className="text-sm">
                    Distribute viruses, worms, or other malicious code.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-[#f8fafc] dark:bg-[#202b36] border border-[#e7edf3] dark:border-[#2a3845]">
                  <h3 className="font-bold text-[#0d141b] dark:text-white mb-2 flex items-center gap-2">
                    <Megaphone className="text-red-500" size={20} />
                    Spam
                  </h3>
                  <p className="text-sm">
                    Send unsolicited advertising or promotional materials.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              5. Subscription Terms
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                If you purchase any course or subscription on the Service, you
                agree to pay the applicable fees and taxes. Failure to pay these
                fees will result in the termination of your paid Services.
              </p>
              <p className="font-medium text-[#0d141b] dark:text-white mt-4">
                Refund Policy:
              </p>
              <p>
                EduNest offers a 30-day money-back guarantee for most courses.
                If you are not satisfied with a course, you may request a refund
                within 30 days of purchase. Refunds are not available for
                subscription plans after the 7-day trial period has ended.
              </p>
            </div>
          </section>
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              6. Limitation of Liability
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                In no event shall EduNest, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-decimal pl-6 space-y-2 marker:text-[#0d141b] dark:marker:text-white marker:font-bold">
                <li>
                  Your access to or use of or inability to access or use the
                  Service;
                </li>
                <li>
                  Any conduct or content of any third party on the Service;
                </li>
                <li>Any content obtained from the Service; and</li>
                <li>
                  Unauthorized access, use or alteration of your transmissions
                  or content.
                </li>
              </ul>
            </div>
          </section>
          <section className="mb-14">
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              7. Termination
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately
                cease. If you wish to terminate your account, you may simply
                discontinue using the Service or delete your account from the
                user dashboard settings.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight pb-4 mb-6 border-b border-[#e7edf3] dark:border-[#2a3845]">
              8. Contact Us
            </h2>
            <div className="text-[#4c739a] dark:text-slate-300 text-base leading-relaxed space-y-4">
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[#e7edf3] hover:bg-[#dce3e9] dark:bg-[#2a3845] dark:hover:bg-[#354352] text-[#0d141b] dark:text-white font-bold transition-colors w-full sm:w-auto"
                  href="mailto:support@edunest.com"
                >
                  <Mail size={20} />
                  support@edunest.com
                </Link>
                <Link
                  className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[#e7edf3] hover:bg-[#dce3e9] dark:bg-[#2a3845] dark:hover:bg-[#354352] text-[#0d141b] dark:text-white font-bold transition-colors w-full sm:w-auto"
                  href="/contact"
                >
                  <MapPin size={20} />
                  123 Learning Way, Dhaka, Bangladesh
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfServices;
