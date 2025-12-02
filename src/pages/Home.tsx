import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-neutral-900 min-h-screen text-white">


      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center h-[85vh] px-4 -mt-40">
        <h1 className="text-[3rem] md:text-[4.5rem] font-light tracking-tight font-mono">
          CodeClarity
        </h1>

        <h2 className="mt-4 text-lg opacity-70 font-mono">
          Understand Code Better, Faster
        </h2>

        <h2 className="mt-4 text-lg opacity-70 font-mono">
          DECODE • LEARN • BUILD
        </h2>

        <div className="flex gap-4 mt-8">
          <Link to="/chat">
            <button className="px-6 py-3 border font-mono border-gray-500 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* EXAMPLE CARD */}
      <section className="-mt-40 flex justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] md:w-[650px] border border-neutral-200">

          <p className="text-xs font-semibold text-neutral-500 mb-3 font-mono">
            SEE IN ACTION
          </p>

          <div className="bg-neutral-900 text-white p-5 rounded-xl font-mono text-sm">
{`function greet(name) {
  console.log(\`Hello, \${name}\`);
}
greet("Srivatsav");`}
          </div>

          <p className="mt-4 text-neutral-700 text-sm leading-relaxed">
            This function defines a simple greeting routine.
            It prints <span className="font-mono bg-neutral-200 px-1 rounded">Hello, Srivatsav</span> — showing template literals.
          </p>

        </div>
      </section>
    </div>
  );
}