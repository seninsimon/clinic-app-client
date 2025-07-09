import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CenteredConfirmationModal from "../../components/common/ConfirmationModal";
import {
  useFetchDepartment,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from "../../hooks/useDepartment";

const Department = () => {
  const { data: departments, isLoading, isError } = useFetchDepartment();
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartment = useDeleteDepartment();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ deptName: "", description: "" });

  const [editId, setEditId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    deptName: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.deptName || !formData.description) {
      toast.error("All fields are required.");
      return;
    }

    createDepartment.mutate(formData, {
      onSuccess: () => toast.success("Department created!"),
      onError: () => toast.error("Failed to create department."),
    });

    setFormData({ deptName: "", description: "" });
    setShowForm(false);
  };

  const startEditing = (dept: any) => {
    setEditId(dept._id);
    setEditFormData({
      deptName: dept.deptName,
      description: dept.description,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditFormData({ deptName: "", description: "" });
  };

  const handleUpdate = () => {
    if (!editId) return;

    if (!editFormData.deptName || !editFormData.description) {
      toast.error("All fields are required.");
      return;
    }

    updateDepartment.mutate(
      { id: editId, ...editFormData },
      {
        onSuccess: () => toast.success("Department updated."),
        onError: () => toast.error("Failed to update department."),
      }
    );
    cancelEdit();
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    deleteDepartment.mutate(deleteId, {
      onSuccess: () => toast.success("Department deleted."),
      onError: () => toast.error("Failed to delete department."),
    });

    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Department Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add Department"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border rounded bg-gray-50 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Department Name</label>
            <input
              type="text"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              rows={3}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      )}

      {isLoading && <p>Loading departments...</p>}
      {isError && <p className="text-red-500">Failed to load departments.</p>}

      {departments && departments.length > 0 ? (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept: any, index: number) => (
              <tr key={dept._id}>
                <td className="p-2 border">{index + 1}</td>

                <td className="p-2 border">
                  {editId === dept._id ? (
                    <input
                      name="deptName"
                      value={editFormData.deptName}
                      onChange={handleEditChange}
                      className="w-full border px-1 py-0.5 rounded"
                    />
                  ) : (
                    dept.deptName
                  )}
                </td>

                <td className="p-2 border">
                  {editId === dept._id ? (
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      className="w-full border px-1 py-0.5 rounded"
                      rows={2}
                    />
                  ) : (
                    dept.description
                  )}
                </td>

                <td className="p-2 border flex gap-2">
                  {editId === dept._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(dept)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(dept._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No departments found.</p>
      )}

      {/* 🔒 Confirmation Modal */}
      <CenteredConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this department?"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Department;
