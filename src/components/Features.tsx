
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <section id="features" className="mt-36 flex flex-col items-center px-4">
                <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center font-mono">
                    Why CodeClarity?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

                    <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition text-center">
                        <h3 className="text-xl font-mono mb-4">Simplified Explanations</h3>
                        <p className="text-sm text-neutral-400 font-mono">
                            Break down complex code into clean, understandable logic.
                        </p>
                    </div>

                    <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition text-center">
                        <h3 className="text-xl font-mono mb-4">Simple & Clean</h3>
                        <p className="text-sm text-neutral-400 font-mono">
                            Minimal UI focused entirely on clarity and learning.
                        </p>
                    </div>

                    <div className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition text-center">
                        <h3 className="text-xl font-mono mb-4">Completely Free</h3>
                        <p className="text-sm text-neutral-400 font-mono">
                            Every feature is free — forever.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <Link to="/chat">
                        <button className="px-6 py-3 border font-mono border-gray-500 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                            Start Decoding
                        </button>
                    </Link>
                </div>
            </section>
  )
}
