import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sai Pavan - Senior Data Engineer',
  description: 'Senior Data Engineer specializing in Azure, Databricks, and Agentic AI. Building scalable cloud-native data platforms.',
  keywords: 'Data Engineer, Azure, Databricks, Data Pipeline, Cloud Architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-light">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
