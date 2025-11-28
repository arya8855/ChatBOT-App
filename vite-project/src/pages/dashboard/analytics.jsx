import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import "../../components/css/analytics.css";
import Header from "../../components/Header";
import useAnalytics from "../../hooks/use-analytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Main Analytics Component
const Analytics = () => {
  const { data } = useAnalytics();

  return (
    <>
      <Header title="Analytics" />

      <div className="metric-card-wrapper">
        <MissedChatsChart leadData={data?.leadGraph ?? []} />
        <AverageReplyTime total={data?.averageResponseTime  ?? 0} />
        <ResolvedTickets total={data?.totalResolvedLeads ?? 0} />
        <TotalChats total={data?.totalLeads ?? 0} />
      </div>
    </>
  );
};

export default Analytics;

// MissedChatsChart Component
const MissedChatsChart = ({ leadData }) => {
  const data = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
    ],
    datasets: [
      {
        label: "Missed Chats",
        data: leadData,
        borderColor: "limegreen",
        backgroundColor: "black",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <>
      <h3 className="metric-title">Missed Chats</h3>
      <Line data={data} options={options} />
    </>
  );
};

// ResolvedTickets Component
const ResolvedTickets = ({ total }) => {
  const resolvedPercent = total ?? 0;
  const unresolvedPercent = 100 - resolvedPercent;
  const data = {
    labels: ["resolved", "unresolved"],
    datasets: [
      {
        data: [resolvedPercent, unresolvedPercent ],
        backgroundColor: ["limegreen", "#eee"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="metric-card">
      <div className="metric-header">
        <h3 className="metric-title">Resolved Tickets</h3>
        <small>
          A callback system on a website, as well as proactive invitations, help
          to attract even more customers. A separate round button for ordering a
          call with a small animation helps to motivate more customers to make
          calls.
        </small>
      </div>

      <div className="metric-detail">
        <div className="doughnut-container">
          <Doughnut data={data} options={options} className="doughnut-wrapper" />
          <div className="doughnut-text">{resolvedPercent}%</div>
        </div>
      </div>
    </div>
  );
};

// AverageReplyTime Component
const AverageReplyTime = ({ total }) => (
  <div className="metric-card">
    <div className="metric-header">
      <h3 className="metric-title">Average Reply Time</h3>
      <small>
        For highest customer satisfaction, you should aim to reply within 15
        seconds. Faster responses increase conversations, trust, and sales.
      </small>
    </div>

    <p className="metric-detail">{total} secs</p>
  </div>
);

// TotalChats Component
const TotalChats = ({ total }) => (
  <div className="metric-card">
    <div className="metric-header">
      <h3 className="metric-title">Total Chats</h3>
      <small>
        This metric shows the total number of chats for all channels for the
        selected period.
      </small>
    </div>

    <p className="metric-detail">
      {total} {total > 1 ? "Chats" : "Chat"}
    </p>
  </div>
);
