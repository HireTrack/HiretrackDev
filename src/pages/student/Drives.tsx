import React, { useState, useMemo, ChangeEvent } from "react";
import { Flex, Text, Button, TextField, Badge, Card } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

interface Drive {
  id: number;
  company: string;
  location: string;
  type: string;
  role: string;
  salary?: string;
  status: "Eligible" | "Not Eligible";
  deadline?: string;
}

const MOCK_DRIVES: Drive[] = [
  {
    id: 1,
    company: "EPAM Systems",
    location: "Hyderabad",
    type: "Full Time",
    role: "Junior Software Engineer",
    salary: "₹8L PA",
    status: "Not Eligible",
    deadline: "5 days left",
  },
  {
    id: 2,
    company: "EmbedUR Systems",
    location: "Chennai",
    type: "Full Time",
    role: "Software Engineer",
    salary: "₹6L-8L PA",
    status: "Not Eligible",
    deadline: "1 week left",
  },
  {
    id: 3,
    company: "Soudarshini Valve",
    location: "Coimbatore",
    type: "Internship",
    role: "GET",
    salary: "₹15T PM",
    status: "Not Eligible",
    deadline: "3 days left",
  },
  {
    id: 4,
    company: "Mobis India Limited",
    location: "Tirunelveli",
    type: "Full Time",
    role: "Embedded Engineer",
    salary: "₹7L PA",
    status: "Eligible",
    deadline: "2 days left",
  },
  {
    id: 5,
    company: "Pentalpha",
    location: "Chennai",
    type: "Full Time",
    role: "Consultant",
    salary: "₹5L PA",
    status: "Not Eligible",
    deadline: "1 week left",
  },
  {
    id: 6,
    company: "RR Electronics",
    location: "Chennai",
    type: "Full Time",
    role: "Senior Engineer",
    salary: "₹12L PA",
    status: "Not Eligible",
    deadline: "4 days left",
  },
];

export default function Drives() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [tab, setTab] = useState<"all" | "eligible" | "applied">("all");
  const [drives] = useState<Drive[]>(MOCK_DRIVES);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = drives;

    if (tab === "eligible") {
      list = drives.filter((d) => d.status === "Eligible");
    } else if (tab === "applied") {
      list = [];
    }

    if (!q) return list;
    return list.filter(
      (d) =>
        d.company.toLowerCase().includes(q) ||
        d.role.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q)
    );
  }, [drives, query, tab]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header with Navigation */}
        <Flex
          justify="between"
          align="center"
          style={{
            marginBottom: 24,
            background: "white",
            padding: "20px 24px",
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Flex align="center" gap="4">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: 800,
                fontSize: 18,
                cursor: "pointer",
              }}
              onClick={() => navigate("/student/dashboard")}
            >
              H
            </div>
            <button
              onClick={() => navigate("/student/dashboard")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                fontWeight: 500,
              }}
            >
              Dashboard
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                fontWeight: 600,
                color: "#667eea",
              }}
            >
              Drives
            </button>
            <button
              onClick={() => navigate("/student/profile")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                fontWeight: 500,
              }}
            >
              Profile
            </button>
          </Flex>

         <input
            type="text"
            placeholder="Search companies, roles, or locations..."
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            style={{
              width: 400,
              padding: "10px 14px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </Flex>

        {/* Page Title */}
        <Flex justify="between" align="center" style={{ marginBottom: 24 }}>
          <Text size="8" weight="bold">
            Placement Drives
          </Text>
        </Flex>

        {/* Tabs */}
        <Flex gap="3" style={{ marginBottom: 24 }}>
          <Button
            size="3"
            variant={tab === "all" ? "solid" : "soft"}
            onClick={() => setTab("all")}
            style={{ cursor: "pointer" }}
          >
            All Drives ({drives.length})
          </Button>
          <Button
            size="3"
            variant={tab === "eligible" ? "solid" : "soft"}
            color="green"
            onClick={() => setTab("eligible")}
            style={{ cursor: "pointer" }}
          >
            Eligible ({drives.filter((d) => d.status === "Eligible").length})
          </Button>
          <Button
            size="3"
            variant={tab === "applied" ? "solid" : "soft"}
            color="blue"
            onClick={() => setTab("applied")}
            style={{ cursor: "pointer" }}
          >
            Applied (0)
          </Button>
        </Flex>

        {/* Drives Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((drive) => (
            <Card
              key={drive.id}
              style={{
                padding: 24,
                borderRadius: 16,
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border:
                  drive.status === "Eligible"
                    ? "2px solid #10b981"
                    : "1px solid #e5e7eb",
                transition: "all 0.2s",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              <Badge
                color={drive.status === "Eligible" ? "green" : "gray"}
                size="2"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                }}
              >
                {drive.status}
              </Badge>

              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 24,
                  marginBottom: 16,
                }}
              >
                {drive.company[0]}
              </div>

              <Text
                size="5"
                weight="bold"
                style={{ display: "block", marginBottom: 8 }}
              >
                {drive.company}
              </Text>

              <Flex direction="column" gap="2" style={{ marginBottom: 16 }}>
                <Flex align="center" gap="2">
                  <span>📍</span>
                  <Text size="2" color="gray">
                    {drive.location}
                  </Text>
                </Flex>
                <Flex align="center" gap="2">
                  <span>💼</span>
                  <Text size="2" color="gray">
                    {drive.type}
                  </Text>
                </Flex>
                <Flex align="center" gap="2">
                  <span>👤</span>
                  <Text size="2" weight="medium">
                    {drive.role}
                  </Text>
                </Flex>
                <Flex align="center" gap="2">
                  <span>💰</span>
                  <Text size="2" weight="medium" color="blue">
                    {drive.salary || "Not disclosed"}
                  </Text>
                </Flex>
                <Flex align="center" gap="2">
                  <span>⏰</span>
                  <Text size="2" color="red">
                    {drive.deadline}
                  </Text>
                </Flex>
              </Flex>

              {drive.status === "Eligible" ? (
                <Button
                  size="3"
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    cursor: "pointer",
                  }}
                >
                  Apply Now
                </Button>
              ) : (
                <Button
                  size="3"
                  variant="soft"
                  color="gray"
                  style={{ width: "100%", cursor: "pointer" }}
                >
                  View Details
                </Button>
              )}
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card
            style={{
              padding: 60,
              textAlign: "center",
              background: "white",
              borderRadius: 16,
            }}
          >
            <Text size="5" color="gray">
              No drives found matching your criteria
            </Text>
          </Card>
        )}
      </div>
    </div>
  );
}