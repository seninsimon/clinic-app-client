// src/pages/admin/Department.tsx

import { useFetchDepartment  , useCreateDepartment} from "../../hooks/useDepartment"
import { useState } from "react"

const Department = () => {
  const { data: departments, isLoading, isError } = useFetchDepartment()
  const createDepartment = useCreateDepartment()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ deptName: "", description: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.deptName || !formData.description) return
   
    createDepartment.mutate(formData)
    setFormData({ deptName: "", description: "" })
    setShowForm(false)
  }

  return (
    <div className="p-6">
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
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 space-y-4">
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

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
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
                <td className="p-2 border">{dept.deptName}</td>
                <td className="p-2 border">{dept.description}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded opacity-50 cursor-not-allowed" disabled>
                    Update
                  </button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded opacity-50 cursor-not-allowed" disabled>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No departments found.</p>
      )}
    </div>
  )
}

export default Department
