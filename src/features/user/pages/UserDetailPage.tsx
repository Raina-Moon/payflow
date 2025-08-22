import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUserMutation, useUserQuery } from "../hooks";
import { fmtDate } from "../../../shared/lib/date";
import Modal from "../../../shared/components/Modal";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const { data: user, isLoading, isError } = useUserQuery(Number(id));
  const deleteMutation = useDeleteUserMutation();

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

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 도중 오류가 발생했습니다.</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <div>
      <button onClick={handleDelete}>
        {deleteMutation.isPending ? "삭제 중..." : "삭제"}
      </button>
      <button onClick={() => setOpenModal(true)}>수정</button>
      <h1>{user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Status: {user?.active ? "활동중" : "비활성화"}</p>
      <p>Created At: {fmtDate(user?.createdAt)}</p>

      {openModal && (
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          <p>모달</p>
        </Modal>
      )}
    </div>
  );
};

export default UserDetailPage;
