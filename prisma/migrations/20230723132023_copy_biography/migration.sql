/*
  Warnings:

  - Added the required column `transaction_date` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Budget` ADD COLUMN `transaction_date` DATETIME(3) NOT NULL;
