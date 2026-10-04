import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  UserPlus,
  LogIn,
  CheckCircle2,
  AlertCircle,
  Lock,
} from 'lucide-react';

export interface StudentUser {
  username: string;
  fullName: string;
  rollNo: string;
  lastLogin: string;
}

export interface StoredAccount {
  username: string;
  password: string;
  fullName: string;
  rollNo: string;
}

interface AuthGateProps {
  onAuthenticated: (user: StudentUser) => void;
  accounts: StoredAccount[];
  onSaveAccount: (account: StoredAccount) => void;
  onUpdatePassword: (username: string, newPassword: string) => boolean;
}

type AuthMode = 'login' | 'register' | 'forgot';

// Owner security key required to create a new account or reset password
const OWNER_SECURITY_PIN = 'AKS6677';

export const AuthGate: React.FC<AuthGateProps> = ({
  onAuthenticated,
  accounts,
  onSaveAccount,
  onUpdatePassword,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setErrorMsg('Please enter your username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    const existing = accounts.find(
      (acc) => acc.username.toLowerCase() === trimmedUser.toLowerCase()
    );

    if (!existing || existing.password !== password) {
      setErrorMsg('Invalid username or password. Unauthorized access is restricted.');
      return;
    }

    onAuthenticated({
      username: existing.username,
      fullName: existing.fullName || 'Abhishek Shrivastava',
      rollNo: existing.rollNo || 'B.Tech CSE · AKS University, Satna',
      lastLogin: 'Fri, Sep 11 at 9:40 AM',
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setErrorMsg('Please choose a username.');
      return;
    }
    if (securityPin.trim() !== OWNER_SECURITY_PIN) {
      setErrorMsg('Invalid Owner Security PIN. Only the portal owner can create new accounts.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const exists = accounts.some(
      (acc) => acc.username.toLowerCase() === trimmedUser.toLowerCase()
    );
    if (exists) {
      setErrorMsg('Username already exists. Please login or reset your password.');
      return;
    }

    const newAcc: StoredAccount = {
      username: trimmedUser,
      password,
      fullName: fullName.trim() || 'Abhishek Shrivastava',
      rollNo: rollNo.trim() || 'B.Tech CSE · AKS University, Satna',
    };

    onSaveAccount(newAcc);
    onAuthenticated({
      username: newAcc.username,
      fullName: newAcc.fullName,
      rollNo: newAcc.rollNo,
      lastLogin: 'Fri, Sep 11 at 9:40 AM',
    });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setErrorMsg('Please enter your registered username.');
      return;
    }
    if (securityPin.trim() !== OWNER_SECURITY_PIN) {
      setErrorMsg('Invalid Owner Security PIN. Password reset is restricted to the owner.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Please enter a new password (at least 6 characters).');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }

    const updated = onUpdatePassword(trimmedUser, password);
    if (!updated) {
      setErrorMsg('Username not found in authorized records.');
      return;
    }

    setSuccessMsg(`Password updated successfully for "${trimmedUser}". Please login.`);
    setMode('login');
    setPassword('');
    setConfirmPassword('');
    setSecurityPin('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Bar Contract: 3 Zones */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <a href="#login" className="text-lg font-bold tracking-tight text-slate-900">
          Web Engineering Practical Portal
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'login' ? 'text-slate-900 underline underline-offset-4' : ''
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'register' ? 'text-slate-900 underline underline-offset-4' : ''
            }`}
          >
            Create New Account
          </button>
          <button
            type="button"
            onClick={() => switchMode('forgot')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'forgot' ? 'text-slate-900 underline underline-offset-4' : ''
            }`}
          >
            Forgot Password
          </button>
        </nav>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Lock className="w-3.5 h-3.5 text-slate-700" />
          <span>Private Access</span>
        </div>
      </header>

      {/* Main Centered Login Section Only */}
      <main id="login" className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Login Page
            </h1>
            <p className="text-xs text-slate-500">
              Enter your username and password to open the dashboard
            </p>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode('register')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => switchMode('forgot')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'forgot'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Forgot Password
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* MODE 1: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="login-username"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your unique username"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  autoComplete="username"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 pr-10 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login &amp; Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Create New Account
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Forgot New Password
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: CREATE NEW ACCOUNT */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="reg-fullname"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-roll"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Course / University
                </label>
                <input
                  id="reg-roll"
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="B.Tech CSE · AKS University, Satna"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-username"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  New Username *
                </label>
                <input
                  id="reg-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-pin"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Owner Security PIN *
                </label>
                <input
                  id="reg-pin"
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  placeholder="Enter owner security PIN"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="reg-password"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Password *
                  </label>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-confirm"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="reg-confirm"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account &amp; Enter</span>
              </button>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Already have an account?</span>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="forgot-username"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Registered Username
                </label>
                <input
                  id="forgot-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your registered username"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="forgot-pin"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Owner Security PIN *
                </label>
                <input
                  id="forgot-pin"
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  placeholder="Enter owner security PIN"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="forgot-password"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  New Password
                </label>
                <input
                  id="forgot-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="forgot-confirm"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="forgot-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Update Password</span>
              </button>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Create New Account
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer with requested copyright credit */}
      <footer className="px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-medium text-slate-800">
          © All Rights Reserved · Abhishek Shrivastava · B.Tech CSE, AKS University, Satna
        </span>
        <span className="text-slate-500">Web Engineering &amp; PHP Practical Portal</span>
      </footer>
    </div>
  );
};
