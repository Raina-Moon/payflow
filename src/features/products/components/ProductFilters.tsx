import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductCategoriesQuery } from "../hooks";

const ProductFilters = () => {
  const [params, setParams] = useSearchParams();

  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const cat = params.get("category") ?? "all";

  const { data: categories = [] } = useProductCategoriesQuery();

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (q.trim()) next.set("q", q.trim());
      else next.delete("q");
      setParams(next, { replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const onChageCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const next = new URLSearchParams(params);
    if (v === "all") next.delete("category");
    else next.set("category", v);
    setParams(next, { replace: true });
  };

  const onClear = () => {
    const next = new URLSearchParams(params);
    next.delete("q");
    next.delete("category");
    setQ("");
    setParams(next, { replace: true });
  };

  const hasFilters = useMemo(() => q.trim() || cat !== "all", [q, cat]);
  return (
    <div>
      <input
        value={q}
        placeholder="상품 이름 검색..."
        onChange={(e) => setQ(e.target.value)}
      />
      <select value={cat} onChange={onChageCat}>
        <option value="all">전체</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {hasFilters && <button onClick={onClear}>필터 초기화</button>}
    </div>
  );
};

export default ProductFilters;
