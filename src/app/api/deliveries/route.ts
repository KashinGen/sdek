import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DeliveryResponse } from '@/types';
import { ITEMS_PER_PAGE } from '@/const';

const dataPath = path.join(process.cwd(), 'public', 'mockData.json');

export async function GET(request: NextRequest) {
  try {
    const jsonData: DeliveryResponse = JSON.parse(
      fs.readFileSync(dataPath, 'utf8'),
    );

    let filteredDeliveries = jsonData.items;

    const status = request.nextUrl.searchParams.get('status');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10);
    if (status) {
      filteredDeliveries = filteredDeliveries.filter(
        delivery =>
          delivery.statuses[delivery.statuses.length - 1].code === status,
      );
    }

    const totalItems = filteredDeliveries.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDeliveries = filteredDeliveries.slice(startIndex, endIndex);

    return NextResponse.json({
      items: paginatedDeliveries,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
      headers: {
        'Cache-Control': 'no-store, max-age=100',
      },
    });
  } catch (error) {
    console.error('Error in GET /api/deliveries:', error);
    return NextResponse.json(
      { error: 'Failed to load deliveries data' },
      { status: 500 },
    );
  }
}
