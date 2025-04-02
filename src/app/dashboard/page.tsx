
const page = () => {
  return (
    <div>
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">📅 Total Sessions</h2>
            <p className="text-2xl font-bold">50</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">👥 Total Users</h2>
            <p className="text-2xl font-bold">120</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">📖 Study Materials</h2>
            <p className="text-2xl font-bold">30</p>
          </div>
        </main>
    </div>
  )
}

export default page