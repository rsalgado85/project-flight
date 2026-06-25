import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5">
          <Construction className="h-10 w-10 text-white/30" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-white/70 mb-2">{title}</h1>
        <p className="text-sm text-white/40">Coming soon</p>
      </motion.div>
    </div>
  );
};

export default PlaceholderPage;
