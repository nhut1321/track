import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  FileText,
  Cookie,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Moon,
  Fish,
  Gift,
  Sparkles,
  RefreshCw,
  Trash2,
  Monitor,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const TrackStatDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [expandedMachines, setExpandedMachines] = useState({});
  const [groupByMachine, setGroupByMachine] = useState(true);
  const itemsPerPage = 20;

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/all-inventories");
      const result = await response.json();

      if (result.success) {
        setAccounts(result.data);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (username) => {
    if (!confirm(`Xóa account "${username}"?`)) return;

    try {
      const response = await fetch(`/api/inventory/${username}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        // Refresh data
        fetchData();
        alert(`✅ Đã xóa ${username}`);
      } else {
        alert(`❌ Lỗi: ${result.message}`);
      }
    } catch (error) {
      alert("❌ Lỗi khi xóa account!");
      console.error(error);
    }
  };

  // Load data on mount and auto-refresh every 30 seconds
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Group accounts by machine
  const accountsByMachine = {};
  accounts.forEach((acc) => {
    const machineId = acc.machineId || "Unknown";
    if (!accountsByMachine[machineId]) {
      accountsByMachine[machineId] = [];
    }
    accountsByMachine[machineId].push(acc);
  });

  // Calculate totals
  const totalAccounts = accounts.length;
  const onlineAccounts = accounts.filter((acc) => acc.isOnline).length;
  const totalLegendaryFishBait = accounts.reduce(
    (sum, acc) => sum + (acc.legendaryFishBait || 0),
    0,
  );
  const totalLegendaryFruitChest = accounts.reduce(
    (sum, acc) => sum + (acc.legendaryFruitChest || 0),
    0,
  );
  const totalMythicalFruitChest = accounts.reduce(
    (sum, acc) => sum + (acc.mythicalFruitChest || 0),
    0,
  );

  // Filter accounts
  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch = acc.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "online" && acc.isOnline) ||
      (filterType === "offline" && !acc.isOnline);
    return matchesSearch && matchesFilter;
  });

  // Format time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffMs = now - updated;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Toggle machine expansion
  const toggleMachine = (machineId) => {
    setExpandedMachines((prev) => ({
      ...prev,
      [machineId]: !prev[machineId],
    }));
  };

  // Render account row
  const renderAccountRow = (account, showMachineColumn = false) => (
    <tr
      key={account.id}
      className="border-b border-gray-800 hover:bg-gray-800/50"
    >
      <td className="p-4">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-600" />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${account.isOnline ? "bg-green-500" : "bg-red-500"}`}
          ></div>
          <div>
            <div className="font-medium">{account.username}</div>
            <div className="text-sm text-gray-400">{account.type}</div>
            <div className="text-xs text-gray-500">
              {getTimeAgo(account.lastUpdated)}
            </div>
          </div>
        </div>
      </td>
      {showMachineColumn && (
        <td className="p-4">
          <span className="px-2 py-1 bg-blue-900/30 border border-blue-500/50 rounded text-xs">
            {account.machineId || "Unknown"}
          </span>
        </td>
      )}
      <td className="p-4">
        <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/50 rounded-full text-sm">
          {account.legendaryFishBait || 0}
        </span>
      </td>
      <td className="p-4">
        <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm">
          {account.legendaryFruitChest || 0}
        </span>
      </td>
      <td className="p-4">
        <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm">
          {account.mythicalFruitChest || 0}
        </span>
      </td>
      <td className="p-4 text-gray-400">{account.listClass || "-"}</td>
      <td className="p-4">
        <button
          onClick={() => deleteAccount(account.username)}
          className="p-2 hover:bg-red-900/30 rounded text-red-500 hover:text-red-400"
          title="Delete account"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      {/* Header - same as before */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium">
            99 Nights In The Forest - TrackStats
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchData}
            className="p-2 hover:bg-gray-800 rounded flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setGroupByMachine(!groupByMachine)}
            className={`px-3 py-2 rounded flex items-center gap-2 ${groupByMachine ? "bg-blue-900/30 border border-blue-500/50" : "bg-gray-800"}`}
          >
            <Monitor className="w-4 h-4" />
            Group by Machine
          </button>
        </div>
      </div>

      {/* Stats Cards - same as before */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">
              <span className="text-green-500">Online</span> / Total
            </div>
            <Users className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold">
            <span className="text-green-500">{onlineAccounts}</span>
            <span className="text-gray-600">/</span>
            <span>{totalAccounts}</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Fish className="w-5 h-5 text-green-500" />
            <div className="text-sm text-gray-400">Legendary Fish Bait</div>
          </div>
          <div className="text-3xl font-bold">
            {totalLegendaryFishBait.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-red-500" />
            <div className="text-sm text-gray-400">Legendary Fruit Chest</div>
          </div>
          <div className="text-3xl font-bold">{totalLegendaryFruitChest}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <div className="text-sm text-gray-400">Mythical Fruit Chest</div>
          </div>
          <div className="text-3xl font-bold">{totalMythicalFruitChest}</div>
        </div>
      </div>

      {/* Machine Groups */}
      {groupByMachine ? (
        <div className="space-y-4">
          {Object.entries(accountsByMachine).map(
            ([machineId, machineAccounts]) => {
              const machineOnline = machineAccounts.filter(
                (acc) => acc.isOnline,
              ).length;
              const isExpanded = expandedMachines[machineId] !== false; // Default expanded

              return (
                <div
                  key={machineId}
                  className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
                >
                  {/* Machine Header */}
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/50"
                    onClick={() => toggleMachine(machineId)}
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronUp className="w-5 h-5" />
                      )}
                      <Monitor className="w-5 h-5 text-blue-500" />
                      <div>
                        <h3 className="font-medium text-lg">{machineId}</h3>
                        <p className="text-sm text-gray-400">
                          <span className="text-green-500">
                            {machineOnline}
                          </span>
                          /{machineAccounts.length} accounts online
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Fish className="w-4 h-4 text-green-500" />
                        {machineAccounts
                          .reduce(
                            (sum, acc) => sum + (acc.legendaryFishBait || 0),
                            0,
                          )
                          .toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-red-500" />
                        {machineAccounts.reduce(
                          (sum, acc) => sum + (acc.legendaryFruitChest || 0),
                          0,
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        {machineAccounts.reduce(
                          (sum, acc) => sum + (acc.mythicalFruitChest || 0),
                          0,
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Machine Accounts Table */}
                  {isExpanded && (
                    <table className="w-full">
                      <thead>
                        <tr className="border-t border-gray-800 bg-gray-800/30">
                          <th className="text-left p-4 text-sm font-medium text-gray-400 w-12">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-600"
                            />
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Account
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2">
                              <Fish className="w-4 h-4 text-green-500" />
                              Fish Bait
                            </div>
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4 text-red-500" />
                              Legendary
                            </div>
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-purple-500" />
                              Mythical
                            </div>
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Class
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-400">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {machineAccounts.map((account) =>
                          renderAccountRow(account, false),
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            },
          )}
        </div>
      ) : (
        /* Regular Table View */
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-sm font-medium text-gray-400 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-600"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Account
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Machine
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  <div className="flex items-center gap-2">
                    <Fish className="w-4 h-4 text-green-500" />
                    Fish Bait
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-red-500" />
                    Legendary
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Mythical
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Class
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) =>
                renderAccountRow(account, true),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackStatDashboard;
