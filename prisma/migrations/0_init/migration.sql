-- CreateTable
CREATE TABLE "car_owner" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "car_model" VARCHAR(255) NOT NULL,
    "car_make" VARCHAR(255) NOT NULL,
    "car_year" INTEGER NOT NULL,
    "license_plate" VARCHAR(20) NOT NULL,
    "battery_capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charging_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "car_owner_id" UUID NOT NULL,
    "service_vehicle_id" UUID NOT NULL,
    "request_time" TIMESTAMP(6) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "charge_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "charging_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charging_session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "charging_request_id" UUID NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6),
    "charge_provided" INTEGER NOT NULL,
    "session_status" VARCHAR(20) NOT NULL,
    "service_vehicle_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "charging_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "address" VARCHAR(255),
    "rating" INTEGER,
    "service_area" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_vehicle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provider_id" UUID NOT NULL,
    "vehicle_model" VARCHAR(255) NOT NULL,
    "vehicle_make" VARCHAR(255) NOT NULL,
    "vehicle_year" INTEGER NOT NULL,
    "license_plate" VARCHAR(20) NOT NULL,
    "battery_capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "car_owner" ADD CONSTRAINT "car_owner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "charging_request" ADD CONSTRAINT "charging_request_car_owner_id_fkey" FOREIGN KEY ("car_owner_id") REFERENCES "car_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "charging_request" ADD CONSTRAINT "charging_request_service_vehicle_id_fkey" FOREIGN KEY ("service_vehicle_id") REFERENCES "service_vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "charging_session" ADD CONSTRAINT "charging_session_charging_request_id_fkey" FOREIGN KEY ("charging_request_id") REFERENCES "charging_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "charging_session" ADD CONSTRAINT "charging_session_service_vehicle_id_fkey" FOREIGN KEY ("service_vehicle_id") REFERENCES "service_vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "provider" ADD CONSTRAINT "provider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "service_vehicle" ADD CONSTRAINT "service_vehicle_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

