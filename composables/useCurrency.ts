export const useCurrency = () => {
  const formatCOP = (
    amount: number | string | null | undefined,
    opts: Intl.NumberFormatOptions = {}
  ): string => {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount || 0
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...opts
    }).format(value as number)
  }

  return { formatCOP }
}


