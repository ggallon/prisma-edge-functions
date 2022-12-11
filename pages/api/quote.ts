import type { NextRequest } from 'next/server'

import { prisma } from '../../lib/prisma'

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const count = await prisma.quote.aggregate({
    _count: true,
  })

  const randomNo = Math.floor(Math.random() * count._count);

  const quote = await prisma.quote.findUnique({
    where: { id: randomNo, }
  })

  return new Response(
    JSON.stringify(quote),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=10, stale-while-revalidate=60',
      },
    }
  )
}
