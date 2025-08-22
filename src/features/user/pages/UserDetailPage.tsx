import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserQuery,
} from "../hooks";
import { fmtDate } from "../../../shared/lib/date";
import Modal from "../../../shared/components/Modal";
import type { Role } from "../types";
import { usePaymentByUserIdQuery, usePaymentDeleteMutation } from "../../payments/hooks";
import { formatPrice } from "../../../shared/lib/price";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const { data: user, isLoading, isError } = useUserQuery(Number(id));
  const deleteMutation = useDeleteUserMutation();
  const { data: payment } = usePaymentByUserIdQuery(Number(id));
  const deletePaymentMutation = usePaymentDeleteMutation();

  const handleDelete = () => {
    deleteMutation.mutate(Number(id), {
      onSuccess: () => {
        navigate("/users");
      },
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const updateMutation = useUpdateUserMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData(e.currentTarget);

    const updatedUser = {
      id: Number(id),
      name: (formData.get("name") as string)?.trim() || user?.name,
      email: (formData.get("email") as string)?.trim() || user?.email,
      role: (formData.get("role") as Role) || user?.role,
      active: formData.get("active") === "on",
    };

    updateMutation.mutate(updatedUser, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  };

  const handleDeletePayment = (paymentId: number) => {
    deletePaymentMutation.mutate(paymentId, {
      onSuccess: () => {
        alert("결제 내역이 삭제되었습니다.");
      },
    });
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 도중 오류가 발생했습니다.</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <div>
      <button onClick={handleDelete}>
        {deleteMutation.isPending ? "삭제 중..." : "삭제"}
      </button>
      <button onClick={() => setOpenModal(true)}>수정</button>
      <div>
        <h1>{user?.name}</h1>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <p>Status: {user?.active ? "활동중" : "비활성화"}</p>
        <p>Created At: {fmtDate(user?.createdAt)}</p>
      </div>

      <div>
        <h2>결제 내역</h2>
        <ul>
          {payment?.map((p) => (
            <li key={p.id}>
              <button onClick={() =>handleDeletePayment(p.id)}>삭제</button>
              <p>결제일: {fmtDate(p.createdAt)}</p>
              <p>상태: {p.status}</p>
              <p>결제 방법: {p.method}</p>
              <p>결제 금액 : {formatPrice(p.amount)}</p>
            </li>
          ))}
        </ul>
      </div>

      {openModal && (
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          <p>사용자 수정</p>
          <form onSubmit={handleSubmit}>
            <label>
              이름:
              <input name="name" type="text" defaultValue={user.name} />
            </label>
            <label>
              이메일:
              <input name="email" type="email" defaultValue={user.email} />
            </label>
            <label>
              역할:
              <select defaultValue={user.role} name="role">
                <option value="member">사용자</option>
                <option value="manager">관리자</option>
                <option value="admin">어드민</option>
              </select>
            </label>
            <label>
              활성화:
              <input
                name="active"
                type="checkbox"
                defaultChecked={user.active}
              />
            </label>
            <button type="submit">
              {updateMutation.isPending ? "수정중..." : "수정"}
            </button>
            <button type="button" onClick={handleCloseModal}>
              취소
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserDetailPage;
