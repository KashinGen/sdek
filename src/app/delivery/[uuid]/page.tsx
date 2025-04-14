import DeliveryDetails from '@/content/DeliveryDetail';
import { fetchDeliveryDetails } from '@/services/api';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const delivery = await fetchDeliveryDetails(uuid);
  if (!delivery) {
    notFound();
  }

  return <DeliveryDetails delivery={delivery} />;
}
