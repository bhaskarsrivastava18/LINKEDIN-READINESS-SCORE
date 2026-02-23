import Home from "./pages/home.jsx";


function App() {
  return (
    <Home/>
  )
  // const [form, setForm] = useState({
  //   headline: "",
  //   skills: "",
  //   experience: "",
  //   education: "",
  // });

  // const [result, setResult] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [reports, setReports] = useState([]);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const analyzeProfile = async () => {
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/analyze", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });

  //     if (!res.ok) throw new Error("API error");

  //     const data = await res.json();
  //     setResult(data);
  //   } catch (err) {
  //     setError("Could not connect to backend. Is FastAPI running?");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const saveReport = async () => {
  //   if (!result) return;

  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/reports", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         headline: form.headline,
  //         score: result.score,
  //         breakdown: result.breakdown,
  //         tips: result.tips,
  //       }),
  //     });

  //     if (!res.ok) throw new Error("Save failed");

  //     alert("Report saved!");
  //     loadReports();
  //   } catch {
  //     alert("Failed to save report");
  //   }
  // };

  // const loadReports = async () => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/reports");
  //     const data = await res.json();
  //     setReports(data);
  //   } catch {
  //     console.error("Failed to load reports");
  //   }
  // };

  // const exportPDF = () => {
  //   if (!result) return;

  //   const doc = new jsPDF();
  //   doc.text("LinkedIn Job Readiness Report", 10, 10);
  //   doc.text(`Score: ${result.score}/100`, 10, 20);

  //   let y = 30;
  //   Object.entries(result.breakdown || {}).forEach(([k, v]) => {
  //     doc.text(`${k}: ${v}`, 10, y);
  //     y += 10;
  //   });

  //   y += 5;
  //   doc.text("Tips:", 10, y);
  //   y += 10;

  //   (result.tips || []).forEach((t) => {
  //     const text =
  //       typeof t === "string"
  //         ? t
  //         : Object.entries(t)
  //             .map(([k, v]) => `${k.replaceAll("_", " ")}: ${v}`)
  //             .join(" | ");
  //     doc.text(`- ${text}`, 10, y);
  //     y += 10;
  //   });

  //   doc.save("job-readiness-report.pdf");
  // };

  // useEffect(() => {
  //   loadReports();
  // }, []);

  // const chartData = result?.breakdown
  //   ? Object.entries(result.breakdown).map(([name, value]) => ({
  //       name,
  //       value: Number(value) || 0, 
  //     }))
  //   : [];

  // return (
  //   <div className="min-h-screen bg-gray-100 p-6">
  //     <h1 className="text-3xl font-bold mb-6 text-center">
  //       LinkedIn Job Readiness Scorer
  //     </h1>

  //     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
  //       <input
  //         name="headline"
  //         placeholder="Headline"
  //         className="w-full border p-2 mb-2 rounded"
  //         onChange={handleChange}
  //       />
  //       <textarea
  //         name="skills"
  //         placeholder="Skills (comma separated)"
  //         className="w-full border p-2 mb-2 rounded"
  //         onChange={handleChange}
  //       />
  //       <textarea
  //         name="experience"
  //         placeholder="Experience"
  //         className="w-full border p-2 mb-2 rounded"
  //         onChange={handleChange}
  //       />
  //       <textarea
  //         name="education"
  //         placeholder="Education"
  //         className="w-full border p-2 mb-4 rounded"
  //         onChange={handleChange}
  //       />

  //       <button
  //         onClick={analyzeProfile}
  //         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  //       >
  //         {loading ? "Analyzing..." : "Analyze Profile"}
  //       </button>

  //       {error && <p className="text-red-500 mt-2">{error}</p>}
  //     </div>

  //     {result && (
  //       <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-lg shadow">
  //         <h2 className="text-xl font-bold mb-2">
  //           Score: {result.score}/100
  //         </h2>

  //         <div className="mb-3">
  //           {Object.entries(result.breakdown || {}).map(([key, val]) => (
  //             <p key={key}>
  //               {key}: {val}
  //             </p>
  //           ))}
  //         </div>

  //         {/* 🔥 CHART */}
  //         <div style={{ width: "100%", height: 300, marginTop: 20 }}>
  //           <ResponsiveContainer>
  //             <BarChart data={chartData}>
  //               <XAxis dataKey="name" />
  //               <YAxis domain={[0, 100]} />
  //               <Tooltip />
  //               <Bar dataKey="value" />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         </div>

  //         <h3 className="font-semibold mt-4 mb-2">Tips</h3>
  //         <ul className="list-disc pl-5">
  //           {(result.tips || []).map((t, i) => (
  //             <li key={i}>
  //               {typeof t === "string"
  //                 ? t
  //                 : Object.entries(t).map(([k, v]) => (
  //                     <div key={k}>
  //                       <strong>{k.replaceAll("_", " ")}:</strong> {String(v)}
  //                     </div>
  //                   ))}
  //             </li>
  //           ))}
  //         </ul>

  //         <div className="flex gap-3 mt-4">
  //           <button
  //             onClick={saveReport}
  //             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
  //           >
  //             Save Report
  //           </button>

  //           <button
  //             onClick={exportPDF}
  //             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
  //           >
  //             Export PDF
  //           </button>
  //         </div>
  //       </div>
  //     )}

  //     {reports.length > 0 && (
  //       <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
  //         <h3 className="text-lg font-bold mb-2">Saved Reports</h3>
  //         {reports.map((r) => (
  //           <div key={r.id} className="border-b py-2">
  //             <p className="font-semibold">{r.headline}</p>
  //             <p>Score: {r.score}</p>
  //             <p className="text-sm text-gray-500">
  //               {new Date(r.created_at).toLocaleString()}
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
}

export default App;