import { Modal, Button, Box } from "@mui/material";
import PageLayout from "../components/layouts/page.layout.jsx";
import ProfileForm from "../components/layouts/profile-form.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_BASE = "http://127.0.0.1:8000";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastHeadline, setLastHeadline] = useState("");

  const handleAnalyze = async (payload) => {
    try {
      setLoading(true);
      setLastHeadline(payload.headline || "Profile Analysis");

      const res = await axios.post(`${API_BASE}/analyze`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setResult(res.data);
      setOpen(false);
    } catch (e) {
      console.error("Analyze failed", e);
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = (report) => {
    const doc = new jsPDF();

    doc.text("LinkedIn Job Readiness Report", 10, 10);
    doc.text(`Score: ${report.score}/100`, 10, 20);

    let y = 30;

    Object.entries(report.breakdown || {}).forEach(([k, v]) => {
      doc.text(`${k}: ${v}`, 10, y);
      y += 8;
    });

    y += 5;
    doc.text("Tips:", 10, y);
    y += 8;

    (report.tips || []).forEach((t) => {
      const text = typeof t === "string" ? t : t.tip;
      doc.text(`- ${text}`, 10, y);
      y += 7;
    });

    doc.save(`job-readiness-${Date.now()}.pdf`);
  };

  const saveReport = async () => {
    if (!result || !result.score || result.score <= 0) {
      alert("Invalid result. Please analyze a valid profile first.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/reports`, {
        headline: lastHeadline || "Profile Analysis",
        score: result.score,
        breakdown: result.breakdown,
        tips: result.tips,
      });

      alert("Report saved!");
      loadReports();
    } catch (e) {
      console.error("Save report failed", e);
      alert("Could not save report");
    }
  };

  const loadReports = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reports`);
      setReports(res.data || []);
    } catch (e) {
      console.error("Load reports failed", e);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const chartData = result?.breakdown
    ? Object.entries(result.breakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <PageLayout title="Profile Analyzer" subtitle="Get AI feedback on your profile">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Find your score
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <ProfileForm onSubmit={handleAnalyze} loading={loading} />
        </Box>
      </Modal>

      {result && (
        <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Score: {result.score}/100</h2>

          {chartData.length > 0 && (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <h3 className="font-semibold mt-4">Tips</h3>
          <ul className="mt-2 list-disc pl-6">
            {(result.tips || []).map((t, i) => (
              <li key={i}>{typeof t === "string" ? t : t.tip}</li>
            ))}
          </ul>

          <div className="flex gap-3 mt-4">
            <Button variant="contained" color="success" onClick={saveReport}>
              Save Report
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                exportPDF({
                  score: result.score,
                  breakdown: result.breakdown,
                  tips: result.tips,
                })
              }
            >
              Export Current PDF
            </Button>
          </div>
        </div>
      )}

      {reports.length > 0 && (
        <div className="mt-12 w-full max-w-3xl bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Saved Reports</h3>

          {reports.map((r) => (
            <div
              key={r.id}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{r.headline}</p>
                <p>Score: {r.score}</p>
                <p className="text-sm text-gray-400">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>

              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  exportPDF({
                    score: r.score,
                    breakdown: r.breakdown,
                    tips: r.tips,
                  })
                }
              >
                Download PDF
              </Button>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Home;