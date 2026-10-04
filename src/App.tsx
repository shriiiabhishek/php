/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AuthGate, StoredAccount, StudentUser } from './components/AuthGate';
import { PhpDashboard } from './components/PhpDashboard';

const ACCOUNTS_STORAGE_KEY = 'php_portal_accounts_strict_v3';

const DEFAULT_ACCOUNTS: StoredAccount[] = [
  {
    username: 'abhishek_aks_cse',
    password: 'Abhi@Satna#6677',
    fullName: 'Abhishek Shrivastava',
    rollNo: 'B.Tech CSE · AKS University, Satna',
  },
];

export default function App() {
  const [accounts, setAccounts] = useState<StoredAccount[]>(() => {
    try {
      const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  });

  // Always start on the Login page first; dashboard opens only after entering valid username & password
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(null);

  const handleSaveAccount = (newAccount: StoredAccount) => {
    setAccounts((prev) => {
      const filtered = prev.filter(
        (a) => a.username.toLowerCase() !== newAccount.username.toLowerCase()
      );
      const updated = [...filtered, newAccount];
      try {
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage error
      }
      return updated;
    });
  };

  const handleUpdatePassword = (username: string, newPassword: string): boolean => {
    let found = false;
    setAccounts((prev) => {
      const updated = prev.map((acc) => {
        if (acc.username.toLowerCase() === username.toLowerCase()) {
          found = true;
          return { ...acc, password: newPassword };
        }
        return acc;
      });
      try {
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage error
      }
      return updated;
    });
    return found;
  };

  const handleAuthenticated = (user: StudentUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <AuthGate
        onAuthenticated={handleAuthenticated}
        accounts={accounts}
        onSaveAccount={handleSaveAccount}
        onUpdatePassword={handleUpdatePassword}
      />
    );
  }

  return <PhpDashboard user={currentUser} onLogout={handleLogout} />;
}
