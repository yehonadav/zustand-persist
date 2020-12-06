import React, { useEffect, useState } from 'react';

import { getLoadManager } from 'zustand-persist/lib/LoadManager';

export interface PersistGateProps {
  children?: React.ReactNode;
  loading?: React.ReactNode;
  onBeforeLift?: () => void;
}

export function PersistGate(props: PersistGateProps): React.Element {
  const { children, loading = false, onBeforeLift } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getLoadManager().setLoaded('');
  }, []);

  getLoadManager().onAllLoaded(() => {
    onBeforeLift && onBeforeLift();
    setIsReady(true);
  });

  return <React.Fragment>{isReady ? children : loading}</React.Fragment>;
}
