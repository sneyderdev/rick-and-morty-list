import { Text } from '@/components/atoms/text';

interface CharacterDetailItemProps {
  title: string;
  description: string;
}

export function CharacterDetailItem({
  title,
  description,
}: CharacterDetailItemProps) {
  return (
    <div className="flex-1 py-4">
      <Text as="h3" variant="heading">
        {title}
      </Text>
      <Text variant="muted">{description}</Text>
    </div>
  );
}
