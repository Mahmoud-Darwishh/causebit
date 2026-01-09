import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProjectsGrid from '@/components/portfolio/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects - Causebit',
  description: 'Explore our portfolio of web development, mobile apps, and UI/UX design projects.',
};

interface ProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsGrid />;
}
