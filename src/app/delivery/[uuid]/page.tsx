import DeliveryDetails from '@/content/DeliveryDetail';
import { fetchDeliveryDetails } from '@/services/api';
import { notFound } from 'next/navigation';

export const revalidate = 60;


/**
 * Page component for individual delivery details.
 * This page is statically generated for all deliveries fetched by generateStaticParams.
 * @param params - Object containing the UUID of the delivery
 */
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
