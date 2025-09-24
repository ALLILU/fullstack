-- CreateTable
CREATE TABLE "public"."Password" (
    "hash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("hash")
);

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "public"."Password"("userId");

-- AddForeignKey
ALTER TABLE "public"."Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
