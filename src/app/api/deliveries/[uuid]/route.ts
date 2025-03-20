import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DeliveryResponse } from '@/types';

const dataPath = path.join(process.cwd(),'public', 'mockData.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  try {
    const jsonData: DeliveryResponse = JSON.parse(
      fs.readFileSync(dataPath, 'utf8'),
    );

    const delivery = jsonData.items.find(item => item.uuid === uuid);

    if (!delivery) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(delivery);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to load delivery data' },
      { status: 500 },
    );
  }
}
