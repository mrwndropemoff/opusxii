import type { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, type MD3Theme } from 'react-native-paper';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/src/lib/query-client';

type AppProvidersProps = PropsWithChildren<{
  theme: MD3Theme;
}>;

export function AppProviders({ children, theme }: AppProvidersProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>{children}</PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
