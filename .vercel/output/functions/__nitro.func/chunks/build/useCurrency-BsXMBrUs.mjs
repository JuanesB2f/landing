const useCurrency = () => {
  const formatCOP = (amount, opts = {}) => {
    const value = typeof amount === "string" ? parseFloat(amount) : amount || 0;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...opts
    }).format(value);
  };
  return { formatCOP };
};

export { useCurrency as u };
//# sourceMappingURL=useCurrency-BsXMBrUs.mjs.map
