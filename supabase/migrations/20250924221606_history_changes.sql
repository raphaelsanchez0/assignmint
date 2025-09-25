alter table "public"."assignments" add column "completed" boolean not null default false;

alter table "public"."assignments" add column "completedDate" date;

