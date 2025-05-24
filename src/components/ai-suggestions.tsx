'use client';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function AISuggestions() {
  const generateSuggestions = () => {
    return [
      "Here's our refund policy: ...",
      "Would you like to exchange instead?",
      "Can you share the order number?",
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50 mt-4"
    >
      <div className="flex items-center gap-2 mb-2 text-primary">
        <Sparkles className="h-4 w-4" />
        <span className="font-medium">AI Suggestions</span>
      </div>
      
      <div className="space-y-2">
        {generateSuggestions().map((text, i) => (
          <motion.div
            key={i}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="p-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
          >
            <span className="text-sm">{text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}