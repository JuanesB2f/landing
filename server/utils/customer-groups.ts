/**
 * Varias filas en `customers` pueden corresponder a la misma persona
 * (mismo email o mismo user_id) con distintos id_customer.
 * Agrupamos por user_id (prioritario) o email normalizado.
 */
export function customerGroupKey(c: {
  id_customer?: string
  user_id?: string | null
  email?: string | null
}): string {
  if (c.user_id) return `u:${String(c.user_id)}`
  const e = (c.email || '').trim().toLowerCase()
  if (e) return `e:${e}`
  return `id:${String(c.id_customer)}`
}

export function mergeCustomerRows(
  customers: any[],
  orderCounts: Record<string, number>
): any[] {
  const groups = new Map<string, any[]>()
  for (const c of customers) {
    const k = customerGroupKey(c)
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k)!.push(c)
  }

  const merged: any[] = []
  for (const members of groups.values()) {
    const ids = members.map(m => m.id_customer).filter(Boolean)
    let totalOrders = 0
    for (const cid of ids) {
      totalOrders += orderCounts[String(cid)] ?? 0
    }

    const sorted = [...members].sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    )
    const canonical = sorted[0]
    merged.push({
      ...canonical,
      id_customer: canonical.id_customer,
      order_count: totalOrders
    })
  }

  merged.sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  )
  return merged
}

/** Todos los id_customer que comparten grupo con la fila indicada (misma persona). */
export async function resolveCustomerIdsInGroup(
  adminClient: any,
  seed: { id_customer: string; user_id?: string | null; email?: string | null }
): Promise<string[]> {
  const sid = String(seed.id_customer)

  if (seed.user_id) {
    const { data, error } = await adminClient
      .from('customers')
      .select('id_customer')
      .eq('user_id', seed.user_id)
    if (!error && data?.length) {
      return data.map((r: { id_customer: string }) => String(r.id_customer))
    }
  }

  const em = (seed.email || '').trim().toLowerCase()
  if (em) {
    const { data: rows, error } = await adminClient
      .from('customers')
      .select('id_customer, email')
    if (!error && rows?.length) {
      const ids = (rows as { id_customer: string; email: string | null }[])
        .filter(r => (r.email || '').trim().toLowerCase() === em)
        .map(r => String(r.id_customer))
      if (ids.length) return ids
    }
  }

  return [sid]
}
