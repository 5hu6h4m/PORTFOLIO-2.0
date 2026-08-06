import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shubham Jadhav — Frontend Engineer / Full Stack Developer',
  description: 'Engineering fast, scalable, and immersive web applications with Next.js 15, React 19, TypeScript, Node.js, and modern WebGL supporting elements.',
  keywords: ['Shubham Jadhav', 'Frontend Engineer', 'Full Stack Developer', 'React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Web Performance'],
  authors: [{ name: 'Shubham Jadhav' }],
  openGraph: {
    title: 'Shubham Jadhav — Frontend Engineer / Full Stack Developer',
    description: 'Building modern full-stack web applications with high performance, elegant UI engineering, and real-world product impact.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="bg-[#FAF7F2] text-[#191817] antialiased selection:bg-[#C87D46] selection:text-white">
        {children}
      </body>
    </html>
  );
}
