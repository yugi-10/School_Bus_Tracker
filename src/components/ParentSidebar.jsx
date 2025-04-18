export default function ParentSidebar({ selected, setSelected }) {
    const links = ["Dashboard", "Notifications", "Profile"];
  
    return (
      <div className="bg-white/10 backdrop-blur-md text-white p-4 min-h-screen w-64 shadow-xl">
        <h2 className="text-xl font-orbitron mb-6 text-yellow-400">Parent </h2>
        <ul className="space-y-3">
          {links.map((link) => (
            <li
              key={link}
              onClick={() => setSelected(link)}
              className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition ${
                selected === link ? "bg-yellow-400 text-black" : "text-white"
              }`}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  