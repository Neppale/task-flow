-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "cron" TEXT,
    "date" DATETIME,
    "retries" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("createdAt", "data", "id", "status", "type", "updatedAt") SELECT "createdAt", "data", "id", "status", "type", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_type_idx" ON "Task"("type");
CREATE INDEX "Task_status_idx" ON "Task"("status");
CREATE INDEX "Task_createdAt_idx" ON "Task"("createdAt");
CREATE INDEX "Task_retries_idx" ON "Task"("retries");
CREATE INDEX "Task_date_idx" ON "Task"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
