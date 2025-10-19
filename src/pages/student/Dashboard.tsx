import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Button, Card, Badge, Avatar } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import type { Student, Drive, Stats, Activity } from "../../types";
/**
 * Dashboard - Modern, dynamic student dashboard
 * Fetches real data from API/props
 */

export default function Dashboard() {
  const navigate = useNavigate();
  
  // State management - replace with actual API calls
  const [student, setStudent] = useState<Student | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [upcomingDrives, setUpcomingDrives] = useState<Drive[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual fetch
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // const response = await fetch('/api/student/dashboard');
        // const data = await response.json();
        
        // Mock data for now - replace with actual API data
        setStudent({
          id: "1",
          name: "SANJEV R",
          email: "sanjev.21cs@kct.ac.in",
          registerNumber: "21BCS211",
          degree: "B.E. CSE",
          batch: "2025",
          college: "Kumaraguru College of Technology",
          cgpa: "8.5",
        });

        setStats({
          totalDrives: 12,
          applied: 5,
          eligible: 8,
          placed: 0,
          interviews: 3,
          offers: 0,
        });

        setUpcomingDrives([
          {
            id: 1,
            company: "Google",
            location: "Bangalore",
            type: "Full Time",
            role: "Software Engineer",
            salary: "₹18-22L PA",
            status: "Eligible",
            deadline: "2025-10-25",
          },
          {
            id: 2,
            company: "Microsoft",
            location: "Hyderabad",
            type: "Full Time",
            role: "SDE-1",
            salary: "₹16-20L PA",
            status: "Eligible",
            deadline: "2025-10-28",
          },
          {
            id: 3,
            company: "Amazon",
            location: "Chennai",
            type: "Internship",
            role: "Software Development Intern",
            salary: "₹50k PM",
            status: "Applied",
            deadline: "2025-10-30",
          },
        ]);

        setRecentActivity([
          {
            id: "1",
            type: "application",
            title: "Application Submitted",
            company: "Amazon",
            timestamp: "2 hours ago",
            status: "completed",
          },
          {
            id: "2",
            type: "interview",
            title: "Technical Interview",
            company: "Microsoft",
            timestamp: "Tomorrow at 10:00 AM",
            status: "upcoming",
          },
          {
            id: "3",
            type: "test",
            title: "Online Assessment",
            company: "Google",
            timestamp: "Oct 20, 2025",
            status: "upcoming",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !student || !stats) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 60,
              height: 60,
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <Text size="4" style={{ color: "white" }}>
            Loading Dashboard...
          </Text>
        </div>
      </div>
    );
  }

  const getDaysUntil = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days`;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Left Sidebar */}
      <aside
        style={{
          width: 280,
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          padding: "24px",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          boxShadow: "4px 0 24px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <Flex align="center" gap="3" style={{ marginBottom: 40 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            H
          </div>
          <div>
            <Text size="5" weight="bold" style={{ color: "white", display: "block" }}>
              HireTrack
            </Text>
            <Text size="1" style={{ color: "#94a3b8" }}>
              Student Portal
            </Text>
          </div>
        </Flex>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <NavItem icon="🏠" label="Dashboard" active onClick={() => navigate("/student/dashboard")} />
          <NavItem icon="💼" label="Drives" onClick={() => navigate("/student/drives")} />
          <NavItem icon="📄" label="Applications" />
          <NavItem icon="📅" label="Interviews" />
          <NavItem icon="👤" label="Profile" onClick={() => navigate("/student/profile")} />
          <NavItem icon="⚙️" label="Settings" />
        </nav>

        {/* User Profile Card */}
        <Card
          style={{
            marginTop: "auto",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: 16,
            borderRadius: 12,
            marginTop: 40,
            cursor: "pointer",
          }}
          onClick={() => navigate("/student/profile")}
        >
          <Flex align="center" gap="3">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: 700,
              }}
            >
              {student.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div style={{ flex: 1 }}>
              <Text size="2" weight="bold" style={{ color: "white", display: "block" }}>
                {student.name.split(" ")[0]}
              </Text>
              <Text size="1" style={{ color: "#94a3b8" }}>
                {student.batch}
              </Text>
            </div>
          </Flex>
        </Card>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 280, flex: 1, padding: "32px 40px" }}>
        {/* Top Bar */}
        <Flex justify="between" align="center" style={{ marginBottom: 32 }}>
          <div>
            <Text size="2" color="gray" style={{ display: "block", marginBottom: 4 }}>
              Welcome back,
            </Text>
            <Text size="8" weight="bold">
              {student.name.split(" ")[0]} 👋
            </Text>
          </div>

          <Flex align="center" gap="3">
            <input
              type="text"
              placeholder="Search drives, companies..."
              style={{
                width: 320,
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <Button
              size="3"
              variant="soft"
              style={{ cursor: "pointer", position: "relative" }}
            >
              🔔
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  background: "#ef4444",
                  borderRadius: "50%",
                }}
              />
            </Button>
          </Flex>
        </Flex>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <StatCard
            icon="📊"
            label="Total Drives"
            value={stats.totalDrives}
            color="#3b82f6"
            trend="+12%"
          />
          <StatCard
            icon="✅"
            label="Applied"
            value={stats.applied}
            color="#10b981"
          />
          <StatCard
            icon="⭐"
            label="Eligible"
            value={stats.eligible}
            color="#f59e0b"
          />
          <StatCard
            icon="📞"
            label="Interviews"
            value={stats.interviews}
            color="#8b5cf6"
          />
          <StatCard
            icon="🎉"
            label="Offers"
            value={stats.offers}
            color="#ec4899"
          />
          <StatCard
            icon="🏆"
            label="Placed"
            value={stats.placed}
            color="#06b6d4"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          {/* Upcoming Drives */}
          <Card style={{ padding: 28, borderRadius: 16, background: "white" }}>
            <Flex justify="between" align="center" style={{ marginBottom: 24 }}>
              <Text size="6" weight="bold">
                Upcoming Drives
              </Text>
              <Button
                variant="ghost"
                size="2"
                onClick={() => navigate("/student/drives")}
                style={{ cursor: "pointer" }}
              >
                View All →
              </Button>
            </Flex>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {upcomingDrives.map((drive) => (
                <Card
                  key={drive.id}
                  style={{
                    padding: 20,
                    background: "#f8fafc",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(59,130,246,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Flex justify="between" align="start">
                    <Flex gap="3" align="start">
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "grid",
                          placeItems: "center",
                          color: "white",
                          fontWeight: 700,
                          fontSize: 18,
                        }}
                      >
                        {drive.company[0]}
                      </div>
                      <div>
                        <Text size="4" weight="bold" style={{ display: "block", marginBottom: 4 }}>
                          {drive.company}
                        </Text>
                        <Text size="2" color="gray" style={{ display: "block", marginBottom: 8 }}>
                          {drive.role}
                        </Text>
                        <Flex gap="3" wrap="wrap">
                          <Flex align="center" gap="1">
                            <span style={{ fontSize: 14 }}>📍</span>
                            <Text size="2" color="gray">{drive.location}</Text>
                          </Flex>
                          <Flex align="center" gap="1">
                            <span style={{ fontSize: 14 }}>💰</span>
                            <Text size="2" color="gray">{drive.salary}</Text>
                          </Flex>
                          <Flex align="center" gap="1">
                            <span style={{ fontSize: 14 }}>⏰</span>
                            <Text size="2" weight="medium" color="red">
                              {getDaysUntil(drive.deadline)}
                            </Text>
                          </Flex>
                        </Flex>
                      </div>
                    </Flex>
                    <Badge
                      color={
                        drive.status === "Eligible" ? "green" :
                        drive.status === "Applied" ? "blue" : "gray"
                      }
                      size="2"
                    >
                      {drive.status}
                    </Badge>
                  </Flex>
                </Card>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card style={{ padding: 28, borderRadius: 16, background: "white" }}>
            <Text size="6" weight="bold" style={{ display: "block", marginBottom: 24 }}>
              Recent Activity
            </Text>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    padding: 16,
                    background: "#f8fafc",
                    borderRadius: 10,
                    borderLeft: `4px solid ${
                      activity.type === "application" ? "#3b82f6" :
                      activity.type === "interview" ? "#8b5cf6" :
                      activity.type === "test" ? "#f59e0b" : "#10b981"
                    }`,
                  }}
                >
                  <Text size="3" weight="medium" style={{ display: "block", marginBottom: 4 }}>
                    {activity.title}
                  </Text>
                  <Text size="2" color="gray" style={{ display: "block", marginBottom: 8 }}>
                    {activity.company}
                  </Text>
                  <Text size="1" color="gray">
                    {activity.timestamp}
                  </Text>
                </div>
              ))}
            </div>

            <Button
              variant="soft"
              size="2"
              style={{ width: "100%", marginTop: 16, cursor: "pointer" }}
            >
              View All Activity
            </Button>
          </Card>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 16px",
        borderRadius: 10,
        background: active ? "rgba(59, 130, 246, 0.2)" : "transparent",
        color: active ? "#60a5fa" : "#94a3b8",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.color = "white";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#94a3b8";
        }
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <Text size="3" weight="medium">{label}</Text>
    </div>
  );
}

function StatCard({ icon, label, value, color, trend }: any) {
  return (
    <Card
      style={{
        padding: 24,
        borderRadius: 16,
        background: "white",
        border: "1px solid #e2e8f0",
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Flex justify="between" align="start" style={{ marginBottom: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${color}15`,
            display: "grid",
            placeItems: "center",
            fontSize: 24,
          }}
        >
          {icon}
        </div>
        {trend && (
          <Badge color="green" size="1">
            {trend}
          </Badge>
        )}
      </Flex>
      <Text size="2" color="gray" style={{ display: "block", marginBottom: 4 }}>
        {label}
      </Text>
      <Text size="7" weight="bold" style={{ color }}>
        {value}
      </Text>
    </Card>
  );
}