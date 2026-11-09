export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <h4 className="font-bold text-dark">Allow Student Registrations</h4>
          <p className="text-sm text-gray-500">Toggle whether new students can create accounts.</p>
        </div>
        <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked />
      </div>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <h4 className="font-bold text-dark">Auto-generate Viva on Upload</h4>
          <p className="text-sm text-gray-500">Automatically run AI analysis when a file is uploaded.</p>
        </div>
        <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked />
      </div>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <h4 className="font-bold text-dark">Maintenance Mode</h4>
          <p className="text-sm text-gray-500">Temporarily disable the platform for all users.</p>
        </div>
        <input type="checkbox" className="w-5 h-5 accent-primary" />
      </div>
    </div>
  )
}