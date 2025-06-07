import { Text } from '@/components/atoms/text';

function CharactersList({ children }: React.ComponentProps<'section'>) {
  return <section>{children}</section>;
}

function CharactersListHeader({ children }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      variant="caption"
      size="xs"
      className="text-muted-foreground border-b py-4"
    >
      {children}
    </Text>
  );
}

function CharactersListContent({ children }: React.ComponentProps<'ul'>) {
  return <ul className="divide-y">{children}</ul>;
}

export { CharactersList, CharactersListHeader, CharactersListContent };
