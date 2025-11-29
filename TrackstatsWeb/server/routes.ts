import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "OK",
      message: "TrackStats API is running!",
    });
  });

  // Get all inventories
  app.get("/api/all-inventories", async (_req, res) => {
    try {
      const data = (await storage.get("inventories")) || {};
      const accounts = Object.values(data).map((acc: any, index: number) => ({
        id: index + 1,
        ...acc,
      }));
      res.json({ success: true, data: accounts });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get data" });
    }
  });

  // Update inventory from Roblox
  app.post("/api/update-inventory", async (req, res) => {
    try {
      const {
        username,
        type,
        legendaryFishBait,
        legendaryFruitChest,
        mythicalFruitChest,
        machineId,
      } = req.body;

      if (!username) {
        return res
          .status(400)
          .json({ success: false, message: "Username is required" });
      }

      const allData = (await storage.get("inventories")) || {};

      allData[username] = {
        username,
        type: type || "treo bf",
        legendaryFishBait: legendaryFishBait || 0,
        legendaryFruitChest: legendaryFruitChest || 0,
        mythicalFruitChest: mythicalFruitChest || 0,
        listClass: "-",
        machineId: machineId || "Unknown",
        lastUpdated: new Date().toISOString(),
        isOnline: true,
      };

      await storage.set("inventories", allData);

      console.log(
        `✅ Updated inventory for ${username} on machine ${machineId}`,
      );
      res.json({ success: true, message: "Inventory updated successfully!" });
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ success: false, message: "Failed to save data" });
    }
  });

  // Mark account as offline
  app.post("/api/set-offline", async (req, res) => {
    try {
      const { username } = req.body;

      if (!username) {
        return res
          .status(400)
          .json({ success: false, message: "Username is required" });
      }

      const allData = (await storage.get("inventories")) || {};

      if (allData[username]) {
        allData[username].isOnline = false;
        allData[username].lastUpdated = new Date().toISOString();
        await storage.set("inventories", allData);

        console.log(`🔴 Set ${username} to offline`);
        res.json({ success: true, message: "Set offline successfully!" });
      } else {
        res.status(404).json({ success: false, message: "Player not found" });
      }
    } catch (error) {
      console.error("Error setting offline:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update status" });
    }
  });

  // Delete account
  app.delete("/api/inventory/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const allData = (await storage.get("inventories")) || {};

      if (allData[username]) {
        delete allData[username];
        await storage.set("inventories", allData);
        console.log(`🗑️ Deleted ${username}`);
        res.json({ success: true, message: "Account deleted successfully!" });
      } else {
        res.status(404).json({ success: false, message: "Player not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete" });
    }
  });

  // Auto mark offline for accounts not updated in 2 minutes
  setInterval(async () => {
    try {
      const allData = (await storage.get("inventories")) || {};
      let updated = false;

      for (const username in allData) {
        const account = allData[username];
        const lastUpdate = new Date(account.lastUpdated);
        const now = new Date();
        const diffMinutes = (now.getTime() - lastUpdate.getTime()) / 60000;

        // If not updated in 2 minutes, set offline
        if (diffMinutes > 2 && account.isOnline) {
          allData[username].isOnline = false;
          updated = true;
          console.log(
            `🔴 Auto set ${username} to offline (inactive for ${Math.floor(diffMinutes)} minutes)`,
          );
        }
      }

      if (updated) {
        await storage.set("inventories", allData);
      }
    } catch (error) {
      console.error("Error in auto-offline check:", error);
    }
  }, 60000); // Check every 1 minute

  return httpServer;
}
