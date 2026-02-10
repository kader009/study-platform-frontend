import { Award, Infinity, Layers, Brain } from 'lucide-react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { FiCircle, FiZap } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const BenefitOfJoining = () => {
  return (
    <div>
      <main className="min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-5/12 relative min-h-125 lg:min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 z-10"></div>
          <Image
            alt="Students learning together"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_j5zgbwKr0cV99OY1BL1be3YIksZHQ1Q1TIH0PdHu7b4o11RhIS9vsdcOAEGINQozRfuJaXi98MkBEzgEd_Uz_J3pTRiw1q72L--VO6MrcD9ayRA7BMbwqtDfLsNeVugAWJPHl542pvHNjBnQLM1wKGNzn5qQbNTSLLkpv7hHlnIex2Fiy2hZelJ7jtmyuHHLCdqoJMAkUJNtAt1WgSB9yHvnj3Aqa3bAOdbecQJEPMfh6qe9fh9K1nbcpZGxKn6pCMLwUXTiiA"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 600px"
            quality={100}
            priority
          />
          <div className="absolute bottom-12 left-12 right-12 z-20 p-8 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hidden lg:block">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                <Image
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDseXcAzevv-9kAxsHIJzg-D1EMeg60pw1xg0an3k6LITK2l4BqtpTt39ynpn61y5aUxsc9QfrA-go55xpiPlCffG0QU-oMMkBZd1ZBUmtKnYGkb7a1Tpm11m4kofKmwIMjZzWhwRxyRzDDP2KFg-cDv_GpgKxd0NrjI3TNZ2sNKixjDlBP5aoNrgiOv5ElpwFRzAkE8u1F5F5xlr1ISFDI1Yt_DgOAhWiQm-JlehYkDzLgXKlXOkcWRll_fu1cNYb6d3GEUJ38Zw"
                  width={40}
                  height={40}
                />
                <Image
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxBuYKNVOObZ-VFSUFF1gZa5vKZujhFGHi2FBW0hWpjtPFYA_uvYrwkkNybrxT54b_TrelS2GSOzj0BzDxH9vm3Oit_KmNjudqtIR49r0kwJSGy8V7PZ4CEzQSuCRBbMTS3mJ1-ZYJ1IAoqCCjPvn29DcE1hYCfz2c3NLZZs-ET5nPs_Jy4Tk-8NpValu3r-WNkakUdXigiWvhSL5_jqcFhF6E1unhyJkkqvZbPpC4a0vVxc-n_3U24JaBmHwxiNaOqyARJjDULw"
                  width={40}
                  height={40}
                />
                <Image
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUIoyNgN_rKv6ZA8i9OJ_uTCBqU-6NjK7ftDHLeb_rGp0HWGR2TrGd9pQ5Pkg7o6Qdv0qXr54fZdgX5N9c3Gku2fLCLUjgiFEZXkJBiuyXfKJKoGZzptQ5Or4DV41pr9Oc8_VTU_aLzBB-OSF9uTdjIm5AFfAACdkqoxFLbRj_vIAV03t6Kpicr5iXb5iXHFf1hqPkBxhPDTUhBvcddDS9ApXmxo-88Eyy64DLun16FM4ljzrqy3O0dzjZvIBmeQnuZpzbzztKPw"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-white text-sm font-medium">
                Join now today
              </span>
            </div>
            <p className="text-white/90 italic text-lg leading-relaxed font-light">
              The interactive projects and direct mentor support transformed my
              career path in ways I never imagined possible.
            </p>
            <div className="mt-4 text-white font-semibold">
              — Sarah Jenkins, React Trainer
            </div>
          </div>
        </div>
        <div className="lg:w-7/12 bg-white dark:bg-background-dark p-8 lg:p-24 flex flex-col justify-center">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">
              The Edunest Advantage
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              Elevate Your Career <br />
              with <span className="text-primary">Edunest</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-12">
              Our platform goes beyond passive video watching. We have built an
              ecosystem designed for deep mastery, practical skills, and
              long-term career growth.
            </p>
            <div className="space-y-8 mb-12">
              <div className="group flex items-start gap-6 p-6 rounded-xl border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Recognized Certifications
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    Gain accredited certificates recognized by top Fortune 500
                    companies. Every milestone you reach is a verifiable
                    credential for your resume.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-6 p-6 rounded-xl border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Infinity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Lifetime Access
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    Enroll once, learn forever. Access your courses and all
                    future updates anytime, anywhere. Your learning journey has
                    no expiration date.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-6 p-6 rounded-xl border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Interactive Projects
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    Build real-world applications as you learn. Our hands-on lab
                    environments allow you to apply theories to practice
                    immediately.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-6 p-6 rounded-xl border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all duration-300">
                <div className="w-14 h-14 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Expert Mentorship
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    Connect with industry veterans through 1-on-1 sessions and
                    community forums. Get personalized feedback on your growth
                    and projects.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-sm shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                <Link href="/signup" className="block w-full h-full">
                  Get Started Today
                </Link>
              </button>
              <button className="px-10 py-4 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                <Link href="/session" className="block w-full h-full">
                  View All Courses
                </Link>
              </button>
            </div>
            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap gap-8 grayscale opacity-50 dark:invert">
                <div className="flex items-center gap-2">
                  <FiCircle className="w-5 h-5" />
                  <span className="font-bold text-lg italic">TECHCORP</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineViewGrid className="w-5 h-5" />
                  <span className="font-bold text-lg italic">GLOBALEDU</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  <span className="font-bold text-lg italic">DESIGNLY</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiZap className="w-5 h-5" />
                  <span className="font-bold text-lg italic">FASTCODE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BenefitOfJoining;
