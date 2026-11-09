export default function UserTable({ users = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
            <th className="py-3 px-4 font-semibold text-sm text-gray-600">Email</th>
            <th className="py-3 px-4 font-semibold text-sm text-gray-600">Role</th>
            <th className="py-3 px-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500 text-sm">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-dark">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{user.email}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold uppercase tracking-wider">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}