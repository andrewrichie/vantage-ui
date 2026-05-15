import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@vantage-ui/ui';
import React, { useState } from 'react';

import { LoginForm } from '../auth/login-form';
import { SignupForm } from '../auth/signup-form';

export function AuthGate() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div
      className="flex flex-col flex-1 p-6 overflow-y-auto animate-in fade-in duration-300"
      style={{ background: '#F5F5F6' }}
    >
      <div className="mb-8 flex justify-center mt-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="#053B84" />
          <path
            d="M5 14L10 5L15 14"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}
        className="w-full max-w-md mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login" className="font-body">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup" className="font-body">
            Create Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
