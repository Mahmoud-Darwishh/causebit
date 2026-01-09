import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import ProjectsSlider from '@/components/home/ProjectsSlider';
import HomeFAQ from '@/components/home/HomeFAQ';

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Services />
      <ProjectsSlider />
      <HomeFAQ />
    </div>
  );
}
