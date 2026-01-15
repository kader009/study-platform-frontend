'use client';

interface AdminLoginProps {
  onDemoLogin: (email: string, password: string) => void;
}

const AdminLogin = ({ onDemoLogin }: AdminLoginProps) => {
  const handleDemoLogin = () => {
    const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL || '';
    const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || '';

    onDemoLogin(DEMO_EMAIL, DEMO_PASSWORD);
  };

  return (
    <div className="text-center mb-6">
      <button
        onClick={handleDemoLogin}
        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-colors"
      >
        Try Demo Login
      </button>
    </div>
  );
};

export default AdminLogin;