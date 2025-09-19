// src/types/auth.ts
export interface AuthPageProps {
  onSwitchToRegister?: () => void;
  onSwitchToLogin?: () => void;
  onBack: () => void;
}

export type ViewType = 'welcome' | 'login' | 'register';
