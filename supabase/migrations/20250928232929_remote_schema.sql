drop extension if exists "pg_net";

revoke delete on table "public"."assignments" from "anon";

revoke insert on table "public"."assignments" from "anon";

revoke references on table "public"."assignments" from "anon";

revoke select on table "public"."assignments" from "anon";

revoke trigger on table "public"."assignments" from "anon";

revoke truncate on table "public"."assignments" from "anon";

revoke update on table "public"."assignments" from "anon";

revoke delete on table "public"."assignments" from "authenticated";

revoke insert on table "public"."assignments" from "authenticated";

revoke references on table "public"."assignments" from "authenticated";

revoke select on table "public"."assignments" from "authenticated";

revoke trigger on table "public"."assignments" from "authenticated";

revoke truncate on table "public"."assignments" from "authenticated";

revoke update on table "public"."assignments" from "authenticated";

revoke delete on table "public"."assignments" from "service_role";

revoke insert on table "public"."assignments" from "service_role";

revoke references on table "public"."assignments" from "service_role";

revoke select on table "public"."assignments" from "service_role";

revoke trigger on table "public"."assignments" from "service_role";

revoke truncate on table "public"."assignments" from "service_role";

revoke update on table "public"."assignments" from "service_role";

revoke delete on table "public"."canvas_courses" from "anon";

revoke insert on table "public"."canvas_courses" from "anon";

revoke references on table "public"."canvas_courses" from "anon";

revoke select on table "public"."canvas_courses" from "anon";

revoke trigger on table "public"."canvas_courses" from "anon";

revoke truncate on table "public"."canvas_courses" from "anon";

revoke update on table "public"."canvas_courses" from "anon";

revoke delete on table "public"."canvas_courses" from "authenticated";

revoke insert on table "public"."canvas_courses" from "authenticated";

revoke references on table "public"."canvas_courses" from "authenticated";

revoke select on table "public"."canvas_courses" from "authenticated";

revoke trigger on table "public"."canvas_courses" from "authenticated";

revoke truncate on table "public"."canvas_courses" from "authenticated";

revoke update on table "public"."canvas_courses" from "authenticated";

revoke delete on table "public"."canvas_courses" from "service_role";

revoke insert on table "public"."canvas_courses" from "service_role";

revoke references on table "public"."canvas_courses" from "service_role";

revoke select on table "public"."canvas_courses" from "service_role";

revoke trigger on table "public"."canvas_courses" from "service_role";

revoke truncate on table "public"."canvas_courses" from "service_role";

revoke update on table "public"."canvas_courses" from "service_role";

revoke delete on table "public"."courses" from "anon";

revoke insert on table "public"."courses" from "anon";

revoke references on table "public"."courses" from "anon";

revoke select on table "public"."courses" from "anon";

revoke trigger on table "public"."courses" from "anon";

revoke truncate on table "public"."courses" from "anon";

revoke update on table "public"."courses" from "anon";

revoke delete on table "public"."courses" from "authenticated";

revoke insert on table "public"."courses" from "authenticated";

revoke references on table "public"."courses" from "authenticated";

revoke select on table "public"."courses" from "authenticated";

revoke trigger on table "public"."courses" from "authenticated";

revoke truncate on table "public"."courses" from "authenticated";

revoke update on table "public"."courses" from "authenticated";

revoke delete on table "public"."courses" from "service_role";

revoke insert on table "public"."courses" from "service_role";

revoke references on table "public"."courses" from "service_role";

revoke select on table "public"."courses" from "service_role";

revoke trigger on table "public"."courses" from "service_role";

revoke truncate on table "public"."courses" from "service_role";

revoke update on table "public"."courses" from "service_role";

revoke delete on table "public"."exams" from "anon";

revoke insert on table "public"."exams" from "anon";

revoke references on table "public"."exams" from "anon";

revoke select on table "public"."exams" from "anon";

revoke trigger on table "public"."exams" from "anon";

revoke truncate on table "public"."exams" from "anon";

revoke update on table "public"."exams" from "anon";

revoke delete on table "public"."exams" from "authenticated";

revoke insert on table "public"."exams" from "authenticated";

revoke references on table "public"."exams" from "authenticated";

revoke select on table "public"."exams" from "authenticated";

revoke trigger on table "public"."exams" from "authenticated";

revoke truncate on table "public"."exams" from "authenticated";

revoke update on table "public"."exams" from "authenticated";

revoke delete on table "public"."exams" from "service_role";

revoke insert on table "public"."exams" from "service_role";

revoke references on table "public"."exams" from "service_role";

revoke select on table "public"."exams" from "service_role";

revoke trigger on table "public"."exams" from "service_role";

revoke truncate on table "public"."exams" from "service_role";

revoke update on table "public"."exams" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_assignments_and_exams(startdate timestamp with time zone, enddate timestamp with time zone)
 RETURNS TABLE(date timestamp with time zone, type text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT "dueDate" AS "date", 'assignment' AS "type"
    FROM assignments
    WHERE "dueDate" BETWEEN startDate AND endDate
    UNION
    SELECT "examDate" AS "date", 'exam' AS "type"
    FROM exams
    WHERE "examDate" BETWEEN startDate AND endDate;
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_events_in_range(startdate timestamp with time zone, enddate timestamp with time zone)
 RETURNS TABLE(date timestamp with time zone, type text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT "dueDate"::timestamp with time zone AS "date", 'assignment' AS "type"
    FROM assignments
    WHERE "dueDate" BETWEEN startDate AND endDate
    UNION
    SELECT "examDate"::timestamp with time zone AS "date", 'exam' AS "type"
    FROM exams
    WHERE "examDate" BETWEEN startDate AND endDate;
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_events_with_colors_in_range(startdate timestamp with time zone, enddate timestamp with time zone)
 RETURNS TABLE(date timestamp with time zone, type text, color text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        a."dueDate"::TIMESTAMP WITH TIME ZONE AS "date", 
        'assignment' AS "type",
        c."color" AS "color"
    FROM assignments a
    JOIN courses c ON a."course_id" = c."id"
    WHERE a."dueDate" BETWEEN startDate AND endDate
    
    UNION

    SELECT 
        e."examDate"::TIMESTAMP WITH TIME ZONE AS "date", 
        'exam' AS "type",
        NULL AS "color"  -- No course color for exams
    FROM exams e
    WHERE e."examDate" BETWEEN startDate AND endDate;
END; $function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.update_user_status_to_confirmed()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
IF NEW.email_confirmed_at IS NOT NULL THEN
    UPDATE public.profiles
    SET status = 'confirmed'
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
end;
$function$
;


