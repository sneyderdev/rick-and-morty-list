import type { Character } from '@/services/domain';

import { CharactersSidebar } from '@/components/organisms/characters-sidebar';

interface AppLayoutTemplateProps {
  characters: Array<Character>;
  children: React.ReactNode;
}

export function AppLayoutTemplate({
  characters,
  children,
}: AppLayoutTemplateProps) {
  return (
    <div className="min-h-dvh lg:flex">
      <CharactersSidebar characters={characters} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
