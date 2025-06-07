import { Text } from '@/components/atoms/text';

export default async function Home() {
  return (
    <div className="hidden lg:grid lg:h-dvh lg:place-items-center">
      <Text>Select a character to view details</Text>
    </div>
  );
}
