import { ReactNode, createContext, FC, useState, useMemo } from 'react';

interface BaseLayoutProps {
  children?: ReactNode;
}

interface ChartContextType {
  title: string | null;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChartContext = createContext<ChartContextType | null>(null);

const ChartProvider: FC<BaseLayoutProps> = ({ children }) => {
  const [title, setTitle] = useState<string | null>(null);

  const providerValue = useMemo(
    () => ({
      title,
      setTitle,
    }),
    [title, setTitle]
  );

  return (
    <ChartContext.Provider value={providerValue}>
      {children}
    </ChartContext.Provider>
  );
};

export { ChartProvider, ChartContext };
