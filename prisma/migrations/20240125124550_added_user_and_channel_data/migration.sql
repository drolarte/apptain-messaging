-- CreateTable
CREATE TABLE "channels" (
    "channel_url" TEXT NOT NULL,
    "creator_user_id" UUID NOT NULL,
    "chatmate_user_id" UUID NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "message_count" INTEGER NOT NULL DEFAULT 0,
    "timestamp_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("channel_url")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "nickname" VARCHAR(32) DEFAULT 'user',
    "profile_url" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
