import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsersQuery } from "../hooks";

const UserFilters = () => {
  const [params, setParams] = useSearchParams();

  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const active = params.get("active") ?? "all";
  const role = params.get("role") ?? "all";

  const { data: roles = [] } = useUsersQuery();

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (q.trim()) next.set("q", q.trim());
      else next.delete("q");
      setParams(next, { replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const onChangeActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const next = new URLSearchParams(params);
    if (v === "all") next.delete("active");
    else next.set("active", v);
    setParams(next, { replace: true });
  };

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const next = new URLSearchParams(params);
    if (v === "all") next.delete("role");
    else next.set("role", v);
    setParams(next, { replace: true });
  };

  const onClear = () => {
    const next = new URLSearchParams(params);
    next.delete("q");
    next.delete("active");
    next.delete("role");
    setQ("");
    setParams(next, { replace: true });
  };

  const hasFilters = useMemo(
    () => q.trim() || active !== "all" || role !== "all",
    [q, active, role]
  );
  return (
    <div>
      <input
        value={q}
        placeholder="사용자 이름 검색..."
        onChange={(e) => setQ(e.target.value)}
      />
      <select value={active} onChange={onChangeActive}>
        <option value="all">전체</option>
        <option value="true">활성</option>
        <option value="false">비활성</option>
      </select>
      <select value={role} onChange={onChangeRole}>
        <option value="all">전체 역할</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      {hasFilters && <button onClick={onClear}>필터 초기화</button>}
    </div>
  );
};

export default UserFilters;
