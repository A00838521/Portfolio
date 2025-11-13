import { AboutSection } from './AboutSection';
import { ProjectsSection } from './ProjectsSection';
import { SkillsSection } from './SkillsSection';
import { GitHubSection } from './GitHubSection';
import { InterestsSection } from './InterestsSection';

export function MainContent() {
  return (
    <main className="lg:ml-80 min-h-screen">
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <GitHubSection />
      <InterestsSection />
    </main>
  );
}
