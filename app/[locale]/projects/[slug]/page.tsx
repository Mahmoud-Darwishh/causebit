import {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import Link from 'next/link';
import {getProjectBySlug, projects} from '@/data/projects';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import Breadcrumb from '@/components/shared/Breadcrumb';

interface ProjectPageProps {
  params: Promise<{locale: string; slug: string}>;
}

const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({slug: p.slug, locale})));
}

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const {slug} = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.titleKey,
    description: project.descriptionKey
  };
}

export default async function ProjectPage({params}: ProjectPageProps) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const hero = project.media[0];

  return (
    <div className="container py-5" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Breadcrumb
        items={[
          { label: t('navigation.projects'), href: `/${locale}/projects` },
          { label: t(project.titleKey) }
        ]}
      />
      <div className="row g-4 align-items-center mb-4">
        <div className="col-lg-6">
          <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{minHeight: '320px'}}>
            {hero.type === 'video' ? (
              <video
                className="w-100 h-100"
                style={{objectFit: 'cover'}}
                poster={hero.thumbnail}
                controls
              >
                <source src={hero.url} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={hero.url}
                alt={hero.alt || project.slug}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{objectFit: 'cover'}}
                priority
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <p className="text-uppercase text-secondary fw-semibold mb-2">{project.type.toUpperCase()}</p>
          <h1 className="fw-bold mb-3">{t(project.titleKey)}</h1>
          <p className="text-muted mb-3">{t(project.descriptionKey)}</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {project.category.map((cat) => (
              <span key={cat} className="badge bg-light text-primary border">
                {cat}
              </span>
            ))}
          </div>
          {project.technologies && (
            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="badge bg-primary-subtle text-primary">
                  {tech}
                </span>
              ))}
            </div>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="btn btn-primary me-2">
              Visit Live
            </Link>
          )}
          <Link href={`/${locale}/projects`} className="btn btn-outline-secondary">
            Back to projects
          </Link>
        </div>
      </div>

      <ProjectGallery media={project.media} projectSlug={project.slug} />
    </div>
  );
}
