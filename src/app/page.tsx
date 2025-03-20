
import { DeliveriesScreen } from "@/content/DeliveriesScreen";
import { fetchDeliveries } from "@/services/api";
import { getFilterData } from "@/services/getFilterData";
import { Metadata } from "next";


export const revalidate = 60;

interface DeliveriesPageProps {
   status?: string;
    page?: string 
}


export const metadata: Metadata = {
  title: 'Deliveries',
  description: 'List of all deliveries with filtering and pagination',
};

/**
 * Server component for the Deliveries page.
 * Fetches initial data and renders the DeliveriesScreen component.
 * @param searchParams - Query parameters for filtering and pagination
 */
export default async function DeliveriesPage( searchParams: Promise<DeliveriesPageProps>) {
  const params = await searchParams;
  const status = params.status || '';
  const page = parseInt(params.page || '1', 10);
  try {
    const [deliveriesResponse, allDeliveriesResponse] = await Promise.all([
      fetchDeliveries(page, status),
      fetchDeliveries()
    ]);
  const { statuses } = getFilterData(allDeliveriesResponse.items);
  return (
    <DeliveriesScreen
      initialDeliveries={deliveriesResponse.items ?? []}
      initialStatus={status}
      initialPage={page}
      totalPages={deliveriesResponse.pagination.totalPages}
      statuses={statuses}
    />
  )
  } catch(e) {
    console.error('Failed to fetch deliveries:', e);

  }


}
