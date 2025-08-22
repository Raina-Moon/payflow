import React, { useMemo } from "react";
import { useUsersQuery } from "../hooks";
import { Link, useSearchParams } from "react-router-dom";
import type { Role } from "../types";
import UsersListView from "../components/UserListView";

const UsersListPage = () => {
  const [params] = useSearchParams();

  const qParams = params.get("q") || "";
  const activeParams = params.get("active") || "all";
  const roleParams = params.get("role") || "all";

  const filters = useMemo(() => {
    const active =
      activeParams === "true"
        ? true
        : activeParams === "false"
        ? false
        : undefined;

    const role =
      roleParams && roleParams !== "all" ? (roleParams as Role) : undefined;

    return {
      q: qParams,
      active,
      role,
    };
  }, [qParams, activeParams, roleParams]);

  const { data: users, isLoading } = useUsersQuery(filters);

  return <UsersListView users={users} isLoading={isLoading} />;
};

export default UsersListPage;
