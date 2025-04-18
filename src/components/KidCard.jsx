export default function KidCard({ name, grade, busNo, status }) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white shadow-md">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm">Grade: {grade}</p>
        <p className="text-sm">Bus: {busNo}</p>
        <p className={`mt-2 font-bold ${
          status === "Onboard" ? "text-green-400" : "text-yellow-300"
        }`}>
          Status: {status}
        </p>
      </div>
    );
  }
  