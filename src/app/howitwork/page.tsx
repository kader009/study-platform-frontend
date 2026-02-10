import {
  PlayCircle,
  ArrowDown,
  Check,
  Video,
  Users,
  ShieldCheck,
  QrCode,
  Link2,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HowItWork = () => {
  return (
    <div>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Next-Gen Education
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Master the Skills of <span className="text-primary">Tomorrow</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Step into a high-tech ecosystem designed to accelerate your career.
            Experience a revolutionary learning path from enrollment to industry
            certification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl transition-all group">
              <PlayCircle className="w-6 h-6 text-primary" />
              <span className="font-semibold">Watch the Experience</span>
            </button>
            <Link
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold shadow-sm shadow-primary/30 transition-all flex items-center justify-center"
              href="#process"
            >
              See the Process
              <ArrowDown className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <main className="py-24 px-6 relative overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-primary font-bold text-lg uppercase tracking-wider">
                  Step 01
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Begin your journey in{' '}
                  <span className="text-primary">minutes</span>.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Our AI-driven placement test analyzes your current skill level
                  and career goals to recommend the perfect learning path. No
                  more guessing—get a personalized curriculum tailored just for
                  you.
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span className="text-primary bg-primary/10 p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-slate-300">Smart skill assessment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary bg-primary/10 p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-slate-300">
                    One-click registration via GitHub/LinkedIn
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary bg-primary/10 p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-slate-300">
                    Financial aid &amp; scholarship options
                  </span>
                </li>
              </ul>
              <button className="bg-primary border border-primary/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary transition-all">
                Take the Assessment
              </button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden neon-border shadow-2xl">
                <Image
                  alt="Student enrolling"
                  className="w-full aspect-video object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq-C2KzRldnn-bFXQ1miEc7062GT6qv8e-zISufVuhsvyJPXX5OQn1LMIlekJLojtCwml4zvP1XGx1D1NVhrOQ7GeNvw_IcwucLx_mXZLIRMQdWJ3Flk0XTQ8QzGbUPRSEjDUAdFtkqb2s7wv-D9a9-rOUDzEWI0xKE3R5ikC71hTGVSJ1Gd22oSlWkyabn7bRpVddASeznotXuo5zlAXJHBHoiGqSLsq4BcAtmeljrcy_1w7kJmyOS70H9PDCbPEImJnr8RmJ1g"
                  width={800}
                  height={450}
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden neon-border shadow-2xl">
                <Image
                  alt="Collaborative learning"
                  className="w-full aspect-video object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z3UBUJuvzKjlBuxVYI7VMEW7yp0TokRoOQu3vljEs7S43cHcOEO9ki7BMw6lLKnFpL4jYfGQZJTrkazRV5hIXFdWF5rU5HwrsyAYRvd67DgIuZUabLEu57hJViZ8g6fL-8EQkPWnWKKhwf9Nvbg3x_vbHSO1Gl15zJxs7LYDuo3IRx_i4WP6dPQg2bUlqR9rwrH9qzJL868-m-6VLegU0diqvVqiyNWD8v-TaFE3upVoJbBagwhTDENsTnCeev1hjxSJHiGw2A"
                  width={800}
                  height={450}
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-primary font-bold text-lg uppercase tracking-wider">
                  Step 02
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Learn by <span className="text-primary">doing</span> together.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Forget boring lectures. Engage in live, collaborative sessions
                  with industry experts. Use our integrated code-along tools and
                  real-time whiteboards to solve problems as a team.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <Video className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-bold text-sm">Live Sessions</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    HD streaming with minimal latency.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <Users className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-bold text-sm">Peer Groups</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Study with people in your timezone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-primary font-bold text-lg uppercase tracking-wider">
                  Step 03
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Build your <span className="text-primary">portfolio</span>.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Apply your knowledge to real-world scenarios. Our labs provide
                  industry-standard environments for coding, design, and data
                  analysis. Build projects that actually matter and showcase
                  them to recruiters.
                </p>
              </div>
              <div className="flex items-center space-x-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex -space-x-4">
                  <Image
                    alt="User avatar 1"
                    className="w-12 h-12 rounded-full border-2 border-background-dark object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPumvnNBLm5RvZtx6Cn-LJ63y5yOHTDh9fKDPg4m2W-csFVxu-P6foauR1j3zbvUTxGELMwPwTJ-wy4Fl-JYz228teA1wXdsa7lJT0jLajtKnjAEYHvkESyMU5CXs8uYd0QnIMJaq_Jd5nRlAwK1RFLE0q0swexTxJcQI78ZkPkE4CqiO23jeZCJ-zVewqzwmYoafUQLCxginhVf7sLIFqTNc51syUoJDYKgy7em1d-jUf8XpP6SmQnHAW1w3PdtI-FYoiqOfXUQ"
                    width={48}
                    height={48}
                  />
                  <Image
                    alt="User avatar 2"
                    className="w-12 h-12 rounded-full border-2 border-background-dark object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXrdZA4gB7WZEXS786vFptX91SHMSsHtBUYQv2m60qfYElsFlq0i_xoZa9hJSf3HlMvj7ai6KvSusWbrcso80CP8653kqb_htj-zzdojDRxVvoJEB8_kpZb_X0NUByPy2zfa0mz-czPTvS_m81CJUlOK74Otb6eda8i_Q3LhnzZPYDOEqrnfSGWTbIPeHaMO9C5E0GaWuLkT34oFzjNFqzKSSnhHvHpg-ayXS6bG11p6G13ENnEtcEJAgXTVkmsGMw2MgMKX2qnA"
                    width={48}
                    height={48}
                  />
                  <Image
                    alt="User avatar 3"
                    className="w-12 h-12 rounded-full border-2 border-background-dark object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXGklgIJPlnu07_4SCTic4TiKjjJgE2pzhHpP6E0WQO4e_fgMGav1eLJt3KARljWo7uZep1LuL6s0iCIgCgren8IS1KAyoOQiS1fWbxBpRJXeCa5MaBtxwyulLpxDXcpqyogvKX16vm-XaLRKW2OAq0TMJx5fOneSbhfxOFld2gAZJpvq9XS_tymKyHEH6JlDXEOh7URoeY2Ii-ZmMjkFplcS1DnsqO2qNtaG6Z7NJM97VIk6cupCjXIADdenSLVtPDiwEGXfzcw"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Join few student teams
                  </p>
                  <p className="text-xs text-slate-400">
                    Working on active GitHub repositories
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden neon-border shadow-2xl">
                <Image
                  alt="Coding workspace"
                  className="w-full aspect-video object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz7bhI0IiwfmfMAHq9ikxDPfiY2Uaro_4lnpK98OiZfssf3d21t-bS0Qm449ynYwg3Vww40YbMIB4tIydhMf3BAvxSVqj-lzn6leimc7ayoMKY0eKfYni2KZ3r8k2LctfXVzc_MI64QY28-SAr6KRJ1ModgwPb_8BXfev4sGV4o0uIhzJ4p2wWhFbeRnRGIiABWIF2Z_1eQGuwF319wj8Oh2CEHUmsdlZReFN37VW9sxkS_FFSROG68vPry2HVkqTf-bOe_tbSCg"
                  width={800}
                  height={450}
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative bg-slate-900 p-8 rounded-2xl overflow-hidden neon-border shadow-2xl flex items-center justify-center min-h-100">
                <div className="w-full max-w-sm aspect-[1.4/1] bg-white text-slate-900 p-8 rounded shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="border-4 border-primary/20 h-full p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <ShieldCheck className="w-10 h-10 text-primary" />
                      <div className="text-right">
                        <p className="text-[8px] font-bold uppercase tracking-tighter">
                          Credential ID
                        </p>
                        <p className="text-[8px] font-mono">EDN-2024-8842</p>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <h5 className="text-sm uppercase tracking-widest text-slate-400 mb-1">
                        Certificate of Excellence
                      </h5>
                      <h4 className="text-lg font-bold">ALEX RIVERA</h4>
                      <p className="text-[10px] text-slate-500 mt-2">
                        has successfully mastered Advanced Full-Stack
                        Architecture
                      </p>
                    </div>
                    <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                      <div className="text-left">
                        <p className="text-[10px] font-bold">EDUNEST ACADEMY</p>
                        <p className="text-[8px] text-slate-400">
                          Director of Education
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <QrCode className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-primary font-bold text-lg uppercase tracking-wider">
                  Step 04
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Earn <span className="text-primary">recognition</span>.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Upon completion, receive an industry-recognized digital
                  certificate. Our credentials are baked on the blockchain for
                  permanent verification and can be shared directly to LinkedIn
                  with one click.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Link2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">LinkedIn Integration</h4>
                    <p className="text-sm text-slate-500">
                      Auto-post your achievements to your network.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Share2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Hiring Network</h4>
                    <p className="text-sm text-slate-500">
                      Your profile is shared with our 200+ partner companies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWork;
