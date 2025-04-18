export default function StatCard({ title, value, icon }) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div>
          <h4 className="text-sm">{title}</h4>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <div className="text-yellow-400 text-3xl">{icon}</div>
      </div>
    );
  }
  