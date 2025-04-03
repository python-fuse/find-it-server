-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "claimedByID" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_claimedByID_fkey" FOREIGN KEY ("claimedByID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
